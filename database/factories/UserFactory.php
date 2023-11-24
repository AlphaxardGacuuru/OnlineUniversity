<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $email = fake()->unique()->safeEmail();

        return [
            'name' => fake()->name(),
            'email' => $email,
            'email_verified_at' => now(),
            'password' => Hash::make($email),
            'remember_token' => Str::random(10),
            'phone' => fake()->phoneNumber(),
            'avatar' => 'avatars/male-avatar.png',
            'created_at' => Carbon::now()->subDay(rand(3, 12)),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return static
     */
    public function unverified()
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    /**
     * Add Alphaxard Account
     *
     * @return static
     */
    public function al()
    {
        return $this->state(fn(array $attributes) => [
            'name' => 'Alphaxard Gacuuru',
            'email' => 'alphaxardgacuuru47@gmail.com',
            'email_verified_at' => now(),
            'avatar' => 'avatars/male-avatar.png',
            'phone' => '0700364446',
            'password' => Hash::make('alphaxardgacuuru47@gmail.com'),
            'remember_token' => Str::random(10),
			'account_type' => 'admin'
        ]);
    }
}
