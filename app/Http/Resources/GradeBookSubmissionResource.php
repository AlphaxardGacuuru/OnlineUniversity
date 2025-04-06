<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class GradeBookSubmissionResource extends JsonResource
{
    public function calculateRating()
    {
        return $this["discussionForums"]
            ->reduce(fn($acc, $submission) => $acc + $submission->total_ratings);
    }

    public function calculateGrade($type)
    {
        $grades = $this["data"]
            ->filter(fn($submission) => $submission->type == $type)
            ->first()
        ?->grades;

        $gradedByInstructor = $grades
            ?->filter(fn($grade) => $grade->gradedByInstructor)
            ->first()
        ?->gradedByInstructor;

        $totalGrade = $grades
        ?->reduce(fn($acc, $grade) => $acc + $grade->grade);

        return [
            "gradedByInstructor" => $gradedByInstructor,
            "grade" => $totalGrade,
        ];
    }

    public function calculateMarks($type)
    {
        return $this["data"]
            ->filter(fn($submission) => $submission->type == $type)
            ->reduce(function ($acc, $submission) {
                $grade = collect($submission->answers)
                    ->reduce(function ($acc, $answer) {
                        $answerIsCorrect = $answer["student"] == $answer["correct"];

                        return $answerIsCorrect ? $acc + 1 : $acc;
                    });

                return $acc + $grade;
            });
    }

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $data = $this["data"]->first();

        return [
            "userId" => $this["userId"],
            "userName" => $data->user->name,
            "userAvatar" => $data->user->avatar,
            "academicSessionId" => $data->academic_session_id,
            "unitId" => $data->unit_id,
            "discussionForum" => $this->calculateRating(),
            "writtenAssignment" => $this->calculateGrade("Written Assignment"),
            "learningReflection" => $this->calculateGrade("Learning Reflection"),
            "selfQuiz" => $this->calculateMarks("Self Quiz"),
            "cat1" => $this->calculateMarks("CAT 1"),
            "cat2" => $this->calculateMarks("CAT 2"),
            "reviewQuiz" => $this->calculateMarks("Review Quiz"),
            "finalExam" => $this->calculateMarks("Final Exam"),
            // "attachment" => $data->attachment,
            // "updatedAt" => $data->updated_at,
            // "createdAt" => $data->created_at,
        ];
    }
}
