<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DiscussionForumResource extends JsonResource
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
			"sessionId" => $this->academic_session_id,
			"unitId" => $this->unit_id,
			"week" => $this->week,
			"userId" => $this->user_id,
			"avatar" => $this->user->avatar,
			"text" => $this->text,
			"attachment" => $this->attachment,
			"updatedAt" => $this->updated_at,
			"createdAt" => $this->created_at,
		];
    }
}
