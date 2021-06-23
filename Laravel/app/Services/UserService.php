<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;

/**
 * Class UserService
 * @package App\Services
 */
class UserService
{

    public function userFindById($id){
        $user = User::findOrFail($id);
        if (!$user){
            throw new ModelNotFoundException('User not Found for '.$id);
        }
        return $user;
    }
}
