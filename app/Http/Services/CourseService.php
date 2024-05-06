<?php

namespace App\Http\Services;

use App\Http\Resources\CourseResource;
use App\Http\Services\Service;
use App\Models\Course;
use App\Models\User;

class CourseService extends Service
{
    /*
     * Get All Courses
     */
    public function index($request)
    {
        if ($request->filled("idAndName")) {
            $courses = Course::select("id", "name", "department_id as departmentId")
                ->orderBy("id", "DESC")
                ->get();

            return response([
                "data" => $courses,
            ], 200);
        }
		
        $coursesQuery = new Course;

        $coursesQuery = $this->search($coursesQuery, $request);

        $courses = $coursesQuery
            ->orderBy("id", "DESC")
            ->paginate(20);

        return CourseResource::collection($courses);
    }

    /*
     * Get One Course
     */
    public function show($id)
    {
        $course = Course::findOrFail($id);

        return new CourseResource($course);
    }

    /*
     * Store Course
     */
    public function store($request)
    {
        $course = new Course;
        $course->name = $request->input("name");
        $course->description = $request->input("description");
        $course->duration = $request->input("duration");
        $course->price = $request->input("price");
        $course->department_id = $request->input("departmentId");

        $saved = $course->save();

        $message = $course->name . " created successfully";

        return [$saved, $message, $course];
    }

    /*
     * Update
     */
    public function update($request, $id)
    {
        $course = Course::findOrFail($id);

        if ($request->filled("name")) {
            $course->name = $request->input("name");
        }

        if ($request->filled("description")) {
            $course->description = $request->input("description");
        }

        if ($request->filled("duration")) {
            $course->duration = $request->input("duration");
        }

        if ($request->filled("price")) {
            $course->price = $request->input("price");
        }

        if ($request->filled("departmentId")) {
            $course->department_id = $request->input("departmentId");
        }

        $saved = $course->save();

        $message = $course->name . " updated successfully";

        return [$saved, $message, $course];
    }

    /*
     * Destroy
     */
    public function destory($id)
    {
        $course = Course::findOrFail($id);

        $deleted = $course->delete();

        $message = $course->name . " deleted successfully";

        return [$deleted, $message, $course];
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
            $query = $query
                ->whereHas("department.faculty", function ($query) use ($facultyId) {
                    $query->where("faculty_id", $facultyId);
                });
        }

        $departmentId = $request->input("departmentId");

        if ($request->filled("departmentId")) {
            $query = $query
                ->where("department_id", $departmentId);
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
