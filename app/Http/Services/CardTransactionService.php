<?php

namespace App\Http\Services;

use App\Models\CardTransaction;

class CardTransactionService extends Service
{
    /*
     * Store Transaction
     */
    public function store($request)
    {
        $cardTransaction = new CardTransaction();
        $cardTransaction->user_id = $this->id;
        $cardTransaction->currency = $request->currency;
        $cardTransaction->amount = $request->amount;
        $cardTransaction->charged_amount = $request->charged_amount;
        $cardTransaction->charge_response_code = $request->charge_response_code;
        $cardTransaction->charge_response_message = $request->charge_response_message;
        $cardTransaction->flw_ref = $request->flw_ref;
        $cardTransaction->tx_ref = $request->tx_ref;
        $cardTransaction->status = $request->status;
        $cardTransaction->transaction_id = $request->transaction_id;
        $cardTransaction->transaction_created_at = $request->created_at;

        $saved = $cardTransaction->save();

        $message = "Transaction Saved Successfully";

        return [$saved, $message, $cardTransaction];
    }
}