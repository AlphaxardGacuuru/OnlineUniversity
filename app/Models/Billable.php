<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Billable extends Model
{
    use HasFactory;

    /*
     * Relationships
     */

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
