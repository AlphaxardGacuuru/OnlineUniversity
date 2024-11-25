<?php

namespace App\Http\Services;

use App\Http\Resources\CreditNoteResource;
use App\Models\CreditNote;

class CreditNoteService extends Service
{
    /*
     * Get All Credit Notes
     */
    public function index($request)
    {
        $creditNotesQuery = new CreditNote;

        $creditNotesQuery = $this->search($creditNotesQuery, $request);

        $creditNotes = $creditNotesQuery
            ->orderBy("id", "DESC")
            ->paginate(20)
            ->appends(['courseId' => $request->input("courseId")]);

        return CreditNoteResource::collection($creditNotes);
    }

	/*
	* Get One Credit Note
	*/ 
	public function show($id)
	{
		$creditNote = CreditNote::findOrFail($id);
		
		return new CreditNoteResource($creditNote);
	}

    /*
     * Store Credit Note
     */
    public function store($request)
    {
        $creditNote = new CreditNote;
        $creditNote->user_id = $request->userId;
        $creditNote->description = $request->description;
        $creditNote->amount = $request->amount;
        $creditNote->created_by = $this->id;
        $saved = $creditNote->save();

        $message = "Credit Note created successfully";

        return [$saved, $message, $creditNote];
    }

    /*
     * Update Credit Note
     */
    public function update($request, $id)
    {
        $creditNote = CreditNote::find($id);

        if ($request->filled("description")) {
            $creditNote->description = $request->description;
        }

        if ($request->filled("amount")) {
            $creditNote->amount = $request->amount;
        }

        $saved = $creditNote->save();

        $message = "Credit Note updated successfully";

        return [$saved, $message, $creditNote];
    }

    /*
     * Delete Credit Note
     */
    public function destroy($id)
    {
        $creditNote = CreditNote::findOrFail($id);

        $deleted = $creditNote->delete();

        $message = "Credit Note deleted successfully";

        return [$deleted, $message, $creditNote];
    }

    /*
     * Handle Search
     */
    public function search($query, $request)
    {
        if ($request->filled("name")) {
            $query = $query->whereHas("users", function ($query) use ($request) {
                $query->where("name", "LIKE", "%" . $request->name . "%");
            });
        }

		if ($request->filled("userId")) {
			$query = $query->where("user_id", $request->input("userId"));
		}

        return $query;
    }
}
