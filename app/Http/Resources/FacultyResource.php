<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FacultyResource extends JsonResource
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
            "departmentCount" => $this->departments()->count(),
            "course" => $this->courses(), // For use in Footer
            "courseCount" => $this->courses()->count(),
            "unitCount" => $this->units()->count(),
            "materialCount" => $this->materials()->count(),
            "createdAt" => $this->created_at,
        ];
    }
}
