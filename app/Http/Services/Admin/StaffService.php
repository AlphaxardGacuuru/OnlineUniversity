<?php

namespace App\Http\Services\Admin;

use App\Http\Resources\StaffResource;
use App\Http\Services\Service;
use App\Models\User;
use App\Models\UserDepartment;
use App\Models\UserFaculty;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class StaffService extends Service
{
    /*
     * Get All Staff
     */
    public function index()
    {
        $staff = User::where("account_type", "staff")
            ->orderBy("id", "DESC")
            ->paginate(20);

        return StaffResource::collection($staff);
    }

    /*
     * Get One Staff
     */
    public function show($id)
    {
        $staff = User::find($id);

        return new StaffResource($staff);
    }

    /*
     * Store
     */
    public function store($request)
    {
        $staff = new User;
        $staff->name = $request->input("name");
        $staff->email = $request->input("email");
        $staff->phone = $request->input("phone");
        $staff->gender = $request->input("gender");
        $staff->password = Hash::make($request->input("email"));
        $staff->account_type = "staff";

		$saved = $staff->save();

        $message = $staff->name . " created successfully";

        return [$saved, $message, $staff];
    }

    /*
     * Update Staff
     */
    public function update($request, $id)
    {
        $staff = User::find($id);

        if ($request->filled("name")) {
            $staff->name = $request->input("name");
        }

        if ($request->filled("email")) {
            $staff->email = $request->input("email");
        }

        if ($request->filled("phone")) {
            $staff->phone = $request->input("phone");
        }

        if ($request->filled("gender")) {
            $staff->gender = $request->input("gender");
        }

        if ($request->filled("password")) {
            $staff->password = Hash::make($request->input("email"));
        }

        $saved = $staff->save();

        $message = $staff->name . " updated successfully";

        return [$saved, $message, $staff];
    }

    /*
     * Soft Delete Service
     */
    public function destroy($id)
    {
        $staff = User::find($id);

        $deleted = $staff->delete();

        return [$deleted, $staff->name . " deleted", $staff];
    }

    /*
     * Force Delete Service
     */
    public function forceDestory($id)
    {
        $staff = User::find($id);

        // Get old thumbnail and delete it
        $oldThumbnail = substr($staff->thumbnail, 9);

        Storage::disk("public")->delete($oldThumbnail);

        $deleted = $staff->delete();

        return [$deleted, $staff->name . " deleted"];
    }
}