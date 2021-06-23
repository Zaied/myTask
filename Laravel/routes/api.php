<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\RegisterController;
use App\Http\Controllers\API\LoginController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WorkspaceController;
use App\Http\Controllers\PublicApiController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::middleware('auth:api')->group( function () {
    Route::post('/project/create',[ProjectController::class,'store']);
    Route::get('/get/projects',[ProjectController::class,'index']);
    Route::get('/get/users',[UserController::class,'getUsers']);
    Route::post('/assign/user/{uid}/{pid}',[UserController::class,'assignUserToProject']);
    Route::get('/workspaces',[WorkspaceController::class,'index']);
});

Route::prefix('/user')->group(function(){
    Route::post('/register', [RegisterController::class, 'register']);
    Route::post('/login', [LoginController::class, 'login']);
});

Route::get("/public/users",[PublicApiController::class,'getUsersFromPublicApi']);
