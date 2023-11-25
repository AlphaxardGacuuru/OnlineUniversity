<?php

namespace App\Http\Services\Admin;

use App\Http\Resources\ProfessorResource;
use App\Http\Services\Service;
use App\Models\User;

class ProfessorService extends Service
{
    /*
     * Get All Professors
     */
    public function index()
    {
        $professors = User::where("account_type", "professor")
            ->orderBy("id", "DESC")
            ->paginate(20);

        return ProfessorResource::collection($professors);
    }

    /*
     * Soft Delete Service
     */
    public function destroy($id)
    {
        $professor = User::find($id);

        $deleted = $professor->delete();

        return [$deleted, $professor->name . " deleted", $professor];
    }

    /*
     * Force Delete Service
     */
    public function forceDestory($id)
    {
        $professor = User::find($id);

        // Get old thumbnail and delete it
        $oldThumbnail = substr($professor->thumbnail, 9);

        Storage::disk("public")->delete($oldThumbnail);

        $deleted = $professor->delete();

        return [$deleted, $professor->name . " deleted"];
    }
}
