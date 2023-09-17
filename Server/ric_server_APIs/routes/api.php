<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Publications;
use App\Http\Controllers\Projects;
use App\Http\Controllers\Conferences;
use App\Http\Controllers\Profile;
use App\Http\Controllers\Supervisiors;
use App\Http\Controllers\Training;
use App\Http\Controllers\Editorials;
use App\Http\Controllers\IP;
use App\Http\Controllers\Discipline;
use App\Http\Controllers\SchoolFaculty;
use App\Http\Controllers\Scopus;
use App\Http\Controllers\EmailSender;


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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Get publications by ID
Route::get('/Publications/{ID}',function ($ID){
    return Publications::getPublications($ID);
});
// Get publications by School Name
Route::get('/Publications/school/{name}',function ($SchoolName){
    return Publications::getPublicationsbyschool($SchoolName);
});

// Get projects by ID
Route::get('/Projects/{ID}',function ($ID){
    return Projects::getProjects($ID);
});

// Get projects by School Name
Route::get('/Projects/school/{name}',function ($SchoolName){
    return Projects::getProjectsbyschool($SchoolName);
});


// Get conferences by ID
Route::get('/Conferences/{ID}',function ($ID){
    return Conferences::getConferences($ID);
});
// Get conferences by School Name
Route::get('/Conferences/school/{name}',function ($SchoolName){
    return Conferences::getConferencesbySchool($SchoolName);
});

// Get profile
Route::post('/Profile',[Profile::class,'getProfile']);

// Get profile by ID
Route::get('/Profile/{ID}',function ($ID){
    return Profile::getProfileFromID($ID);
});

// Get supervisors
Route::get('/Supervisiors',[Supervisiors::class,'getRTTM']);

// Get trainings by ID
Route::get('/trainings/{ID}',function ($ID){
    return Training::getTrainings($ID);
});

// Get supervisors by ID
Route::get('/supervision/{ID}',function ($ID){
    return Supervisiors::getSuperVisors($ID);
});

// Get editorials by name
Route::get('/Editorials/{Name}',function ($Name){
    return Editorials::getEditorials($Name);
});

// Get IP by ID
Route::get('/IP/{ID}',function ($ID){
    return IP::getIP($ID);
});

// Get IP by School Name
Route::get('/IP/school/{name}',function ($SchoolName){
    return IP::getIPbyschool($SchoolName);
});

// Get discipline
Route::post('/Discipline',[Discipline::class,'getDiscipline']);

// Get publications by title
Route::post('/Publications',[Publications::class,'getPublicationsByTitle']);

// Get projects by title
Route::post('/Projects',[Projects::class,'getProjectByTitle']);

// Get IP by title
Route::post('/IP',[IP::class,'getIPByTitle']);

// Get author
Route::post('/Author',[Scopus::class, 'getAuthor']);

// Get school faculty
Route::post('/schoolFaculty',[SchoolFaculty::class, 'getSchoolFaculty']);

//Sending Email

Route::post("/sendEmail",[EmailSender::class, 'sendEmail']);
