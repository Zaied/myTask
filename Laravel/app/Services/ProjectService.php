<?php

namespace App\Services;


use App\Models\Project;
use Illuminate\Database\Eloquent\ModelNotFoundException;

/**
 * Class ProjectService
 * @package App\Services
 */
class ProjectService
{

    public function projectFindById($id){
        $project = Project::findOrFail($id);
        if (!$project){
            throw new ModelNotFoundException('Project not Found for '.$id);
        }
        return $project;
    }
}
