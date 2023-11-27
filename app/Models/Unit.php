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
	public function course()
	{
		return belongsTo(Course::class);
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

    public function professors()
    {
        return $this->userUnits
            ->map(fn($userUnit) => $userUnit
                    ->user()
                    ->where("account_type", "professor")
                    ->first())
            ->filter(fn($item) => $item)
            ->all();
    }

    public function students()
    {
        return $this->userUnits
            ->map(fn($userUnit) => $userUnit
                    ->user()
                    ->where("account_type", "student")
                    ->first())
            ->filter(fn($item) => $item)
            ->all();
    }
}
