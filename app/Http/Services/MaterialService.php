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
        $material->name = $request->input("name");
        $material->description = $request->input("description");
        $material->type = $request->input("type");
        $material->media = $request->input("media");
        $material->unit_id = $request->input("unitId");

        $saved = $material->save();

        $message = $material->name . " saved successfully";

        return [$saved, $message, $material];
    }

    /*
     * Update Material
     */
    public function update($request, $id)
    {
        $material = Material::findOrFail($id);

        if ($request->input("name")) {
            $material->name = $request->input("name");
        }

        if ($request->input("description")) {
            $material->description = $request->input("description");
        }

        if ($request->input("type")) {
            $material->type = $request->input("type");
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

        $message = $material->name . " saved successfully";

        return [$saved, $message, $material];
    }

    /*
     * Destroy Material
     */
    public function destroy($id)
    {
        $material = Material::findOrFail($id);

        $deleted = $material->delete();

        $message = $material->name . " saved successfully";

        return [$deleted, $message, $material];
    }
}
