<?php

namespace App\Http\Services;

use App\Http\Resources\EnrollmentResource;
use App\Http\Resources\UserResource;
use App\Models\CardTransaction;
use App\Models\MPESATransaction;
use App\Models\User;
use App\Models\UserCourse;
use Illuminate\Support\Carbon;
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

        if ($request->filled("approved")) {
            $userCourse = UserCourse::find($request->enrollmentId);
            $userCourse->approved_by = $request->action ? $this->id : NULL;
            $userCourse->save();

            $message = "Account approved";
        }

        if ($request->filled("denied")) {
            $userCourse = UserCourse::find($request->enrollmentId);
            $userCourse->denied_by = $request->action ? $this->id : NULL;
            $userCourse->save();

            $message = "Account denied";
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

    /*
     * Fee Statements
     */
    public function feeStatements($id)
    {
        // Retrieve the user by ID with its associated courses
        $userCourses = User::with('courses')
            ->find($id)
            ->courses()
            ->select("courses.id", "courses.name", "price as debit", "user_courses.created_at")
            ->get();

        $cardPaymentQuery = CardTransaction::select("id", "amount as credit", "created_at")
            ->where("user_id", $id);

        $mpesaPaymentQuery = MPESATransaction::select("id", "amount as credit", "created_at")
            ->where("user_id", $id);

        // Calculate total fees paid
        $feesPaid = $cardPaymentQuery->sum("amount") + $mpesaPaymentQuery->sum("amount");

        $cardPayments = $cardPaymentQuery->get();

        $mpesaPayments = $mpesaPaymentQuery->get();

        $balance = 0;

        $feeStatements = $userCourses
            ->concat($cardPayments)
            ->concat($mpesaPayments)
            ->sortBy(fn($item) => Carbon::parse($item->created_at))
            ->values()
            ->map(function ($item) use (&$balance) {

                // Calculate balance
                if ($item->credit) {
                    $balance -= $item->credit;
                } else {
                    $balance += $item->debit;
                }

                $item->balance = number_format($balance);
                $item->type = $item->credit ? "Fees Paid" : $item->name;
                $item->credit = number_format($item->credit);
                $item->debit = number_format($item->debit);

                return $item;
            })
            ->reverse()
            ->values();

        return [
            "data" => [
                "statement" => $feeStatements,
                "paid" => $feesPaid,
            ],
        ];
    }

    /*
     * Enrollments
     */
    public function enrollments($request)
    {
        $enrollmentQuery = UserCourse::orderBy("id", "DESC");

        $name = $request->input("name");

        if ($request->filled("name")) {
            $enrollmentQuery = $enrollmentQuery
                ->whereHas("user", function ($query) use ($name) {
                    $query->where("name", "LIKE", "%" . $name . "%");
                });
        }

        if ($request->filled("status")) {
            switch ($request->filled("status")) {
                case "pending":
                    $enrollmentQuery = $enrollmentQuery
                        ->whereNull("approved_by")
                        ->whereNull("denied_by");
                    break;

                case "approved":
                    $enrollmentQuery = $enrollmentQuery->whereNotNull("approved_by");
                    break;

                default:
                    $enrollmentQuery = $enrollmentQuery->whereNotNull("denied_by");
                    break;
            }
        }

        $enrollments = $enrollmentQuery->paginate(20);

        return EnrollmentResource::collection($enrollments);
    }
}
