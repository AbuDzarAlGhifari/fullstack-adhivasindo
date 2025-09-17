<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailUser extends Model
{
    use HasFactory;

    protected $table = 'detail_users';

    protected $fillable = [
        'user_id',
        'image',
        'bio',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
