<?php

namespace Database\Seeders;

use App\Models\AcademicSession;
use App\Models\Course;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class AcademicSessionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $courses = Course::orderBy("id", "DESC")
            ->limit(2)
            ->get();

        $year = Carbon::now()->year;

        foreach ($courses as $course) {
            for ($s = 1; $s <= 3; $s++) {
                switch ($s) {
                    case 1:
                        $startsAt = Carbon::create($year, 1, 1);
                        $endsAt = Carbon::create($year, 4, 30);
                        break;
                    case 2:
                        $startsAt = Carbon::create($year, 5, 1);
                        $endsAt = Carbon::create($year, 8, 31);
                        break;
                    case 3:
                        $startsAt = Carbon::create($year, 9, 1);
                        $endsAt = Carbon::create($year, 12, 31);
                        break;
                }

                AcademicSession::factory()
                    ->create([
                        "course_id" => $course->id,
                        "year" => 1,
                        "semester" => $s,
                        "starts_at" => $startsAt,
                        "ends_at" => $endsAt,
                    ]);
            }
        }
    }
}
