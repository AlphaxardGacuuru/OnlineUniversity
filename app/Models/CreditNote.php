<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CreditNote extends Model
{
    use HasFactory;

	/*
	* Relationships
	*/ 
	public function user()
	{
		return $this->belongsTo(User::class);
	}
}
