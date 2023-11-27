<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CourseResource extends JsonResource
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
			"description" => $this->description,
			"duration" => $this->duration,
			"price" => $this->price,
			"departmentId" => $this->department_id,
			"departmentName" => $this->department?->name,
			"facultyName" => $this->department?->faculty->name,
			"units" => $this->units
		];
    }
}
