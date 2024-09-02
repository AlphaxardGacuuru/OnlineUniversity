<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DepartmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
			"id" => $this->id,
			"name" => $this->name,
			"facultyId" => $this->faculty_id,
			"courseCount" => $this->courses()->count(),
			"unitCount" => $this->units()->count(),
			"materialCount" => $this->materials()->count(),
			"createdAt" => $this->created_at,
		];
    }
}
