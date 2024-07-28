<?php

namespace App\Http\Services;

use App\Models\Billable;
use App\Models\CreditNote;
use App\Models\Invoice;
use App\Models\InvoiceBillable;
use App\Models\MPESATransaction;
use Illuminate\Support\Facades\DB;

class InvoiceService extends Service
{
    /*
     * Charge Enrollment Fee
     */
    public function chargeEnrollmentFee($request)
    {
        $billable = Billable::where("course_id", $request->courseId)
            ->where("name", "Admission Fee")
            ->first();

        $billableId = $billable->id;

        $invoiceDoesntExist = Invoice::where('user_id', $this->id)
            ->whereHas('billables', function ($query) use ($billableId) {
                $query->where('billable_id', $billableId);
            })->doesntExist();

        $saved = "";

        if ($invoiceDoesntExist) {
            $saved = DB::transaction(function () use ($billable) {
                $invoice = new Invoice;
                $invoice->user_id = $this->id;
                $invoice->amount = $billable->price;
                $invoice->balance = $billable->price;
                $invoice->created_by = $this->id;
                $saved = $invoice->save();

                $invoiceBillable = new InvoiceBillable;
                $invoiceBillable->invoice_id = $invoice->id;
                $invoiceBillable->billable_id = $billable->id;
                $saved = $invoiceBillable->save();

                return $saved;
            });

            $message = "Invoice created";
        } else {
            $message = "Invoice already exists";
        }

        return [$saved, $message, ""];
    }

    /*
     * Handle Invoice Update
     */
    public function updateInvoice($userId)
    { 
		// Fetch all relevant invoices for the user
        $invoices = Invoice::where("user_id", $userId)
            ->orderBy("id", "ASC")
            ->get();

        // Calculate total credit from MPESA transactions and Credit Notes
        $mpesaTransactions = MPESATransaction::where('user_id', $userId)->sum('amount');
        $creditNotes = CreditNote::where('user_id', $userId)->sum('amount');
        $totalCredits = $mpesaTransactions + $creditNotes;

        foreach ($invoices as $invoice) {
            if ($totalCredits <= 0) {
                // No more credits left to apply
                break;
            }

            // Determine how much can be paid towards this invoice
            $paid = min($totalCredits, $invoice->amount);
            $balance = $invoice->amount - $paid;

            // Determine status based on the paid amount
            if ($paid == 0) {
                $status = "not_paid";
            } else if ($paid < $invoice->amount) {
                $status = "partially_paid";
            } else if ($paid == $invoice->amount) {
                $status = "paid";
            } else {
                $status = "over_paid";
            }

            // Update invoice
            $invoice->paid = $paid;
            $invoice->balance = $balance;
            $invoice->status = $status;
            $invoice->save();

            // Deduct the paid amount from the total credits
            $totalCredits -= $paid;
        }
    }
}
