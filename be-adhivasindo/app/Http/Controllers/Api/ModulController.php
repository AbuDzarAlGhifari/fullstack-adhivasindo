<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Modul;
use Illuminate\Http\Request;

class ModulController extends Controller
{
    public function index()
    {
        return response()->json(Modul::with(['instructor', 'classes', 'schedules', 'reports'])->get());
    }

    public function show($id)
    {
        $modul = Modul::with(['instructor', 'classes', 'schedules', 'reports'])->findOrFail($id);
        return response()->json($modul);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'        => 'required|string',
            'description'  => 'nullable|array',
            'cover_image'  => 'nullable|url',
            'user_id'      => 'nullable|exists:users,id',
            'start_date'   => 'nullable|date',
            'end_date'     => 'nullable|date|after_or_equal:start_date',
        ]);

        $modul = Modul::create($data);
        return response()->json($modul, 201);
    }

    public function update(Request $request, $id)
    {
        $modul = Modul::findOrFail($id);

        $data = $request->validate([
            'title'        => 'sometimes|required|string',
            'description'  => 'nullable|array',
            'cover_image'  => 'nullable|url',
            'user_id'      => 'nullable|exists:users,id',
            'start_date'   => 'nullable|date',
            'end_date'     => 'nullable|date|after_or_equal:start_date',
        ]);

        $modul->update($data);
        return response()->json($modul);
    }

    public function destroy($id)
    {
        Modul::destroy($id);
        return response()->json(null, 204);
    }
}
