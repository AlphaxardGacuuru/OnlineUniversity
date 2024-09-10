<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{
    use HasFactory;

    /*
     * Relationships
     */

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_units');
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function userUnits()
    {
        return $this->hasMany(UserUnit::class);
    }

    public function materials()
    {
        return $this->hasMany(Material::class);
    }

    /*
     * Custom functions
     */

    public function instructors()
    {
        return $this->userUnits
            ->filter(fn($userUnit) => !is_null($userUnit->user))
            ->map(fn($userUnit) => $userUnit
                    ->user()
                    ->where("account_type", "instructor")
                    ->first());
    }

    public function students()
    {
        return $this->userUnits
            ->filter(fn($userUnit) => !is_null($userUnit->user))
            ->map(fn($userUnit) => $userUnit
                    ->user()
                    ->where("account_type", "student")
                    ->first())
            ->all();
    }
}
