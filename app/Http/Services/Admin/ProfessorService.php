<?php

namespace App\Http\Services\Admin;

use App\Http\Resources\ProfessorResource;
use App\Http\Services\Service;
use App\Models\User;
use App\Models\UserDepartment;
use App\Models\UserFaculty;
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
        $professor = User::find($id);

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
        $professor->password = Hash::make($request->input("email"));
        $professor->account_type = "professor";

        $saved = DB::transaction(function () use ($professor, $request) {
            $saved = $professor->save();

            // Add UserFaculty
            $userFaculty = new UserFaculty;
            $userFaculty->user_id = $professor->id;
            $userFaculty->faculty_id = $request->input("facultyId");
            $userFaculty->save();

            // Add UserDepartment
            $userDepartment = new UserDepartment;
            $userDepartment->user_id = $professor->id;
            $userDepartment->department_id = $request->input("departmentId");
            $userDepartment->save();

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
        $professor = User::find($id);

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

        if ($request->filled("password")) {
            $professor->password = Hash::make($request->input("email"));
        }

        if ($request->filled("facultyId")) {
            // Delete UserFaculty
            UserFaculty::where("user_id", $id)->delete();

            // Add UserFaculty
            $userFaculty = new UserFaculty;
            $userFaculty->user_id = $professor->id;
            $userFaculty->faculty_id = $request->input("facultyId");
            $userFaculty->save();
        }

        if ($request->filled("departmentId")) {
            // Delete UserDepartment
            UserDepartment::where("user_id", $id)->delete();

            // Add UserDepartment
            $userDepartment = new UserDepartment;
            $userDepartment->user_id = $professor->id;
            $userDepartment->department_id = $request->input("departmentId");
            $userDepartment->save();
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
        $professor = User::find($id);

        $deleted = $professor->delete();

        return [$deleted, $professor->name . " deleted", $professor];
    }

    /*
     * Force Delete Service
     */
    public function forceDestory($id)
    {
        $professor = User::find($id);

        // Get old thumbnail and delete it
        $oldThumbnail = substr($professor->thumbnail, 9);

        Storage::disk("public")->delete($oldThumbnail);

        $deleted = $professor->delete();

        return [$deleted, $professor->name . " deleted"];
    }
}
