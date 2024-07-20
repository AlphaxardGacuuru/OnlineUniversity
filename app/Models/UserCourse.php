<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserCourse extends Model
{
    use HasFactory;

	/*
	* Relationships
	*/ 
	
	public function user()
	{
		return $this->belongsTo(User::class);
	}
	
	public function course()
	{
		return $this->belongsTo(Course::class);
	}
	
	public function approvedBy()
	{
		return $this->belongsTo(User::class, "approved_by");
	}
	
	public function deniedBy()
	{
		return $this->belongsTo(User::class, "denied_by");
	}

	/*
	* Custom
	*/
}
