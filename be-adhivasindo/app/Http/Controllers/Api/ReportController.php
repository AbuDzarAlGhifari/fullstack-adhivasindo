<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Report;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function index()
    {
        return response()->json(Report::with(['user', 'modul', 'class'])->get());
    }

    public function show($id)
    {
        $report = Report::with(['user', 'modul', 'class'])->findOrFail($id);
        return response()->json($report);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'user_id'  => 'required|exists:users,id',
            'modul_id' => 'required|exists:moduls,id',
            'class_id' => 'required|exists:classes,id',
            'score'    => 'nullable|integer|min:0',
        ]);

        $report = Report::create($data);
        return response()->json($report, 201);
    }

    public function update(Request $request, $id)
    {
        $report = Report::findOrFail($id);

        $data = $request->validate([
            'score' => 'nullable|integer|min:0',
        ]);

        $report->update($data);
        return response()->json($report);
    }

    public function destroy($id)
    {
        Report::destroy($id);
        return response()->json(null, 204);
    }
}
