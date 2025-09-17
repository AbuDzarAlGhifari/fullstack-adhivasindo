<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Classes;
use Illuminate\Http\Request;

class ClassesController extends Controller
{
    public function index()
    {
        return response()->json(Classes::with('modul')->get());
    }

    public function show($id)
    {
        $class = Classes::with('modul')->findOrFail($id);
        return response()->json($class);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'modul_id'     => 'required|exists:moduls,id',
            'name'         => 'required|string',
            'cover_image'  => 'nullable|url',
            'description'  => 'nullable|string',
            'resource_url' => 'nullable|url',
        ]);

        $class = Classes::create($data);
        return response()->json($class, 201);
    }

    public function update(Request $request, $id)
    {
        $class = Classes::findOrFail($id);

        $data = $request->validate([
            'name'         => 'sometimes|required|string',
            'cover_image'  => 'nullable|url',
            'description'  => 'nullable|string',
            'resource_url' => 'nullable|url',
        ]);

        $class->update($data);
        return response()->json($class);
    }

    public function destroy($id)
    {
        Classes::destroy($id);
        return response()->json(null, 204);
    }
}
