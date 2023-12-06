<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    /*
     * Relationships
     */
    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function units()
    {
        return $this->hasMany(Unit::class);
    }

    public function userCourses()
    {
        return $this->hasMany(UserCourse::class);
    }

    /*
     * Custom functions
     */

    public function instructors()
    {
        return $this->userCourses
            ->map(fn($userCourse) => $userCourse
                    ->user()
                    ->where("account_type", "instructor")
                    ->first())
            ->filter(fn($item) => $item)
            ->all();
    }

    public function students()
    {
        return $this->userCourses
            ->map(fn($userCourse) => $userCourse
                    ->user()
                    ->where("account_type", "student")
                    ->first())
            ->filter(fn($item) => $item)
            ->all();
    }
}
