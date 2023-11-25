<?php

namespace App\Http\Services\Admin;

use App\Http\Resources\Admin\AdminResource;
use App\Http\Resources\UserResource;
use App\Http\Services\Service;
use App\Models\Admin\Admin;
use App\Models\Admin\UserRole;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminService extends Service
{
    /*
     * Get All Admins
     */
    public function index()
    {
        $getAdmins = Admin::orderby("id", "DESC")->get();

        return AdminResource::collection($getAdmins);
    }

    /*
     * Store Admin
     */
    public function store($request)
    {
        $admin = new Admin;
        $admin->name = $request->name;
        $admin->email = $request->email;
        $admin->password = Hash::make($request->email);
        $admin->phone = $request->phone;
        $admin->avatar = "avatars/male-avatar.jpg";

        DB::transaction(function () use ($admin, $request) {
            $admin->save();

            foreach ($request->userRoles as $roleId) {
                $userRole = new UserRole;
                $userRole->admin_id = $admin->id;
                $userRole->role_id = $roleId;
                $userRole->save();
            }

        });

        $message = $admin->name . " added";

        return [1, $message, $admin];
    }

    /*
     * Show One resource
     */
    public function show($id)
    {
        $getAdmin = Admin::find($id);

        return new AdminResource($getAdmin);
    }

    /*
     * Update Admin
     */
    public function update($request, $id)
    {
        $admin = Admin::find($id);

        if ($request->filled("name")) {
            $admin->name = $request->input("name");
        }

        if ($request->filled("email")) {
            $admin->email = $request->input("email");
        }

        if ($request->filled("phone")) {
            $admin->phone = $request->input("phone");
        }

        if ($request->filled("avatar")) {
            $admin->avatar = $request->input("avatar");
        }

        if (count($request->input("userRoles")) > 0) {
            foreach ($request->input("userRoles") as $roleId) {
                // Check if role already exists
                $userRoleDoesntExist = UserRole::where("admin_id", $admin->id)
                    ->where("role_id", $roleId)
                    ->doesntExist();

                if ($userRoleDoesntExist) {
                    $userRole = new UserRole();
                    $userRole->admin_id = $admin->id;
                    $userRole->role_id = $roleId;
                    $userRole->save();
                } else {
                    // Remove roles not included
                    UserRole::where("admin_id", $admin->id)
                        ->whereNotIn("role_id", $request->userRoles)
                        ->delete();
                }
            }
        } else {
            // Remove roles not included
            UserRole::where("admin_id", $admin->id)
                ->delete();
        }

        $saved = $admin->save();

        $message = $admin->name . " updated";

        return [$saved, $message, $admin];
    }

    /*
     * Destroy Admin
     */
    public function destroy($id)
    {
        $admin = Admin::find($id);

        $deleted = $admin->delete();

        $message = $admin->name . " deleted";

        return [$deleted, $message, $admin];
    }

    /**
     * Get Auth.
     *
     */
    public function auth()
    {
        if (auth("sanctum")->check()) {

            $auth = auth('sanctum')->user();

            $tokenableType = auth('sanctum')->user()->currentAccessToken()->tokenable_type;

            // Check if is admin
            if ($tokenableType == "App\Models\Admin\Admin") {
                return new AdminResource($auth);
            } else {
                return new UserResource($auth);
            }
        } else {
            return response(["message" => "Not Authenticated"], 401);
        }
    }
}
