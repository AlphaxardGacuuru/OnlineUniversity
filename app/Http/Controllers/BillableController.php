<?php

namespace App\Http\Controllers;

use App\Http\Services\BillableService;
use App\Models\Billable;
use Illuminate\Http\Request;

class BillableController extends Controller
{
    public function __construct(protected BillableService $service)
    {
        //
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return $this->service->index($request);
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
			"courseId" => "required|string",
			"name" => "required|string",
			"description" => "required|string|max:255",
			"price" => "required|string",
			"year" => "required|string",
			"semester" => "required|string",
		]);

		[$saved, $message, $billable] = $this->service->store($request);

		return response([
			"status" => $saved,
			"message" => $message,
			"data" => $billable
		], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Billable  $billable
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
     * @param  \App\Models\Billable  $billable
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
			"name" => "nullable|string",
			"description" => "nullable|string|max:255",
			"price" => "nullable|string",
			"year" => "nullable|string",
			"semester" => "nullable|string",
		]);

		[$saved, $message, $billable] = $this->service->update($request, $id);

		return response([
			"status" => $saved,
			"message" => $message,
			"data" => $billable
		], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Billable  $billable
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        [$deleted, $message, $billable] = $this->service->destroy($id);

		return response([
			"status" => $deleted,
			"message" => $message,
			"data" => $billable
		], 200);
    }

    /*
     * Get Admission Billable by Course ID
     */
    public function admissionById($id)
    {
        return $this->service->admissionById($id);
    }
}
