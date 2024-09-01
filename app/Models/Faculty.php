<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faculty extends Model
{
    use HasFactory;

    /**
     * Accesors.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */

    protected function updatedAt(): Attribute
    {
        return Attribute::make(
            get: fn($value) => Carbon::parse($value)->format('d M Y'),
        );
    }

    protected function createdAt(): Attribute
    {
        return Attribute::make(
            get: fn($value) => Carbon::parse($value)->format('d M Y'),
        );
    }

    /*
     * Relationships
     */

    public function departments()
    {
        return $this->hasMany(Department::class, "faculty_id", "id");
    }

    public function userFaculties()
    {
        return $this->hasMany(UserFaculty::class, "faculty_id", "id");
    }

    /*
     * Custom functions
     */

    public function courses()
    {
        return $this->departments()
            ->get()
			->filter(fn($department) => !is_null($department->courses))
            ->map(fn($department) => $department->courses)            
            ->flatten();
    }

    public function units()
    {
        return $this->courses()
            ->filter(fn($course) => !is_null($course->units))
            ->map(fn($course) => $course->units)
            ->flatten();
    }

    public function materials()
    {
        return $this->units()
            ->filter(fn($units) => !is_null($units->material))
            ->map(fn($units) => $units->material)
            ->flatten();
    }

    public function instructors()
    {
        return $this->userFaculties
            ->map(fn($userFaculty) => $userFaculty
                    ->user()
                    ->where("account_type", "instructor")
                    ->first())
            ->filter(fn($item) => $item)
            ->all();
    }

    public function students()
    {
        return $this->userFaculties
            ->map(fn($userFaculty) => $userFaculty
                    ->user()
                    ->where("account_type", "student")
                    ->first())
            ->filter(fn($item) => $item)
            ->all();
    }
}
