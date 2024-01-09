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

            // Get old avatar and delete it
            $oldAvatar = substr($user->avatar, 9);

            Storage::disk("public")->delete($oldAvatar);
        }

        $user->avatar = $avatar;
        $user->save();

        return response("Account updated", 200);
    }

    /*
     * Handle Material Upload */
    public function storeMaterial(Request $request)
    {
        $this->validate($request, [
            'filepond-material' => 'required|file',
        ]);

        // Store material
        $material = $request->file('filepond-material')->store('public/materials');

        $material = substr($material, 7);

        return $material;
    }

    /*
     * Handle Material Delete */
    public function destoryMaterial($id)
    {
        Storage::delete('public/materials/' . $id);

        return response("Material deleted", 200);
    }
}
