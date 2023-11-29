<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'updated_at' => 'datetime:d M Y',
        'created_at' => 'datetime:d M Y',
    ];

    /**
     * Accesors.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function avatar(): Attribute
    {
        return Attribute::make(
            get: fn($value) => preg_match("/http/", $value) ? $value : "/storage/" . $value
        );
    }

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

    public function userFaculties()
    {
        return $this->hasMany(UserFaculty::class);
    }

    public function userDepartments()
    {
        return $this->hasMany(UserDepartment::class);
    }

    public function userCourses()
    {
        return $this->hasMany(UserCourse::class);
    }

    public function userUnits()
    {
        return $this->hasMany(UserUnit::class);
    }

    /*
     * Custom functions
     */

    public function faculty()
    {
        return $this->userFaculties()
            ->get()
            ->map(fn($userFaculty) => $userFaculty->faculty)
            ->first();
    }

    public function department()
    {
        return $this->userDepartments()
            ->get()
            ->map(fn($userDepartment) => $userDepartment->department)
            ->first();
    }

    public function course()
    {
        return $this->userCourses()
            ->get()
            ->map(fn($userCourse) => $userCourse->course)
            ->first();
    }

    public function unit()
    {
        return $this->userUnits()
            ->get()
            ->map(fn($userUnit) => $userUnit->unit)
            ->first();
    }
}
