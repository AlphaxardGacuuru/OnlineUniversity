<?php

namespace App\Http\Services\Admin;

use App\Http\Resources\FacultyResource;
use App\Http\Services\Service;
use App\Models\Faculty;

class FacultyService extends Service
{
	/*
	* Get All Faculties
	*/ 
	public function index()
	{
		$faculties = Faculty::orderBy("id", "DESC")->get();

		return FacultyResource::collection($faculties);
	}
}