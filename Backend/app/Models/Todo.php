<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    protected $fillable = ['name', 'description', 'completed', 'category_id']; // Add this line

    public function category(){
        return $this->belongsTo(Category::class);
    }
}
