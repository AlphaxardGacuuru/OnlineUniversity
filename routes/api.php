<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\FacultyController;
use App\Http\Controllers\FilePondController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\InstructorController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\UnitController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::get('auth', [UserController::class, 'auth']);

Route::apiResources([
    "courses" => CourseController::class,
    "departments" => DepartmentController::class,
    "faculties" => FacultyController::class,
    "instructors" => InstructorController::class,
    "staff" => StaffController::class,
    "students" => StudentController::class,
    "units" => UnitController::class,
    "users" => UserController::class,
    "materials" => MaterialController::class,
]);

/*
* Admin Dashboard
*/ 
Route::get("admin", [AdminController::class, "index"]);

/*
 * Filepond Controller
 */
Route::prefix('filepond')->group(function () {
    Route::controller(FilePondController::class)->group(function () {
        // User
        Route::post('avatar/{id}', 'updateAvatar');
    });
});
