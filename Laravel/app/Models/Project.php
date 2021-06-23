<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;


    protected $fillable = [
        'user_id',
        'workspace_id',
        'project_name',
        'project_description',
        'tasks'
    ];

    protected $casts = [
        'tasks' => 'array',

    ];

    public function users(){
        return $this->belongsToMany('App\Models\User','project_user');
    }

}
