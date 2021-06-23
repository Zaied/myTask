<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

use App\Http\Controllers\BaseController as BaseController;
class PublicApiController extends BaseController
{

    public function getUsersFromPublicApi(){

        $response= Http::get('https://api.github.com/users');
        $users = $response->Body();
        return $this->sendResponse($users,"Fetched Success");
    }
}
