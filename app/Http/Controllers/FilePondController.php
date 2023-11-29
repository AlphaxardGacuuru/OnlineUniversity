<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FilePondController extends Controller
{
    /*
     * Handle Profile Pic Upload */
    public function updateAvatar(Request $request, $id)
    {
        $this->validate($request, [
            'filepond-avatar' => 'required|image',
        ]);

        $avatar = $request->file('filepond-avatar')->store('public/avatars');
        $avatar = substr($avatar, 7);

        $user = User::findOrFail($id);

        // Delete profile pic if it's not the default one
        if ($user->avatar != '/storage/avatars/male_avatar.png') {
            Storage::delete('public/' . $user->avatar);
        }

        $user->avatar = $avatar;
        $user->save();

        return response("Account updated", 200);
    }
}
