<?php

namespace Database\Seeders;

use App\Models\Material;
use App\Models\Unit;
use Illuminate\Database\Seeder;

class MaterialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $units = Unit::orderBy("id", "DESC")
            ->limit(1)
            ->get();

        $weeks = rand(14, 16);

        $titles = [
            "Learning Guide",
            "Discussion Forum",
            "Written Assignment",
            "Learning Reflection",
            // "Self Quiz",
            // "CAT 1",
            // "CAT 2",
            // "Review Quiz",
            // "Final Exam",
        ];

        // Loop through each unit
        foreach ($units as $unit) {

            // Loop through weeks
            for ($a = 1; $a <= $weeks; $a++) {

                // Loop through titles
                foreach ($titles as $title) {
                    Material::factory()
                        ->create([
                            "title" => $title,
                            "week" => $a,
                            "unit_id" => $unit->id,
                        ]);
                }
            }
        }
    }
}
