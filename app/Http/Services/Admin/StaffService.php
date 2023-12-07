<?php

namespace App\Http\Services\Admin;

use App\Http\Resources\StaffResource;
use App\Http\Services\Service;
use App\Models\User;
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
            ->get();

        return StaffResource::collection($staff);
    }

    /*
     * Get One Staff
     */
    public function show($id)
    {
        $staff = User::findOrFail($id);

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
        $staff->current_location = $request->input("currentLocation");
        $staff->origin_location = $request->input("originLocation");
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
        $staff = User::findOrFail($id);

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

        if ($request->filled("originLocation")) {
            $staff->origin_location = $request->input("originLocation");
        }

        if ($request->filled("currentLocation")) {
            $staff->current_location = $request->input("currentLocation");
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
        $staff = User::findOrFail($id);

        $deleted = $staff->delete();

        return [$deleted, $staff->name . " deleted", $staff];
    }

    /*
     * Force Delete Service
     */
    public function forceDestory($id)
    {
        $staff = User::findOrFail($id);

        // Get old thumbnail and delete it
        $oldThumbnail = substr($staff->thumbnail, 9);

        Storage::disk("public")->delete($oldThumbnail);

        $deleted = $staff->delete();

        return [$deleted, $staff->name . " deleted"];
    }
}
