<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Modul extends Model
{
    use HasFactory;

    protected $table = 'moduls';

    protected $fillable = [
        'title',
        'description',
        'cover_image',
        'user_id',
        'start_date',
        'end_date',
    ];

    public function instructor()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function classes()
    {
        return $this->hasMany(Classes::class, 'modul_id');
    }

    public function schedules()
    {
        return $this->hasMany(Schedule::class, 'modul_id');
    }

    public function reports()
    {
        return $this->hasMany(Report::class, 'modul_id');
    }
}
