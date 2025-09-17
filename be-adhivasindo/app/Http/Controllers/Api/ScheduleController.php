<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    public function index()
    {
        return response()->json(Schedule::with(['modul', 'instructor'])->get());
    }

    public function show($id)
    {
        $schedule = Schedule::with(['modul', 'instructor'])->findOrFail($id);
        return response()->json($schedule);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'modul_id'   => 'required|exists:moduls,id',
            'user_id'    => 'nullable|exists:users,id',
            'title'      => 'nullable|string',
            'start_time' => 'required|date',
            'end_time'   => 'required|date|after_or_equal:start_time',
            'location'   => 'nullable|string',
        ]);

        $schedule = Schedule::create($data);
        return response()->json($schedule, 201);
    }

    public function update(Request $request, $id)
    {
        $schedule = Schedule::findOrFail($id);

        $data = $request->validate([
            'title'      => 'nullable|string',
            'start_time' => 'nullable|date',
            'end_time'   => 'nullable|date|after_or_equal:start_time',
            'location'   => 'nullable|string',
        ]);

        $schedule->update($data);
        return response()->json($schedule);
    }

    public function destroy($id)
    {
        Schedule::destroy($id);
        return response()->json(null, 204);
    }
}
