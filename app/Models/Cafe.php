<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cafe extends Model
{

    use HasFactory;

    // These names MUST match the "data" keys in your React useForm hook
    protected $fillable = [
        'name',
        'type',
        'price_range',
        'location',
        'feedback',
        'image',
        'amenities',
        'coffees',
        'foods',
    ];

    protected $casts = [
        'amenities' => 'array',
        'coffees' => 'array',
        'foods' => 'array',
    ];

}