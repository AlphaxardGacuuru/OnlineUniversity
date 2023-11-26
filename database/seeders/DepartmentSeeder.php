<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\Faculty;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // List Departments
        $faculties = [
            "Arts" => ["Literature", "Languages", "History", "Philosophy", "Fine Arts", "Performing Arts"],
            "Science" => ["Physics", "Chemistry", "Biology", "Mathematics", "Computer Science", "Environmental Science"],
            "Social Sciences" => ["Sociology", "Psychology", "Economics", "Political Science", "Anthropology"],
            "Business" => ["Business Administration", "Accounting", "Finance", "Marketing", "Management Information Systems"],
            "Law" => ["Criminal Law", "Civil Law", "International Law", "Constitutional Law"],
            "Education" => ["Curriculum and Instruction", "Educational Leadership", "Special Education", "Counseling"],
            "Technology" => ["Chemical Engineering", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering", "Software Engineering"],
            "Architecture and Design" => ["Architecture", "Urban Planning", "Interior Design", "Landscape Architecture"],
        ];

        foreach ($faculties as $key => $departments) {
            $faculty = Faculty::where("name", $key)->first();

            // Loop through departments
            foreach ($departments as $name) {
                Department::factory()->create([
                    "name" => $name,
                    "faculty_id" => $faculty->id,
                ]);
            }
        }
    }
}
