<?php

namespace App\Http\Services;

use App\Models\DiscussionForum;
use App\Models\DiscussionForumRating;
use Illuminate\Support\Facades\DB;

class DiscussionForumRatingService extends Service
{
    /*
     * Store
     */
    public function store($request)
    {
        $getRating = DiscussionForumRating::where("discussion_forum_id", $request->discussionForumId)
            ->where("user_id", $this->id);

        $hasRated = $getRating->exists();

        // Check if user has rated
        if ($hasRated) {
            // Get Rating
            $rating = $getRating->first();

            DB::transaction(function () use ($getRating) {
                // Update Club Votes
                $discussionForum = DiscussionForum::find($getRating->first()->discussion_forum_id);
                $discussionForum->ratings = $getRating->sum("rating");
                $discussionForum->save();

                // Delete Rating
                $getRating->delete();
            });

            $saved = false;
            $message = "Rating Removed";
        } else {
            $rating = new DiscussionForumRating;
            $rating->discussion_forum_id = $request->discussionForumId;
            $rating->user_id = $this->id;
            $rating->rating = $request->rating;

            DB::transaction(function () use ($rating, $getRating) {
                $rating->save();

                // Update Club Votes
                $discussionForum = DiscussionForum::find($rating->discussion_forum_id);
                $discussionForum->ratings = $getRating->sum("rating");
                $discussionForum->save();
            });

            $saved = true;
            $message = "Rating Saved";
        }

        return [$saved, $message, $rating];
    }
}
