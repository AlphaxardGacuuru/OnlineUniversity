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
        $discussionForum = new DiscussionForum;
        $discussionForum->academic_id = $request->input("academic_id");
        $discussionForum->unit_id = $request->input("unit_id");
        $discussionForum->user_id = $this->id;
        $discussionForum->text = $request->input('text');
		
        $saved = $discussionForum->save();

        return [$saved, "Chat sent", $discussionForum];
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