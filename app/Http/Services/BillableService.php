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
            ->orderBy("id", "DESC")
            ->paginate(20);

        return BillableResource::collection($billables);
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
