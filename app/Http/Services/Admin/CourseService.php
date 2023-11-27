<?php

namespace App\Http\Services\Admin;

use App\Http\Resources\CourseResource;
use App\Http\Services\Service;
use App\Models\Course;

class CourseService extends Service
{
	/*
	* Get All Courses
	*/ 
	public function index()
	{
		$courses = Course::orderBy("id", "DESC")->paginate();

		return CourseResource::collection($courses);
	}

	/*
	* Get One Course
	*/ 
	public function show($id)
	{
		$course = Course::find($id);

		return new CourseResource($course);
	}

	/*
	* Store Course
	*/ 
	public function store($request)
	{
		$course = new Course;
		$course->name = $request->input("name");
		$course->description = $request->input("description");
		$course->duration = $request->input("duration");
		$course->price = $request->input("price");
		$course->department_id = $request->input("departmentId");

		$saved = $course->save();

		$message = $course->name . " created successfully";

		return [$saved, $message, $course];
	}

	/*
	* Update
	*/ 
	public function update($request, $id)
	{
		$course = Course::find($id);

		if ($request->filled("name")) {
			$course->name = $request->input("name");
		}

		if ($request->filled("description")) {
			$course->description = $request->input("description");
		}

		if ($request->filled("duration")) {
			$course->duration = $request->input("duration");
		}

		if ($request->filled("price")) {
			$course->price = $request->input("price");
		}

		if ($request->filled("departmentId")) {
			$course->department_id = $request->input("departmentId");
		}

		$saved = $course->save();

		$message = $course->name . " updated successfully";

		return [$saved, $message, $course];
	}

	/*
	* Destroy
	*/ 
	public function destory($id)
	{
		$course = Course::find($id);
		
		$deleted = $course->delete();

		$message = $course->name . " deleted successfully";

		return [$deleted, $message, $course];
	}
}