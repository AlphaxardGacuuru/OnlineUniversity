<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Services\Admin\AdminService;

class AdminController extends Controller
{
    public function __construct(protected AdminService $service)
    {
        //
    }

    /*
     * Get Dashboard Data
     */
    public function index()
    {
        return $this->service->index();
    }
}
