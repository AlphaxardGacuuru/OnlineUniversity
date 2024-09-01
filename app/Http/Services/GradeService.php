<?php

namespace App\Http\Services;

use App\Models\Grade;

class GradeService extends Service
{
    /*
     * Store Grade
     */
    public function store($request)
    {
        // Check if User has graded
        $gradeQuery = Grade::where("user_id", $this->id)
            ->where("submission_id", $request->submissionId);

        if ($gradeQuery->doesntExist()) {
            $grade = new Grade;
            $grade->user_id = $this->id;

            $message = "Grade saved";
        } else {
            $grade = $gradeQuery->first();

            $message = "Grade updated";
        }

        $grade->submission_id = $request->input("submissionId");
        $grade->grade = $request->input("grade");
        $grade->comments = $request->input("comments");
        $saved = $grade->save();

        return [$saved, $message, $grade];
    }

	/*
	* Update Grade
	*/ 
	public function update($request, $id)
	{
		$grade = Grade::find($id);

		if ($request->filled("newGrade")) {
			$otherGrades = $request->currentGrade - $grade->grade;
			$newGrade = $request->newGrade -$otherGrades;

			$grade->grade = $newGrade;
		}

		if ($request->filled("comments")) {
			$grade->comments = $request->comments;
		}

		$save = $grade->save();

		return [$save, "Grade updated successfully", $grade];
	}
}
