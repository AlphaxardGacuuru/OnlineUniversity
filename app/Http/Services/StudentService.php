<?php

namespace App\Http\Services;

use App\Http\Resources\EnrollmentResource;
use App\Http\Resources\StudentResource;
use App\Http\Services\Service;
use App\Models\AcademicSession;
use App\Models\Billable;
use App\Models\CardTransaction;
use App\Models\CreditNote;
use App\Models\Invoice;
use App\Models\InvoiceBillable;
use App\Models\MPESATransaction;
use App\Models\User;
use App\Models\UserCourse;
use App\Models\UserDepartment;
use App\Models\UserFaculty;
use App\Models\UserUnit;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class StudentService extends Service
{
    /*
     * Get All Students
     */
    public function index($request)
    {
        $studentsQuery = User::where("account_type", "student");

        $studentsQuery = $this->search($studentsQuery, $request);

        $students = $studentsQuery
            ->orderBy("id", "DESC")
            ->paginate(20)
            ->appends(['courseId' => $request->input("courseId")]);

        return StudentResource::collection($students);
    }

    /*
     * Get One Student
     */
    public function show($id)
    {
        $student = User::findOrFail($id);

        return new StudentResource($student);
    }

    /*
     * Store
     */
    public function store($request)
    {
        $student = new User;
        $student->name = $request->input("name");
        $student->email = $request->input("email");
        $student->phone = $request->input("phone");
        $student->gender = $request->input("gender");
        $student->current_location = $request->input("currentLocation");
        $student->origin_location = $request->input("originLocation");
        $student->password = Hash::make($request->input("email"));
        $student->account_type = "student";

        $saved = DB::transaction(function () use ($student, $request) {
            $saved = $student->save();

            // Add UserFaculty
            $userFaculty = new UserFaculty;
            $userFaculty->user_id = $student->id;
            $userFaculty->faculty_id = $request->input("facultyId");
            $userFaculty->save();

            // Add UserDepartment
            $userDepartment = new UserDepartment;
            $userDepartment->user_id = $student->id;
            $userDepartment->department_id = $request->input("departmentId");
            $userDepartment->save();

            return $saved;
        });

        $message = $student->name . " created successfully";

        return [$saved, $message, $student];
    }

    /*
     * Update Student
     */
    public function update($request, $id)
    {
        $student = User::findOrFail($id);

        if ($request->filled("name")) {
            $student->name = $request->input("name");
        }

        if ($request->filled("email")) {
            $student->email = $request->input("email");
        }

        if ($request->filled("phone")) {
            $student->phone = $request->input("phone");
        }

        if ($request->filled("gender")) {
            $student->gender = $request->input("gender");
        }

        if ($request->filled("currentLocation")) {
            $student->current_location = $request->input("currentLocation");
        }

        if ($request->filled("originLocation")) {
            $student->origin_location = $request->input("originLocation");
        }

        if ($request->filled("password")) {
            $student->password = Hash::make($request->input("email"));
        }

        if ($request->filled("facultyId")) {
            // Delete UserFaculty
            UserFaculty::where("user_id", $id)->delete();

            // Add UserFaculty
            $userFaculty = new UserFaculty;
            $userFaculty->user_id = $student->id;
            $userFaculty->faculty_id = $request->input("facultyId");
            $userFaculty->save();
        }

        if ($request->filled("departmentId")) {
            // Delete UserDepartment
            UserDepartment::where("user_id", $id)->delete();

            // Add UserDepartment
            $userDepartment = new UserDepartment;
            $userDepartment->user_id = $student->id;
            $userDepartment->department_id = $request->input("departmentId");
            $userDepartment->save();
        }

        if ($request->filled("courseId")) {
            // Check if User Course Exists
            $userCourseDoesntExist = UserCourse::where("user_id", $id)
                ->where("course_id", $request->courseId)
                ->doesntExist();

            if ($userCourseDoesntExist) {
                DB::transaction(function () use ($request) {

                    $userCourse = new UserCourse;
                    $userCourse->user_id = $this->id;
                    $userCourse->course_id = $request->courseId;
                    $userCourse->save();
                });
            }
        }

        if ($request->filled("unitId")) {
            $userUnit = new UserUnit;
            $userUnit->user_id = $student->id;
            $userUnit->unit_id = $request->input("unitId");
            $userUnit->academic_session_id = $request->input("sessionId");
            $userUnit->save();
        }

        // Approve Course
        if ($request->filled("approved")) {
            DB::transaction(function () use ($request) {

                // Update approved_by
                $userCourse = UserCourse::find($request->userCourseId);
                $userCourse->approved_by = $this->id;
                $userCourse->save();

                // Fetch Academic Session
                $academicSession = AcademicSession::find($request->academicSessionId);

                $billables = Billable::where("course_id", $request->courseId)
                    ->where("year", $academicSession->year)
                    ->where("semester", $academicSession->semester)
                    ->get();

                $billablePrices = $billables->reduce(fn($acc, $billable) => $acc + $billable->price, 0);

                if ($request->action) {
                    if ($billablePrices > 0) {
                        $invoice = new Invoice;
                        $invoice->user_id = $userCourse->user_id;
                        $invoice->amount = $billablePrices;
                        $invoice->balance = $billablePrices;
                        $invoice->created_by = $this->id;
                        $invoice->save();

                        foreach ($billables as $billable) {
                            $billableDoesntExist = InvoiceBillable::where("invoice_id", $userCourse->user_id)
                                ->where("billable_id", $billable->id)
                                ->exists();

                            // Create InvoiceBillable if it doesnt exist
                            if ($billableDoesntExist) {
                                $invoiceBillable = new InvoiceBillable;
                                $invoiceBillable->invoice_id = $invoice->id;
                                $invoiceBillable->billable_id = $billable->id;
                                $invoiceBillable->save();
                            }
                        }
                    }
                }
            });

            $message = "Account approved";
        }

        if ($request->filled("denied")) {
            $userCourse = UserCourse::find($request->userCourseId);
            $userCourse->denied_by = $request->action ? $this->id : null;
            $userCourse->save();

            $message = "Account denied";
        }

        $saved = $student->save();

        $message = $student->name . " updated successfully";

        return [$saved, $message, $student];
    }

    /*
     * Soft Delete Service
     */
    public function destroy($id)
    {
        $student = User::findOrFail($id);

        $deleted = $student->delete();

        return [$deleted, $student->name . " deleted", $student];
    }

    /*
     * Force Delete Service
     */
    public function forceDestory($id)
    {
        $student = User::findOrFail($id);

        // Get old thumbnail and delete it
        $oldThumbnail = substr($student->thumbnail, 9);

        Storage::disk("public")->delete($oldThumbnail);

        $deleted = $student->delete();

        return [$deleted, $student->name . " deleted"];
    }

    /*
     * Fee Statements
     */
    public function feeStatements($id)
    {
        // Retrieve the user by ID with its associated courses
        $invoices = Invoice::where("user_id", $id)
            ->select("invoices.id", "amount as debit", "invoices.created_at")
            ->get();

        $cardPaymentQuery = CardTransaction::select("id", "amount as credit", "created_at")
            ->where("user_id", $id);

        $mpesaPaymentQuery = MPESATransaction::select("id", "amount as credit", "created_at")
            ->where("user_id", $id);

        $creditNoteQuery = CreditNote::select("id", "amount as credit", "created_at")
            ->where("user_id", $id);

        // Calculate total fees paid
        $feesPaid = $cardPaymentQuery->sum("amount") +
        	$mpesaPaymentQuery->sum("amount") +
        	$creditNoteQuery->sum("amount");

        $cardPayments = $cardPaymentQuery->get();

        $mpesaPayments = $mpesaPaymentQuery->get();

        $creditNotes = $creditNoteQuery->get();

        $balance = 0;

        $feeStatements = $invoices
            ->concat($cardPayments)
            ->concat($mpesaPayments)
            ->concat($creditNotes)
            ->sortBy(fn($item) => Carbon::parse($item->created_at))
            ->values()
            ->map(function ($item) use (&$balance) {

                // Calculate balance
                if ($item->credit) {
                    $balance -= $item->credit;
                } else {
                    $balance += $item->debit;
                }

                $item->balance = number_format($balance);
                $item->type = $item->credit ? "Fees Paid" : $item->name;
                $item->credit = number_format($item->credit);
                $item->debit = number_format($item->debit);

                return $item;
            })
            ->reverse()
            ->values();

        return [
            "data" => [
                "statement" => $feeStatements,
                "paid" => $feesPaid,
            ],
        ];
    }

    /*
     * Enrollments
     */
    public function enrollments($request)
    {
        $enrollmentQuery = UserCourse::whereHas("user", function ($query) {
            $query->where("account_type", "student");
        })->orderBy("id", "DESC");

        $name = $request->input("name");

        if ($request->filled("name")) {
            $enrollmentQuery = $enrollmentQuery
                ->whereHas("user", function ($query) use ($name) {
                    $query->where("name", "LIKE", "%" . $name . "%");
                });
        }

        if ($request->filled("status")) {
            switch ($request->filled("status")) {
                case "pending":
                    $enrollmentQuery = $enrollmentQuery
                        ->whereNull("approved_by")
                        ->whereNull("denied_by");
                    break;

                case "approved":
                    $enrollmentQuery = $enrollmentQuery->whereNotNull("approved_by");
                    break;

                default:
                    $enrollmentQuery = $enrollmentQuery->whereNotNull("denied_by");
                    break;
            }
        }

        $enrollments = $enrollmentQuery->paginate(20);

        return EnrollmentResource::collection($enrollments);
    }

    /*
     * Handle Search
     */
    public function search($query, $request)
    {
        if ($request->filled("name")) {
            $query = $query
                ->where("name", "LIKE", "%" . $request->input("name") . "%");
        }

        if ($request->filled("gender")) {
            $query = $query
                ->where("gender", $request->input("gender"));
        }

        $facultyId = $request->input("facultyId");

        if ($request->filled("facultyId")) {
            $query = $query
                ->whereHas("faculties", function ($query) use ($facultyId) {
                    $query->where("faculty_id", $facultyId);
                });
        }

        $departmentId = $request->input("departmentId");

        if ($request->filled("departmentId")) {
            $query = $query
                ->whereHas("departments", function ($query) use ($departmentId) {
                    $query->where("department_id", $departmentId);
                });
        }

        $courseId = $request->input("courseId");

        if ($request->filled("courseId")) {
            $query = $query
                ->whereHas("courses", function ($query) use ($courseId) {
                    $query->where("course_id", $courseId);
                });
        }

        $unitId = $request->input("unitId");

        if ($request->filled("unitId")) {
            $query = $query
                ->whereHas("units", function ($query) use ($unitId) {
                    $query->where("unit_id", $unitId);
                });
        }

        return $query;
    }
}
