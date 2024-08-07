<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            UserSeeder::class,
            InstructorSeeder::class,
            StaffSeeder::class,
            FacultySeeder::class,
            DepartmentSeeder::class,
            CourseSeeder::class,
            UnitSeeder::class,
			MaterialSeeder::class,
			BillableSeeder::class,
			AcademicSessionSeeder::class
        ]);
    }
}
