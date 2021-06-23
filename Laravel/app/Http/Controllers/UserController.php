<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\User;
use App\Services\ProjectService;
use App\Services\UserService;
use Illuminate\Http\Request;
use App\Http\Controllers\BaseController as BaseController;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;

class UserController extends BaseController
{


    public function getUsers(){
        $users = User::where('id', '!=', auth()->id())->get();
        return $this->sendResponse($users, 'Fetched all user successfully except current user');
    }

    public function assignUserToProject($uid,$pid){

        try {

            $user = (new UserService())->userFindById($uid);
            $project = (new ProjectService())->projectFindById($pid);
            $project->users()->attach($user);

            return $this->sendResponse([$project,$user],'assigned successfully');

        }catch (ModelNotFoundException $exception){
            return $this->sendError('Invalid userId or ProjectId', $exception);
        }



    }


}
