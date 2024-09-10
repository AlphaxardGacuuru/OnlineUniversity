<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CreditNoteResource extends JsonResource
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
			"userName" => $this->user->name,
			"userAvatar" => $this->user->avatar,
			"userEmail" => $this->user->email,
			"description" => $this->description,
			"amount" => number_format($this->amount),
		];
    }
}
