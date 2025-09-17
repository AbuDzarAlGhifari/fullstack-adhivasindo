<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    protected $table = 'reports';

    protected $fillable = [
        'user_id',
        'modul_id',
        'class_id',
        'score',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function modul()
    {
        return $this->belongsTo(Modul::class, 'modul_id');
    }

    public function class()
    {
        return $this->belongsTo(Classes::class, 'class_id');
    }
}
