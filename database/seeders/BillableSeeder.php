<?php

namespace Database\Seeders;

use App\Models\Billable;
use App\Models\Course;
use Illuminate\Database\Seeder;

class BillableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /*
         * Add Admission Fee
         */
        $courses = Course::all();

        foreach ($courses as $course) {
            Billable::factory()
                ->create([
                    "course_id" => $course->id,
                ]);
        }

        /*
         * Add all other billables
         */

        $courses = Course::where("name", "LIKE", "%Degree%")
            ->orWhere("name", "LIKE", "%Bachelor%")
            ->get();

        foreach ($courses as $course) {
            // Loop through 3 Years
            for ($y = 1; $y <= 3; $y++) {
                // Loop through 3 Semesters
                for ($s = 1; $s <= 3; $s++) {
                    $billables = [
                        [
                            "name" => "Tuition",
                            "price" => rand(4, 6) * 10000,
                            "year" => $y,
                            "semester" => $s,
                            "course_id" => $course->id,
                        ],
                        [
                            "name" => "Exams",
                            "price" => 2000,
                            "year" => $y,
                            "semester" => $s,
                            "course_id" => $course->id,
                        ],
                        [
                            "name" => "Library",
                            "price" => 1500,
                            "year" => $y,
                            "semester" => $s,
                            "course_id" => $course->id,
                        ],
                    ];

                    foreach ($billables as $billable) {
                        Billable::factory()->create($billable);

                        // Update Course price
                        $course = Course::find($course->id);
                        $course->price += $billable["price"];
                        $course->save();
                    }
                }
            }
        }
    }
}
