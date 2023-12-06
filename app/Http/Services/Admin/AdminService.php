<?php

namespace App\Http\Services\Admin;

use App\Http\Resources\InstructorResource;
use App\Http\Services\Service;
use App\Models\Course;
use App\Models\Department;
use App\Models\Faculty;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class AdminService extends Service
{
    public function index()
    {
        return [
            "instructors" => $this->instructors(),
            "students" => $this->students(),
            "staff" => $this->staff(),
            "faculties" => $this->faculties(),
            "departments" => $this->departments(),
            "courses" => $this->courses(),
            // "orders" => $this->orders(),
            // "revenue" => $this->revenue(),
            // "products" => $this->products(),
            // "revenueLastWeek" => $this->revenueLastWeek(),
            // "productsLastWeek" => $this->productsLastWeek(),
        ];
    }

    /*
     * Get Instructors Data
     */
    public function instructors()
    {
        $instructorQuery = User::where("account_type", "instructor");

        $total = $instructorQuery->count();

        $carbonYesterday = now()->subDay();

        $yesterday = $instructorQuery->whereDate("created_at", $carbonYesterday)->count();

        $carbonToday = Carbon::today()->toDateString();

        $today = $instructorQuery->whereDate("created_at", $carbonToday)->count();

        // Get Users By Day
        $startDate = Carbon::now()->subWeek()->startOfWeek();
        $endDate = Carbon::now()->subWeek()->endOfWeek();

        $getInstructorsLastWeek = User::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
            ->where("account_type", "instructor")
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy(DB::raw('DATE(users.created_at)'))
            ->get()
            ->map(fn($item) => $item->count);

        $instructors = $instructorQuery->orderBy("id", "DESC")->paginate(20);

        $instructors = instructorResource::collection($instructors);

        return [
            "total" => $total,
            "growth" => $this->growth($yesterday, $today),
            "lastWeek" => $getInstructorsLastWeek,
            "list" => $instructors,
            "lastMonth" => $this->instructorsLastMonth(),
        ];
    }

    /*
     * Get Students Data
     */
    public function students()
    {
        $studentQuery = User::where("account_type", "student");

        $total = $studentQuery->count();

        $carbonYesterday = now()->subDay();

        $yesterday = $studentQuery->whereDate("created_at", $carbonYesterday)->count();

        $carbonToday = Carbon::today()->toDateString();

        $today = $studentQuery->whereDate("created_at", $carbonToday)->count();

        // Get Users By Day
        $startDate = Carbon::now()->subWeek()->startOfWeek();
        $endDate = Carbon::now()->subWeek()->endOfWeek();

        $getStudentsLastWeek = User::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
            ->where("account_type", "student")
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy(DB::raw('DATE(users.created_at)'))
            ->get()
            ->map(fn($item) => $item->count);

        $students = $studentQuery->orderBy("id", "DESC")->paginate(20);

        $students = instructorResource::collection($students);

        return [
            "total" => $total,
            "growth" => $this->growth($yesterday, $today),
            "lastWeek" => $getStudentsLastWeek,
            "list" => $students,
            "lastMonth" => $this->studentsLastMonth(),
        ];
    }

    /*
     * Get Staff Data
     */
    public function staff()
    {
        $staffQuery = User::where("account_type", "staff");

        $total = $staffQuery->count();

        $carbonYesterday = now()->subDay();

        $yesterday = $staffQuery->whereDate("created_at", $carbonYesterday)->count();

        $carbonToday = Carbon::today()->toDateString();

        $today = $staffQuery->whereDate("created_at", $carbonToday)->count();

        // Get Users By Day
        $startDate = Carbon::now()->subWeek()->startOfWeek();
        $endDate = Carbon::now()->subWeek()->endOfWeek();

        $getUsersLastWeek = User::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
            ->where("account_type", "student")
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy(DB::raw('DATE(users.created_at)'))
            ->get()
            ->map(fn($item) => $item->count);

        $staff = $staffQuery->orderBy("id", "DESC")->paginate(20);

        $staff = instructorResource::collection($staff);

        return [
            "total" => $total,
            "growth" => $this->growth($yesterday, $today),
            "lastWeek" => $getUsersLastWeek,
            "list" => $staff,
            "lastMonth" => $this->staffLastMonth(),
        ];
    }

    /*
     * Get Instructors Data
     */
    public function faculties()
    {
        $total = Faculty::count();

        $carbonYesterday = now()->subDay();

        $yesterday = Faculty::whereDate("created_at", $carbonYesterday)->count();

        $carbonToday = Carbon::today()->toDateString();

        $today = Faculty::whereDate("created_at", $carbonToday)->count();

        // Get Users By Day
        $startDate = Carbon::now()->subWeek()->startOfWeek();
        $endDate = Carbon::now()->subWeek()->endOfWeek();

        $getFacultiesLastWeek = Faculty::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy(DB::raw('DATE(faculties.created_at)'))
            ->get()
            ->map(fn($item) => $item->count);

        return [
            "total" => $total,
            "growth" => $this->growth($yesterday, $today),
            "lastWeek" => $getFacultiesLastWeek,
        ];
    }

    /*
     * Get Instructors Data
     */
    public function departments()
    {
        $total = Department::count();

        $carbonYesterday = now()->subDay();

        $yesterday = Department::whereDate("created_at", $carbonYesterday)->count();

        $carbonToday = Carbon::today()->toDateString();

        $today = Department::whereDate("created_at", $carbonToday)->count();

        // Get Users By Day
        $startDate = Carbon::now()->subWeek()->startOfWeek();
        $endDate = Carbon::now()->subWeek()->endOfWeek();

        $getDepartmentsLastWeek = Department::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy(DB::raw('DATE(departments.created_at)'))
            ->get()
            ->map(fn($item) => $item->count);

        return [
            "total" => $total,
            "growth" => $this->growth($yesterday, $today),
            "lastWeek" => $getDepartmentsLastWeek,
        ];
    }

    /*
     * Get Instructors Data
     */
    public function courses()
    {
        $total = Course::count();

        $carbonYesterday = now()->subDay();

        $yesterday = Course::whereDate("created_at", $carbonYesterday)->count();

        $carbonToday = Carbon::today()->toDateString();

        $today = Course::whereDate("created_at", $carbonToday)->count();

        // Get Users By Day
        $startDate = Carbon::now()->subWeek()->startOfWeek();
        $endDate = Carbon::now()->subWeek()->endOfWeek();

        $getCoursesLastWeek = Course::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy(DB::raw('DATE(courses.created_at)'))
            ->get()
            ->map(fn($item) => $item->count);

        return [
            "total" => $total,
            "growth" => $this->growth($yesterday, $today),
            "lastWeek" => $getCoursesLastWeek,
        ];
    }

    /*
     * Get Revenue
     */
    public function revenue()
    {
        $total = Order::sum('total_value');

        $carbonYesterday = now()->subDay();

        $yesterday = Order::whereDate("date", $carbonYesterday)->sum("total_value");

        $carbonToday = Carbon::today()->toDateString();

        $today = Order::whereDate("date", $carbonToday)->sum("total_value");

        $growth = $this->growth($yesterday, $today);

        return [
            "total" => number_format($total),
            "growth" => $growth,
        ];
    }

    /*
     * Get Instructors Last Month
     */
    public function instructorsLastMonth()
    {
        // Get Ordes By Day
        $startDate = Carbon::now()->startOfMonth();
        $endDate = Carbon::now()->endOfMonth();

        $getInstructorsLastWeek = User::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
            ->where("account_type", "instructor")
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy(DB::raw('DATE(users.created_at)'))
            ->get()
            ->map(function ($item) {
                return [
                    "day" => Carbon::parse($item->date)->day,
                    "count" => $item->count,
                ];
            });

        // Extract the days from your collection
        $existingDays = $getInstructorsLastWeek->pluck('day')->toArray();

        // Get the range of days in the current month (from 1 to the last day of the month)
        $startDay = 1;
        $endDay = now()->endOfMonth()->day;
        $allDays = range($startDay, $endDay);

        // Fill missing days with default count of zero
        $missingDays = array_diff($allDays, $existingDays);
        $missingDaysData = collect($missingDays)->map(function ($day) {
            return [
                "day" => $day,
                "count" => 0,
            ];
        })->toArray();

        // Merge existing data with the missing days filled with default count
        $mergedData = $getInstructorsLastWeek
            ->concat($missingDaysData)
            ->sortBy('day')
            ->values();

        $labels = $mergedData->map(fn($item) => $item["day"]);
        $data = $mergedData->map(fn($item) => $item["count"]);

        return [
            "labels" => $labels,
            "data" => $data,
        ];
    }

    /*
     * Get Student Last Month
     */
    public function studentsLastMonth()
    {
        // Get Ordes By Day
        $startDate = Carbon::now()->startOfMonth();
        $endDate = Carbon::now()->endOfMonth();

        $getStudentsLastWeek = User::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
            ->where("account_type", "students")
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy(DB::raw('DATE(users.created_at)'))
            ->get()
            ->map(function ($item) {
                return [
                    "day" => Carbon::parse($item->date)->day,
                    "count" => $item->count,
                ];
            });

        // Extract the days from your collection
        $existingDays = $getStudentsLastWeek->pluck('day')->toArray();

        // Get the range of days in the current month (from 1 to the last day of the month)
        $startDay = 1;
        $endDay = now()->endOfMonth()->day;
        $allDays = range($startDay, $endDay);

        // Fill missing days with default count of zero
        $missingDays = array_diff($allDays, $existingDays);
        $missingDaysData = collect($missingDays)->map(function ($day) {
            return [
                "day" => $day,
                "count" => 0,
            ];
        })->toArray();

        // Merge existing data with the missing days filled with default count
        $mergedData = $getStudentsLastWeek
            ->concat($missingDaysData)
            ->sortBy('day')
            ->values();

        $labels = $mergedData->map(fn($item) => $item["day"]);
        $data = $mergedData->map(fn($item) => $item["count"]);

        return [
            "labels" => $labels,
            "data" => $data,
        ];
    }

    /*
     * Get Staff Last Month
     */
    public function staffLastMonth()
    {
        // Get Ordes By Day
        $startDate = Carbon::now()->startOfMonth();
        $endDate = Carbon::now()->endOfMonth();

        $getStaffLastWeek = User::select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as count'))
            ->where("account_type", "staff")
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy(DB::raw('DATE(users.created_at)'))
            ->get()
            ->map(function ($item) {
                return [
                    "day" => Carbon::parse($item->date)->day,
                    "count" => $item->count,
                ];
            });

        // Extract the days from your collection
        $existingDays = $getStaffLastWeek->pluck('day')->toArray();

        // Get the range of days in the current month (from 1 to the last day of the month)
        $startDay = 1;
        $endDay = now()->endOfMonth()->day;
        $allDays = range($startDay, $endDay);

        // Fill missing days with default count of zero
        $missingDays = array_diff($allDays, $existingDays);
        $missingDaysData = collect($missingDays)->map(function ($day) {
            return [
                "day" => $day,
                "count" => 0,
            ];
        })->toArray();

        // Merge existing data with the missing days filled with default count
        $mergedData = $getStaffLastWeek
            ->concat($missingDaysData)
            ->sortBy('day')
            ->values();

        $labels = $mergedData->map(fn($item) => $item["day"]);
        $data = $mergedData->map(fn($item) => $item["count"]);

        return [
            "labels" => $labels,
            "data" => $data,
        ];
    }

    /*
     * Get Revenue Last Week
     */
    public function revenueLastWeek()
    {

        // Get Revenue By Day
        $startDate = Carbon::now()->subWeek()->startOfWeek();
        $endDate = Carbon::now()->subWeek()->endOfWeek();

        $getRevenueLastWeek = Order::select(DB::raw('DATE(created_at) as date'), DB::raw('sum(total_value) as sum'))
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy(DB::raw('DATE(orders.created_at)'))
            ->get()
            ->map(function ($item) {
                return [
                    "day" => Carbon::parse($item->date)->dayName,
                    "sum" => $item->sum,
                ];
            });

        $revenueLastWeekLabels = $getRevenueLastWeek->map(fn($item) => $item["day"]);
        $revenueLastWeekData = $getRevenueLastWeek->map(fn($item) => $item["sum"]);

        return [
            "labels" => $revenueLastWeekLabels,
            "data" => $revenueLastWeekData,
        ];
    }

    /*
     * Get Revenue Last Week
     */
    public function productsLastWeek()
    {
        // Get Revenue By Day
        $startDate = Carbon::now()->subWeek()->startOfWeek();
        $endDate = Carbon::now()->subWeek()->endOfWeek();

        $getRevenueLastWeek = Order::select(DB::raw('DATE(created_at) as date'), DB::raw('sum(total_value) as sum'))
            ->whereBetween('created_at', [$startDate, $endDate])
            ->groupBy(DB::raw('DATE(orders.created_at)'))
            ->get()
            ->map(function ($item) {
                return [
                    "day" => Carbon::parse($item->date)->dayName,
                    "sum" => $item->sum,
                ];
            });

        $revenueLastWeekLabels = $getRevenueLastWeek->map(fn($item) => $item["day"]);
        $revenueLastWeekData = $getRevenueLastWeek->map(fn($item) => $item["sum"]);

        return [
            "labels" => $revenueLastWeekLabels,
            "data" => $revenueLastWeekData,
        ];
    }

    // Calculate Growth
    public function growth($yesterday, $today)
    {
        // Resolve for Division by Zero
        if ($yesterday == 0) {
            $growth = $today == 0 ? 0 : $today * 100;
        } else if ($today == 0) {
            $growth = $yesterday == 0 ? 0 : $yesterday * -100;
        } else {
            $growth = $today / $yesterday * 100;
        }

        return number_format($growth, 1);
    }
}
