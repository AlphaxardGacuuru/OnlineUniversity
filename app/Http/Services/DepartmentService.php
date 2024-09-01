<?php

namespace App\Http\Services;

use App\Http\Resources\DepartmentResource;
use App\Http\Services\Service;
use App\Models\Department;

class DepartmentService extends Service
{
    /*
     * Get All Departments
     */
    public function index($request)
    {		
        $departmentsQuery = new Department;

        $departmentsQuery = $this->search($departmentsQuery, $request);

        $departments = $departmentsQuery
            ->orderBy("id", "DESC")
            ->paginate(20);

        return DepartmentResource::collection($departments);
    }

    /*
     * Get One Department
     */
    public function show($id)
    {
        $department = Department::findOrFail($id);

        return new DepartmentResource($department);
    }

    /*
     * Store Department
     */
    public function store($request)
    {
        $department = new Department;
        $department->name = $request->input("name");
        $department->faculty_id = $request->input("facultyId");

        $saved = $department->save();

        $message = $department->name . " created successfully";

        return [$saved, $message, $department];
    }

    /*
     * Update Department
     */
    public function update($request, $id)
    {
        $department = Department::findOrFail($id);

        if ($request->filled("name")) {
            $department->name = $request->input("name");
        }

        if ($request->filled("facultyId")) {
            $department->faculty_id = $request->input("facultyId");
        }

        $saved = $department->save();

        $message = $department->name . " created successfully";

        return [$saved, $message, $department];
    }

    /*
     * Destroy
     */
    public function destroy($id)
    {
        $department = Department::findOrFail($id);

        $deleted = $department->delete();

        $message = $department->name . " deleted successfully";

        return [$deleted, $message, $department];
    }

    /*
     * Handle Search
     */
    public function search($query, $request)
    {
        if ($request->filled("name")) {
            $query = $query
                ->where("name", "LIKE", "%" . $request->input("name") . "%");
        }

        $facultyId = $request->input("facultyId");

        if ($request->filled("facultyId")) {
            $query = $query->where("faculty_id", $facultyId);
        }

        $userId = $request->input("userId");

        if ($request->filled("userId")) {
            $query = $query
                ->whereHas("users", function ($query) use ($userId) {
                    $query->where("user_id", $userId);
                });
        }

        return $query;
    }
}
