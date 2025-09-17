<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DetailUser;
use Illuminate\Http\Request;

class DetailUserController extends Controller
{
    public function index()
    {
        return response()->json(DetailUser::with('user')->get());
    }

    public function show($id)
    {
        $detail = DetailUser::with('user')->findOrFail($id);
        return response()->json($detail);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id' => 'required|exists:users,id',
            'image'   => 'nullable|url',
            'bio'     => 'nullable|string',
        ]);

        $detail = DetailUser::create($data);
        return response()->json($detail, 201);
    }

    public function update(Request $request, $id)
    {
        $detail = DetailUser::findOrFail($id);

        $data = $request->validate([
            'image' => 'nullable|url',
            'bio'   => 'nullable|string',
        ]);

        $detail->update($data);
        return response()->json($detail);
    }

    public function destroy($id)
    {
        DetailUser::destroy($id);
        return response()->json(null, 204);
    }
}
