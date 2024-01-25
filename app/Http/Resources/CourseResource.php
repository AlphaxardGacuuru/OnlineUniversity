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
            "facultyId" => $this->department?->faculty->id,
            "facultyName" => $this->department?->faculty->name,
            "departmentId" => $this->department_id,
            "departmentName" => $this->department?->name,
            "units" => $this->units,
            // "units" => $this->units()
                // ->orderBy("year")
                // ->orderBy("semester")
                // ->get(),
            "instructors" => UserResource::collection($this->instructors()),
            "students" => UserResource::collection($this->students()),
        ];
    }
}
