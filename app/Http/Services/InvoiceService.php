<?php

namespace App\Http\Services;

use App\Models\Billable;
use App\Models\Invoice;
use App\Models\InvoiceBillable;
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
}
