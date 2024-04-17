<?php

namespace App\Http\Services;

use App\Http\Resources\KopokopoTransferResource;
use App\Models\KopokopoTransfer;
use Kopokopo\SDK\K2;
use Carbon\Carbon;

class KopokopoTransferService extends Service
{
    /*
     * Show All Transfers
     */
    public function index()
    {
        $kopokopoTransfers = KopokopoTransfer::all();

        return KopokopoTransferResource::collection($kopokopoTransfers);
    }

    /*
     * Show All Transfers
     */
    public function store($request)
    {
		// Get Data
		$data = $request->input("data");
		$attributes = $data["attributes"];

        $kopokopoTransfer = new KopokopoTransfer;
        $kopokopoTransfer->user_id = $attributes["metadata"]["customerId"];
        $kopokopoTransfer->kopokopoId = $data["id"];
        $kopokopoTransfer->kopokopoCreatedAt = $attributes["created_at"];
        $kopokopoTransfer->amount = $attributes["amount"]["value"];
        $kopokopoTransfer->currency = $attributes["amount"]["currency"];
        $kopokopoTransfer->transferBatches = $attributes["transfer_batches"];
        $kopokopoTransfer->metadata = $attributes["metadata"];
        $saved = $kopokopoTransfer->save();

        return [$saved, "Payment Saved", $kopokopoTransfer];
    }

    /*
     * Initiate Payment
     */
    public function initiateTransfer($request)
    {
        $amount = $request->input('amount');

        $options = MPESATransactionService::options();

        $K2 = new K2($options);

        // Get one of the services
        $tokens = $K2->TokenService();

        // Use the service
        $result = $tokens->getToken();

        if ($result['status'] == 'success') {
            $data = $result['data'];
            // echo "My access token is: " . $data['accessToken'] . " It expires in: " . $data['expiresIn'] . "<br>";
        }

        $pay = $K2->PayService();

        // Pay
        $response = $pay->sendPay([
            'destinationType' => $request->type,
            'destinationReference' => $request->destinationReference,
            'amount' => $amount > 1000 ? $amount : $amount - 50,
            'currency' => 'KES',
            'callbackUrl' => 'http://localhost:8004/api/kopokopo-transfers',
            'description' => 'Transfer to Bank',
            // 'category' => 'salaries',
            'tags' => ["tag 1", "tag 2"],
            'metadata' => [
                'customerId' => $this->id,
                'notes' => 'Bank transfer ' . Carbon::now(),
            ],
            'accessToken' => $data['accessToken'],
        ]);

        return [$response["status"], "Transfer Initiated", $response["location"]];
    }
}
