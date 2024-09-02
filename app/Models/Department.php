<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    /*
     * Relationships
     */

    public function faculty()
    {
        return $this->belongsTo(Faculty::class);
    }

    public function courses()
    {
        return $this->hasMany(Course::class);
    }

    /*
     * Custom Functions
     */

    public function units()
    {
        return $this->courses
            ->filter(fn($course) => !is_null($course->units))
            ->map(fn($course) => $course->units)
            ->flatten();
    }

    public function materials()
    {
        return $this->units()
            ->filter(fn($unit) => !is_null($unit->materials))
            ->map(fn($unit) => $unit->materials)
            ->flatten();
    }
}
