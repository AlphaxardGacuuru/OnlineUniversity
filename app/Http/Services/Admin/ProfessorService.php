<?php

namespace App\Http\Services\Admin;

use App\Http\Resources\ProfessorResource;
use App\Http\Services\Service;
use App\Models\User;
use App\Models\UserCourse;
use App\Models\UserDepartment;
use App\Models\UserFaculty;
use App\Models\UserUnit;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ProfessorService extends Service
{
    /*
     * Get All Professors
     */
    public function index()
    {
        $professors = User::where("account_type", "professor")
            ->orderBy("id", "DESC")
            ->paginate(20);

        return ProfessorResource::collection($professors);
    }

    /*
     * Get One Professor
     */
    public function show($id)
    {
        $professor = User::findOrFail($id);

        return new ProfessorResource($professor);
    }

    /*
     * Store
     */
    public function store($request)
    {
        $professor = new User;
        $professor->name = $request->input("name");
        $professor->email = $request->input("email");
        $professor->phone = $request->input("phone");
        $professor->gender = $request->input("gender");
        $professor->education = $request->input("education");
        $professor->password = Hash::make($request->input("email"));
        $professor->account_type = "professor";

        $saved = DB::transaction(function () use ($professor, $request) {
            $saved = $professor->save();

            // Add UserFaculty
            if ($request->filled("facultyId")) {
                $userFaculty = new UserFaculty;
                $userFaculty->user_id = $professor->id;
                $userFaculty->faculty_id = $request->input("facultyId");
                $userFaculty->save();
            }

            // Add UserDepartment
            if ($request->filled("departmentId")) {
                $userDepartment = new UserDepartment;
                $userDepartment->user_id = $professor->id;
                $userDepartment->department_id = $request->input("departmentId");
                $userDepartment->save();
            }

            // Add UserCourse
            if ($request->filled("courseId")) {
                $userCourse = new UserCourse;
                $userCourse->user_id = $professor->id;
                $userCourse->course_id = $request->input("courseId");
                $userCourse->save();
            }

            // Add UserUnit
            if ($request->filled("unitId")) {
                $userUnit = new UserUnit;
                $userUnit->user_id = $professor->id;
                $userUnit->unit_id = $request->input("unitId");
                $userUnit->save();
            }

            return $saved;
        });

        $message = $professor->name . " created successfully";

        return [$saved, $message, $professor];
    }

    /*
     * Update Professor
     */
    public function update($request, $id)
    {
        $professor = User::findOrFail($id);

        if ($request->filled("name")) {
            $professor->name = $request->input("name");
        }

        if ($request->filled("email")) {
            $professor->email = $request->input("email");
        }

        if ($request->filled("phone")) {
            $professor->phone = $request->input("phone");
        }

        if ($request->filled("gender")) {
            $professor->gender = $request->input("gender");
        }

        if ($request->filled("education")) {
            $professor->education = $request->input("education");
        }

        if ($request->filled("password")) {
            $professor->password = Hash::make($request->input("email"));
        }

        if ($request->filled("facultyId")) {
            // If user has opted to remove
            if ($request->input("facultyId") == "remove") {
                UserFaculty::where("user_id", $id)->delete();
            }

            // Delete UserFaculty
            $doesntExist = UserFaculty::where("user_id", $id)
                ->where("faculty_id", $request->input("facultyId"))
                ->doesntExist();

            // Add UserFaculty
            if ($doesntExist) {
                $userFaculty = new UserFaculty;
                $userFaculty->user_id = $professor->id;
                $userFaculty->faculty_id = $request->input("facultyId");
                $userFaculty->save();
            }
        }

        if ($request->filled("departmentId")) {
            // If user has opted to remove
            if ($request->input("departmentId") == "remove") {
                UserDepartment::where("user_id", $id)->delete();
            }

            // Delete UserDepartment
            $doesntExist = UserDepartment::where("user_id", $id)
                ->where("department_id", $request->input("departmentId"))
                ->doesntExist();

            // Add UserDepartment
            if ($doesntExist) {
                $userDepartment = new UserDepartment;
                $userDepartment->user_id = $professor->id;
                $userDepartment->department_id = $request->input("departmentId");
                $userDepartment->save();
            }
        }

        // Add UserCourse
        if ($request->filled("courseId")) {
            // If user has opted to remove
            if ($request->input("courseId") == "remove") {
                UserCourse::where("user_id", $id)->delete();
            }

            // Delete UserCourse
            $doesntExist = UserCourse::where("user_id", $id)
                ->where("course_id", $request->input("courseId"))
                ->doesntExist();

            // Add UserCourse
            if ($doesntExist) {
                $userCourseId = new UserCourse;
                $userCourseId->user_id = $professor->id;
                $userCourseId->course_id = $request->input("courseId");
                $userCourseId->save();
            }
        }

        // Update Unit
        if ($request->filled("unitId")) {
            // If user has opted to remove
            if ($request->input("unitId") == "remove") {
                UserUnit::where("user_id", $id)->delete();
            }

            // Delete UserUnit
            $doesntExist = UserUnit::where("user_id", $id)
                ->where("unit_id", $request->input("unitId"))
                ->doesntExist();

            // Add UserUnit
            if ($doesntExist) {
                $userUnit = new UserUnit;
                $userUnit->user_id = $professor->id;
                $userUnit->unit_id = $request->input("unitId");
                $userUnit->save();
            }
        }

        $saved = $professor->save();

        $message = $professor->name . " updated successfully";

        return [$saved, $message, $professor];
    }

    /*
     * Soft Delete Service
     */
    public function destroy($id)
    {
        $professor = User::findOrFail($id);

        $deleted = $professor->delete();

        return [$deleted, $professor->name . " deleted", $professor];
    }

    /*
     * Force Delete Service
     */
    public function forceDestory($id)
    {
        $professor = User::findOrFail($id);

        // Get old thumbnail and delete it
        $oldThumbnail = substr($professor->thumbnail, 9);

        Storage::disk("public")->delete($oldThumbnail);

        $deleted = $professor->delete();

        return [$deleted, $professor->name . " deleted"];
    }
}
