<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classes extends Model
{
    use HasFactory;

    protected $table = 'classes';

    protected $fillable = [
        'modul_id',
        'name',
        'cover_image',
        'description',
        'resource_url',
    ];

    public function modul()
    {
        return $this->belongsTo(Modul::class, 'modul_id');
    }

    public function reports()
    {
        return $this->hasMany(Report::class, 'class_id');
    }
}
