<?php

namespace App\Http\Services\Admin;

use App\Http\Resources\UnitResource;
use App\Http\Services\Service;
use App\Models\Unit;
use App\Models\UserUnit;

class UnitService extends Service
{
    /*
     * Get All Units
     */
    public function index($request)
    {
        if ($request->filled("idAndName")) {
            $units = Unit::select("id", "name", "code", "course_id as courseId")
                ->orderBy("id", "DESC")
                ->get();

            return response([
                "data" => $units,
            ], 200);
        }

        $units = Unit::orderBy("id", "DESC")->paginate(20);

        return UnitResource::collection($units);
    }

    /*
     * Get One Unit
     */
    public function show($id)
    {
        $unit = Unit::findOrFail($id);

        return new UnitResource($unit);
    }

    /*
     * Store Unit
     */
    public function store($request)
    {
        $unit = new Unit;
        $unit->name = $request->input("name");
        $unit->code = $request->input("code");
        $unit->description = $request->input("description");
        $unit->credits = $request->input("credits");
        $unit->course_id = $request->input("courseId");

        $saved = $unit->save();

        if ($request->filled("instructorId")) {
            $userUnit = new UserUnit;
            $userUnit->user_id = $request->input("instructorId");
            $userUnit->unit_id = $unit->id;
            $userUnit->save();
        }

        $message = $unit->name . " created successfully";

        return [$saved, $message, $unit];
    }

    /*
     * Update
     */
    public function update($request, $id)
    {
        $unit = Unit::findOrFail($id);

        if ($request->filled("name")) {
            $unit->name = $request->input("name");
        }

        if ($request->filled("code")) {
            $unit->code = $request->input("code");
        }

        if ($request->filled("description")) {
            $unit->description = $request->input("description");
        }

        if ($request->filled("instructorId")) {
            $unit->user_id = $request->input("instructorId");
        }

        if ($request->filled("credits")) {
            $unit->credits = $request->input("credits");
        }

        if ($request->filled("courseId")) {
            $unit->course_id = $request->input("courseId");
        }

        $saved = $unit->save();

        $message = $unit->name . " updated successfully";

        return [$saved, $message, $unit];
    }

    /*
     * Destroy
     */
    public function destory($id)
    {
        $unit = Unit::findOrFail($id);

        $deleted = $unit->delete();

        $message = $unit->name . " deleted successfully";

        return [$deleted, $message, $unit];
    }
}
