<?php

namespace App\Http\Controllers;

use App\Http\Services\Admin\UnitService;
use Illuminate\Http\Request;

class UnitController extends Controller
{
    public function __construct(protected UnitService $service)
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
            "name" => "required|string",
            "description" => "required|string",
            "code" => "required|string",
            "instructorId" => "nullable|string",
            "credits" => "nullable|string",
            "courseId" => "required|string",
        ]);

        [$saved, $message, $unit] = $this->service->store($request);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $unit,
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Unit  $unit
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
     * @param  \App\Models\Unit  $unit
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            "name" => "nullable|string",
            "description" => "nullable|string",
            "code" => "nullable|string",
            "instructorId" => "nullable|string",
            "credits" => "nullable|string",
            "courseId" => "nullable|string",
        ]);

        [$saved, $message, $unit] = $this->service->update($request, $id);

        return response([
            "status" => $saved,
            "message" => $message,
            "data" => $unit,
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Unit  $unit
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        [$deleted, $message, $unit] = $this->service->destory($id);

        return response([
            "status" => $deleted,
            "message" => $message,
            "data" => $unit,
        ], 200);
    }
}
