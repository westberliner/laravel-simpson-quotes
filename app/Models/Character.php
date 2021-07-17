<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Character extends Model
{
    use HasFactory;

    protected $fillable = [
        'firstname',
        'lastname',
        'address',
    ];

    public function fullname()
    {
        return sprintf('%s %s', $this->firstname, $this->lastname);
    }

    public function quotes()
    {
        return $this->hasMany(Quote::class);
    }
}
