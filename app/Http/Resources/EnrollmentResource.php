<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EnrollmentResource extends JsonResource
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
			"userId" => $this->userId,
			"userAvatar" => $this->user->avatar,
			"userName" => $this->user->name,
			"userEmail" => $this->user->email,
			"userGender" => $this->user->gender,
			"courseName" => $this->course->name,
			"approvedBy" => $this->approved_by,
			"deniedBy" => $this->denied_by,
			"updatedAt" => $this->updated_at,
			"createdAt" => $this->created_at,
		];
    }
}
