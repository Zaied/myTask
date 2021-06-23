<?php

namespace App\Http\Controllers\API;


use App\Http\Controllers\BaseController as BaseController;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use function PHPUnit\Framework\isEmpty;

class RegisterController extends BaseController
{


    public function register(Request $request){

        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'email' => 'required|email',
            'password' => 'required',
            'c_password' => 'required|same:password',
        ]);

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }


//        $duplicate_record = User::where('email',$request->email)->get();
//
//        if($duplicate_record){
//            return $this->sendError('Duplicate User Found.', $validator->errors());
//        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);

        try {
            $user = User::create($input);
            $success['token'] =  $user->createToken('MyApp')->accessToken;
            $success['name'] =  $user->name;

            return $this->sendResponse($success, 'User register successfully.');
        }catch (\Exception $exception){
            return $this->sendError('Duplicate Record');
        }




    }


}
