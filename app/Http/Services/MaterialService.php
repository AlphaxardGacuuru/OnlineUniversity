<?php

namespace App\Http\Services;

use App\Http\Resources\MaterialResource;
use App\Models\Material;
use Illuminate\Support\Facades\Storage;

class MaterialService extends Service
{
    /*
     * Get One Material
     */
    public function show($id)
    {
        $material = Material::findOrFail($id);

        return new MaterialResource($material);
    }

    /*
     * Store Material
     */
    public function store($request)
    {
        $material = new Material;
        $material->title = $request->input("title");
        $material->description = $request->input("description");
        $material->media = $request->input("media");
        $material->unit_id = $request->input("unitId");

        $saved = $material->save();

        $message = $material->title . " saved successfully";

        return [$saved, $message, $material];
    }

    /*
     * Update Material
     */
    public function update($request, $id)
    {
        $material = Material::findOrFail($id);

        if ($request->input("title")) {
            $material->title = $request->input("title");
        }

        if ($request->input("description")) {
            $material->description = $request->input("description");
        }

        if ($request->input("media")) {

            // Get old media and delete it
            $oldMedia = substr($material->media, 9);

            Storage::disk("public")->delete($oldMedia);

            $material->media = $request->input("media");
        }

        if ($request->input("unitId")) {
            $material->unit_id = $request->input("unitId");
        }

        $saved = $material->save();

        $message = $material->title . " saved successfully";

        return [$saved, $message, $material];
    }

    /*
     * Destroy Material
     */
    public function destroy($id)
    {
        $material = Material::findOrFail($id);

        // Delete Media
        $media = substr($material->media, 8);

        Storage::disk("public")->delete($media);

        $deleted = $material->delete();

        $message = $material->title . " deleted successfully";

        return [$deleted, $message, $material];
    }

    /*
     * Get Materials By Unit
     */
    public function byUnitId($id)
    {
        $materials = Material::where('unit_id', $id)
            ->orderBy("week")
            ->get()
            ->groupBy('week')
            ->map(function ($materials, $week) {
                return ["week" => "Week " . $week, "materials" => $materials];
            })
            ->values()
            ->all();

        return response([
			"data" => $materials
		], 200);
    }
}
