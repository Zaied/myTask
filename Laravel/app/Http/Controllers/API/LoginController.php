<?php

namespace App\Http\Controllers\API;


use App\Http\Controllers\BaseController as BaseController;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\User;



class LoginController extends BaseController
{


    public function login(Request $request){

        $login = $request->validate([
            'email' => 'required|string',
            'password'=>'required'
        ]);

        if(Auth::attempt($login)){
            $user = Auth::user();
            $success['token'] =  $user->createToken('MyApp')-> accessToken;

            return $this->sendResponse([$success,$user], 'User login successfully.');
        }
        else{
            return $this->sendError('Unauthorised.', ['error'=>'Invalid login credentials! Please try again!']);
        }

    }
}
