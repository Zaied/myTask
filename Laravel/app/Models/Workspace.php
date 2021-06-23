<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Workspace extends Model
{
    use HasFactory;

    protected $fillable = [
      'workspace_title'
    ];


    public function projects(){
        $this->hasMany('App\Models\Project');
    }
}
