<?php

namespace App\Http\Services;

use App\Http\Resources\GradeBookDiscussionResource;
use App\Http\Resources\GradeBookSubmissionResource;
use App\Http\Resources\SubmissionResource;
use App\Models\DiscussionForum;
use App\Models\Submission;

class SubmissionService extends Service
{
    /*
     * Get Submissions
     */
    public function index($request)
    {
        $submissionsQuery = Submission::where("unit_id", $request->input("unitId"));

        $submissionsQuery = $this->search($submissionsQuery, $request);

        $submissions = $submissionsQuery
            ->orderBy("id", "DESC")
            ->paginate(20);

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
     * Grade Book Submissions
     */
    public function gradeBookSubmissions($request, $unitId)
    {
        $submissionsQuery = Submission::where("unit_id", $unitId);

        $submissionsQuery = $this->search($submissionsQuery, $request);

        $discussionForums = $this->gradeBookDiscussions($request, $unitId);

        $submissions = $submissionsQuery
            ->get()
            ->groupBy("user_id")
            ->map(function ($submissionModels, $key) use ($discussionForums) {
                // Add isInstructor attribute to grades
                $submissions = $submissionModels
                    ->each(function ($submission) {
                        $submission
                            ->grades
                            ->each(function ($grade) {
                                $isInstructor = $grade->user->account_type == "instructor";

                                $grade->gradedByInstructor = $isInstructor ? $grade->id : "";
                            });
                    });

                $discussionForums = $discussionForums
                    ->filter(fn($discussionForum) => $discussionForum["userId"] == $key)
                    ->first();

                return [
                    "userId" => $key,
                    "data" => $submissions,
                    "discussionForums" => $discussionForums ? $discussionForums["data"] : [],
                ];
            })
            ->values();

        return GradeBookSubmissionResource::collection($submissions);
    }

    /*
     * Grade Book Discussions
     */
    public function gradeBookDiscussions($request, $unitId)
    {
        $discussionForumsQuery = DiscussionForum::where("unit_id", $unitId);

        $discussionForumsQuery = $this->search($discussionForumsQuery, $request);

        $discussionForums = $discussionForumsQuery
            ->get()
            ->groupBy("user_id")
            ->map(function ($discussionForumModels, $key) {
                // Add isInstructor attribute to grades
                $discussionForums = $discussionForumModels
                    ->each(function ($discussionForum) {
                        $discussionForum->gradedByInstructor = $discussionForum
                            ->ratings()
                            ->get()
                            ->first(fn($rating) => $rating->user->account_type == "instructor")
                        ?->id;
                    });

                return [
                    "userId" => $key,
                    "data" => $discussionForums,
                ];
            })
            ->values();

        return GradeBookDiscussionResource::collection($discussionForums);
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

        if ($request->filled("sessionId")) {
            $query = $query
                ->where("academic_session_id", $request->input("sessionId"));
        }

        if ($request->filled("materialId")) {
            $query = $query
                ->where("material_id", $request->input("materialId"));
        }

        return $query;
    }
}
