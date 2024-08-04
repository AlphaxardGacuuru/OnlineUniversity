<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Unit;
use Illuminate\Database\Seeder;

class UnitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $courses = Course::all();

        foreach ($courses as $course) {
            // Loop to get unique code names
            for ($i = 0; $i < rand(35, 40); $i++) {
                Unit::factory()
                    ->create([
                        "code" => substr($course->department->name, 0, 3) . "-" . rand(100, 999),
                        "course_id" => $course->id,
                    ]);
            }
        }
    }
}
