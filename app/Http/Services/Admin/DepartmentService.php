<?php

namespace App\Http\Services\Admin;

use App\Http\Resources\DepartmentResource;
use App\Http\Services\Service;
use App\Models\Department;

class DepartmentService extends Service
{
	/*
	* Get All Departments
	*/ 
	public function index()
	{
		$departments = Department::orderBy("id", "DESC")->get();

		return DepartmentResource::collection($departments);
	}
}