<?php

namespace App\Http\Services;

use App\Http\Resources\BillableResource;
use App\Models\Billable;

class BillableService extends Service
{
    public function index($request)
    {
        $billablesQuery = new Billable;

        $billablesQuery = $this->search($billablesQuery, $request);

        $billables = $billablesQuery
            ->orderBy("year", "ASC")
            ->orderBy("semester", "ASC")
            ->paginate(20)
            ->appends(['courseId' => $request->input("courseId")]);

        return BillableResource::collection($billables);
    }

    /*
     * Get One Billable
     */
    public function show($id)
    {
        $billable = Billable::findOrFail($id);

        return new BillableResource($billable);
    }

    /*
     * Store Billable
     */
    public function store($request)
    {
        $billable = new Billable;
        $billable->course_id = $request->courseId;
        $billable->name = $request->name;
        $billable->description = $request->description;
        $billable->price = $request->price;
        $billable->year = $request->year;
        $billable->semester = $request->semester;
        $saved = $billable->save();

        $message = $billable->name . " created successfully";

        return [$saved, $message, $billable];
    }

    /*
     * Update Billable
     */
    public function update($request, $id)
    {
        $billable = Billable::find($id);

        if ($request->filled("name")) {
            $billable->name = $request->name;
        }

        if ($request->filled("description")) {
            $billable->description = $request->description;
        }

        if ($request->filled("price")) {
            $billable->price = $request->price;
        }

        if ($request->filled("year")) {
            $billable->year = $request->year;
        }

        if ($request->filled("semester")) {
            $billable->semester = $request->semester;
        }

        $saved = $billable->save();

        $message = $billable->name . " updated successfully";

        return [$saved, $message, $billable];
    }

    /*
     * Delete Billable
     */
    public function destroy($id)
    {
        $billable = Billable::findOrFail($id);

        $deleted = $billable->delete();

        $message = $billable->name . " deleted successfully";

        return [$deleted, $message, $billable];
    }

    /*
     * Handle Search
     */
    public function search($query, $request)
    {
        if ($request->filled("name")) {
            $query = $query
                ->where("name", "LIKE", "%" . $request->name . "%");
        }

        $courseId = $request->input("courseId");

        if ($request->filled("courseId")) {
            $query = $query->where("course_id", $courseId);
        }

        return $query;
    }
}
