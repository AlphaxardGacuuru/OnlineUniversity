<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class GradeBookDiscussionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $data = $this["data"]->first();

        return [
            "userId" => $this["userId"],
            "userName" => $data->user->name,
            "userAvatar" => $data->user->avatar,
            "academicSessionId" => $data->academic_session_id,
            "unitId" => $data->unit_id,
            "data" => $this["data"]->map(fn ($discussionForum) => [
				"id" => $discussionForum->id,
				"ratings" => $discussionForum->ratings,
				"week" => $discussionForum->week,
				"updatedAt" => $discussionForum->updatedAt,
				"createdAt" => $discussionForum->createdAt,
			]),
        ];
    }
}