<?php

namespace App\Http\Controllers;

use App\Http\Services\KopokopoRecipientService;
use App\Models\KopokopoRecipient;
use Illuminate\Http\Request;

class KopokopoRecipientController extends Controller
{
    public function __construct(protected KopokopoRecipientService $service)
    {
        //
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->service->index();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            "type" => "string|required",
            "firstName" => "string",
            "lastName" => "string",
            "email" => "string",
            "phoneNumber" => "string",
            "accountName" => "string",
            "accountNumber" => "string",
            "bankBranchRef" => "string",
            "tillName" => "string",
            "tillNumber" => "string",
            "paybillName" => "string",
            "paybillNumber" => "string",
            "paybillAccountNumber" => "string",
            "description" => "string|required",
        ]);

        [$saved, $message, $kopokopoRecipient] = $this->service->store($request);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $kopokopoRecipient,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\KopokopoRecipient  $kopokopoRecipient
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->service->show($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\KopokopoRecipient  $kopokopoRecipient
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, KopokopoRecipient $kopokopoRecipient)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\KopokopoRecipient  $kopokopoRecipient
     * @return \Illuminate\Http\Response
     */
    public function destroy(KopokopoRecipient $kopokopoRecipient)
    {
        //
    }
}
