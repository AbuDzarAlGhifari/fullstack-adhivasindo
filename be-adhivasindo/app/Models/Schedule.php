<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $table = 'schedules';

    protected $fillable = [
        'modul_id',
        'user_id',
        'title',
        'start_time',
        'end_time',
        'location',
    ];

    public function modul()
    {
        return $this->belongsTo(Modul::class, 'modul_id');
    }

    public function instructor()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
