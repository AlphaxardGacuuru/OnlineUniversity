<?php

namespace App\Http\Services;

use App\Http\Resources\SubmissionResource;
use App\Models\Submission;

class SubmissionService extends Service
{
    /*
     * Get Submissions
     */
    public function index($request)
    {
        $submissionsQuery = Submission::where("academic_session_id", $request->input("sessionId"))
            ->where("unit_id", $request->input("unitId"))
            ->where("material_id", $request->input("materialId"));

        $submissionsQuery = $this->search($submissionsQuery, $request);

        $submissions = $submissionsQuery
            ->orderBy("id", "DESC")
            ->paginate();

        return SubmissionResource::collection($submissions);
    }

    /*
     * Store
     */
    public function store($request)
    {
        $submissionQuery = Submission::where("academic_session_id", $request->sessionId)
            ->where("unit_id", $request->unitId)
            ->where("material_id", $request->materialId)
            ->where("user_id", $this->id)
            ->where("type", $request->type);

        $submissionDoesntExist = $submissionQuery->doesntExist();

        if ($submissionDoesntExist) {
            // Add New Submission
            $submission = new Submission;
            $submission->academic_session_id = $request->sessionId;
            $submission->unit_id = $request->unitId;
            $submission->material_id = $request->materialId;
            $submission->user_id = $this->id;
            $submission->type = $request->type;
            $submission->answers = $request->answers;

            $message = $request->type . " saved";
        } else {
            $submission = $submissionQuery->first();

            if ($request->answers) {
                $submission->answers = $request->answers;
            }

            $message = $request->type . " updated";
        }

        $saved = $submission->save();

        return [$saved, $message, $submission];
    }

    /*
     * Handle Search
     */
    public function search($query, $request)
    {
        if ($request->filled("userId")) {
            $query = $query
                ->where("user_id", $request->input("userId"));
        }

        return $query;
    }
}
