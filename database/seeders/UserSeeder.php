<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Check if @alphaxardG exists
        $alDoesntExist = User::where('email', 'alphaxardgacuuru47@gmail.com')
            ->doesntExist();

        if ($alDoesntExist) {
            User::factory()->al()->create();
        }

        User::factory()->count(100)->create();
    }
}
