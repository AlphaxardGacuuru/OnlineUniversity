<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UnitResource extends JsonResource
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
            "courseId" => $this->course_id,
            "credits" => $this->credits,
            "professors" => $this->professors(),
            "professorId" => $this->professors()[0]?->id,
            "professorName" => $this->professors()[0]?->name,
        ];
    }
}
