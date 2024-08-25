<?php

namespace App\Http\Controllers;

use App\Http\Services\SubmissionService;
use App\Models\Submission;
use Illuminate\Http\Request;

class SubmissionController extends Controller
{
	public function __construct(protected SubmissionService $service)
	{
		// 
	}

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return $this->service->index($request);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [

		]);

		[$saved, $message, $submission] = $this->service->store($request);

		return response([
			"status" => $saved,
			"message" => $message,
			"data" => $submission
		], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Submission  $submission
     * @return \Illuminate\Http\Response
     */
    public function show(Submission $submission)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Submission  $submission
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Submission $submission)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Submission  $submission
     * @return \Illuminate\Http\Response
     */
    public function destroy(Submission $submission)
    {
        //
    }

	/*
	* Grade Book Submissions
	*/ 
	public function gradeBookSubmissions(Request $request, $unitId)
	{
		return $this->service->gradeBookSubmissions($request, $unitId);
	}

	/*
	* Grade Book Discussions
	*/ 
	public function gradeBookDiscussions(Request $request, $unitId)
	{
		return $this->service->gradeBookDiscussions($request, $unitId);
	}
}
