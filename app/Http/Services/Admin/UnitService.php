<?php

namespace App\Http\Services\Admin;

use App\Http\Resources\UnitResource;
use App\Http\Services\Service;
use App\Models\Professor;
use App\Models\Unit;
use App\Models\UserUnit;

class UnitService extends Service
{
    /*
     * Get All Units
     */
    public function index()
    {
        $units = Unit::orderBy("id", "DESC")->paginate();

        return UnitResource::collection($units);
    }

    /*
     * Get One Unit
     */
    public function show($id)
    {
        $unit = Unit::find($id);

        return new UnitResource($unit);
    }

    /*
     * Store Unit
     */
    public function store($request)
    {
        $unit = new Unit;
        $unit->name = $request->input("name");
        $unit->description = $request->input("description");
        $unit->credits = $request->input("credits");
        $unit->course_id = $request->input("courseId");

		$saved = $unit->save();

        if ($request->filled("professorId")) {
            $userUnit = new UserUnit;
            $userUnit->user_id = $request->input("professorId");
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
        $unit = Unit::find($id);

        if ($request->filled("name")) {
            $unit->name = $request->input("name");
        }

        if ($request->filled("description")) {
            $unit->description = $request->input("description");
        }

        if ($request->filled("professorId")) {
            $unit->user_id = $request->input("professorId");
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
        $unit = Unit::find($id);

        $deleted = $unit->delete();

        $message = $unit->name . " deleted successfully";

        return [$deleted, $message, $unit];
    }
}
