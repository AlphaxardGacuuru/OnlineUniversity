<?php

namespace App\Http\Services\Admin;

use App\Http\Resources\UserResource;
use App\Http\Services\Service;
use App\Models\BookedClub;
use App\Models\Club;
use App\Models\MPESA;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class AdminDashboardService extends Service
{
    /**
     * Display a listing of the users.
     */
    public function index()
    {
        // Get Users
        $users = User::count();
        // Get Clubs
        $clubs = Club::count();
        // Get Club Bookings
        $clubBookings = BookedClub::count();
		// Get Income
		$income = MPESA::sum("amount");

		// Format to Currency
		$income = number_format($income);

        // Get Users By Day
        $startDate = Carbon::now()->subWeek()->startOfWeek();
        $endDate = Carbon::now()->subWeek()->endOfWeek();

        $usersByDay = User::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy('date')
            ->get()
            ->map(function ($item) {
                return [
                    "day" => Carbon::parse($item->date)->dayName,
                    "count" => $item->count,
                ];
            });

        // Get Club Bookings by Day
        $bookingsByDay = BookedClub::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy(DB::raw('DATE(created_at)'))
            ->get();

        // Get Transactions by Day
        $incomeByDay = MPESA::select(DB::raw('DATE(created_at) as date'), DB::raw('sum(amount) as count'))
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy(DB::raw('DATE(created_at)'))
            ->get()
            ->map(function ($item) {
                return [
                    "day" => Carbon::parse($item->date)->dayName,
                    "count" => $item->count,
                ];
            });

        return [
            "data" => [
                "users" => $users,
                "clubs" => $clubs,
                "clubBookings" => $clubBookings,
                "income" => $income,
                "usersByDay" => $usersByDay,
                "bookingsByDay" => $bookingsByDay,
                "incomeByDay" => $incomeByDay,
            ]];
    }

    /**
     * Display a listing of users.
     */
    public function users()
    {
        $getUsers = User::all();

        return UserResource::collection($getUsers);
    }
}
