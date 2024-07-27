<?php

namespace App\Http\Services;

use App\Http\Resources\UserResource;
use App\Models\User;
use App\Models\UserCourse;
use Illuminate\Support\Facades\Hash;

class UserService extends Service
{
    /*
     * Get All Users
     */
    public function index($request)
    {
        $usersQuery = new User;

        if ($request->filled("search")) {
            $usersQuery = $usersQuery
                ->where("name", "LIKE", "%" . $request->search . "%")
                ->orWhere("email", "LIKE", "%" . $request->search . "%");
        }

        $users = $usersQuery
            ->orderby("id", "DESC")
            ->paginate();

        return UserResource::collection($users);
    }

    /**
     * Display the specified resource.
     *
     */
    public function show($id)
    {
        $user = User::findOrFail($id);

        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     */
    public function update($request, $id)
    {
        /* Update profile */
        $user = User::findOrFail($id);

        $message = "Account updated";

        if ($request->filled('name')) {
            $user->name = $request->input('name');
        }

        if ($request->filled('phone')) {
            $user->phone = $request->input('phone');
            $user->password = Hash::make($request->input('phone'));
        }

        $saved = $user->save();

        return [$saved, $message, $user];
    }

    /*
     * Soft Delete Service
     */
    public function destory($id)
    {
        $user = User::findOrFail($id);

        $deleted = $user->delete();

        return [$deleted, $user->name . " deleted"];
    }

    /*
     * Force Delete Service
     */
    public function forceDestory($id)
    {
        $user = User::findOrFail($id);

        // Get old thumbnail and delete it
        $oldThumbnail = substr($user->thumbnail, 9);

        Storage::disk("public")->delete($oldThumbnail);

        $deleted = $user->delete();

        return [$deleted, $user->name . " deleted"];
    }

    /**
     * Get Auth.
     *
     */
    public function auth()
    {
        if (auth("sanctum")->check()) {

            $auth = auth('sanctum')->user();

            return new UserResource($auth);
        } else {
            return response(["message" => "Not Authenticated"], 401);
        }
    }
}
