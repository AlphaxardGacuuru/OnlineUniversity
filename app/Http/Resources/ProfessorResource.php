<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProfessorResource extends JsonResource
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
            "email" => $this->email,
            "phone" => $this->phone,
            "gender" => $this->gender,
            "avatar" => $this->avatar,
            "facultyId" => $this->faculty()?->id,
            "facultyName" => $this->faculty()?->name,
            "departmentId" => $this->department()?->id,
            "departmentName" => $this->department()?->name,
            "createdAt" => $this->created_at,
        ];
    }
}