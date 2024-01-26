<?php

namespace App\Http\Services;

use App\Models\DiscussionForum;

class DiscussionForumService extends Service
{
	/*
	* Get Discussion Forum
	*/ 
    public function show($id)
    {
        $getDiscussionForum = DiscussionForum::where("user_id", $this->id)
            ->where("to", $id)
            ->orWhere("user_id", $id)
            ->where("to", $this->id)
            ->orderBy('id', 'ASC')
            ->paginate(10);

        return DiscussionForumResource::collection($getDiscussionForum);
    }

    /**
     * Store a newly created resource in storage.
     *
     */
    public function store($request)
    {
        /* Create new post */
        $chat = new DiscussionForum;
        $chat->user_id = $this->id;
        $chat->to = $request->input('to');
        $chat->text = $request->input('text');
        $chat->media = $request->input('media');
		
        $saved = $chat->save();

        return [$saved, "DiscussionForum sent", $chat];
    }

    /**
     * Remove the specified resource from storage.
     *
     */
    public function destroy($id)
    {
        $chatItem = DiscussionForum::find($id);

        $media = substr($chatItem->media, 9);

        Storage::delete('public/' . $media);

        $deleted = DiscussionForum::find($id)->delete();

        return [$deleted, "DiscussionForum deleted"];
    }
}