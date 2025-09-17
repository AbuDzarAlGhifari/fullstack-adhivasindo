<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ClassesController;
use App\Http\Controllers\Api\DetailUserController;
use App\Http\Controllers\Api\ModulController;
use App\Http\Controllers\Api\ReportController;
use App\Http\Controllers\Api\ScheduleController;
use Illuminate\Support\Facades\Route;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('me', [AuthController::class, 'me']);

    Route::apiResource('detail-users', DetailUserController::class);
    Route::apiResource('moduls', ModulController::class);
    Route::apiResource('classes', ClassesController::class);
    Route::apiResource('schedules', ScheduleController::class);
    Route::apiResource('reports', ReportController::class);
});
