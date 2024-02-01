import React from "react"
import { Route } from "react-router-dom"

import Index from "@/pages/index"
import Blog from "@/pages/blog"
import Contact from "@/pages/contact"
import Courses from "@/pages/courses"
import Elements from "@/pages/elements"

import AdminNav from "@/components/Layouts/AdminNav"
import InstructorNav from "@/components/Layouts/InstructorNav"
import StudentNav from "@/components/Layouts/StudentNav"

import AdminLogin from "@/pages/admin/login"
import AdminDashboard from "@/pages/admin/index"

import AdminInstructors from "@/pages/admin/instructors/index"
import AdminInstructorCreate from "@/pages/admin/instructors/create"
import AdminInstructorEdit from "@/pages/admin/instructors/edit/[id]"

import AdminStudents from "@/pages/admin/students/index"
import AdminStudentCreate from "@/pages/admin/students/create"
import AdminStudentEdit from "@/pages/admin/students/[id]"

import AdminStaff from "@/pages/admin/staff/index"
import AdminStaffCreate from "@/pages/admin/staff/create"
import AdminStaffEdit from "@/pages/admin/staff/[id]"

import AdminFaculties from "@/pages/admin/faculties/index"
import AdminFacultyCreate from "@/pages/admin/faculties/create"
import AdminFacultyShow from "@/pages/admin/faculties/[id]"
import AdminFacultyEdit from "@/pages/admin/faculties/edit/[id]"

import AdminDepartmentCreate from "@/pages/admin/departments/create"
import AdminDepartmentEdit from "@/pages/admin/departments/[id]"

import AdminCourses from "@/pages/admin/courses/index"
import AdminCourseCreate from "@/pages/admin/courses/create"
import AdminCourseShow from "@/pages/admin/courses/[id]"
import AdminCourseEdit from "@/pages/admin/courses/edit/[id]"

import AdminUnitCreate from "@/pages/admin/units/create"
import AdminUnitShow from "@/pages/admin/units/[id]"
import AdminUnitEdit from "@/pages/admin/units/edit/[id]"

import AdminMaterialCreate from "@/pages/admin/materials/create"
import AdminMaterialEdit from "@/pages/admin/materials/edit/[id]"

import AdminSessions from "@/pages/admin/sessions/index"
import AdminSessionCreate from "@/pages/admin/sessions/create"
import AdminSessionEdit from "@/pages/admin/sessions/edit/[id]"

import InstructorLogin from "@/pages/instructor/login"
import Instructor from "@/pages/instructor/index"

import InstructorCourseShow from "@/pages/instructor/courses/[id]"

import InstructorUnitShow from "@/pages/instructor/units/[id]"

import InstructorMaterialCreate from "@/pages/instructor/materials/create"
import InstructorMaterialEdit from "@/pages/instructor/materials/edit/[id]"

import InstructorResources from "@/pages/instructor/resources/index"

import StudentLogin from "@/pages/student/login"
import Student from "@/pages/student/index"

import StudentUnitShow from "@/pages/student/units/[id]"

import StudentCourses from "@/pages/student/courses/index"
import StudentCourseShow from "@/pages/student/courses/[id]"

const RouteList = ({ GLOBAL_STATE }) => {
	const authRoutes = [
		{
			path: "/student/login",
			component: <StudentLogin {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/login",
			component: <AdminLogin {...GLOBAL_STATE} />,
		},
		{
			path: "/instructor/login",
			component: <InstructorLogin {...GLOBAL_STATE} />,
		},
	]

	const routes = [
		{
			path: "/",
			component: <Index {...GLOBAL_STATE} />,
		},
		{
			path: "/blog",
			component: <Blog {...GLOBAL_STATE} />,
		},
		{
			path: "/contact",
			component: <Contact {...GLOBAL_STATE} />,
		},
		{
			path: "/courses",
			component: <Courses {...GLOBAL_STATE} />,
		},
		{
			path: "/elements",
			component: <Elements {...GLOBAL_STATE} />,
		},
	]

	// Admin Routes
	const adminRoutes = [
		{
			path: "/admin",
			component: <AdminDashboard {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/instructors",
			component: <AdminInstructors {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/instructors/create",
			component: <AdminInstructorCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/instructors/:id/edit",
			component: <AdminInstructorEdit {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/students",
			component: <AdminStudents {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/students/create",
			component: <AdminStudentCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/students/:id/edit",
			component: <AdminStudentEdit {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/staff",
			component: <AdminStaff {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/staff/create",
			component: <AdminStaffCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/staff/:id/edit",
			component: <AdminStaffEdit {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/faculties",
			component: <AdminFaculties {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/faculties/create",
			component: <AdminFacultyCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/faculties/:id/show",
			component: <AdminFacultyShow {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/faculties/:id/edit",
			component: <AdminFacultyEdit {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/departments/:id/create",
			component: <AdminDepartmentCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/departments/:id/edit",
			component: <AdminDepartmentEdit {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/courses",
			component: <AdminCourses {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/courses/create",
			component: <AdminCourseCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/courses/:id/show",
			component: <AdminCourseShow {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/courses/:id/edit",
			component: <AdminCourseEdit {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/units/:id/create",
			component: <AdminUnitCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/units/:id/show",
			component: <AdminUnitShow {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/units/:id/edit",
			component: <AdminUnitEdit {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/materials/:id/create",
			component: <AdminMaterialCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/materials/:id/edit",
			component: <AdminMaterialEdit {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/sessions",
			component: <AdminSessions {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/sessions/create",
			component: <AdminSessionCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/sessions/:id/edit",
			component: <AdminSessionEdit {...GLOBAL_STATE} />,
		},
	]

	const instructorRoutes = [
		{
			path: "/instructor",
			component: <Instructor {...GLOBAL_STATE} />,
		},
		{
			path: "/instructor/courses/:id/show",
			component: <InstructorCourseShow {...GLOBAL_STATE} />,
		},
		{
			path: "/instructor/units/:id/show",
			component: <InstructorUnitShow {...GLOBAL_STATE} />,
		},
		{
			path: "/instructor/materials/:id/create",
			component: <InstructorMaterialCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/instructor/materials/:id/edit",
			component: <InstructorMaterialEdit {...GLOBAL_STATE} />,
		},
		{
			path: "/instructor/resources",
			component: <InstructorResources {...GLOBAL_STATE} />,
		},
	]

	const studentRoutes = [
		{
			path: "/student",
			component: <Student {...GLOBAL_STATE} />,
		},
		{
			path: "/student/courses",
			component: <StudentCourses {...GLOBAL_STATE} />,
		},
		{
			path: "/student/courses/:id/show",
			component: <StudentCourseShow {...GLOBAL_STATE} />,
		},
		{
			path: "/student/units/:id/show",
			component: <StudentUnitShow {...GLOBAL_STATE} />,
		},
	]

	return (
		<React.Fragment>
			{/* Auth Routes */}
			{authRoutes.map((route, key) => (
				<Route
					key={key}
					path={route.path}
					exact
					render={() => route.component}
				/>
			))}
			{/* Auth Routes End */}

			{/* Landing Page routes */}
			{routes.map((route, key) => (
				<Route
					key={key}
					path={route.path}
					exact
					render={() => route.component}
				/>
			))}
			{/* Landing Page routes End */}

			{/* Admin Routes */}
			<AdminNav {...GLOBAL_STATE}>
				{adminRoutes.map((route, key) => (
					<Route
						key={key}
						path={route.path}
						exact
						render={() => route.component}
					/>
				))}
			</AdminNav>
			{/* Admin Routes End */}

			{/* Instructor Routes */}
			<InstructorNav {...GLOBAL_STATE}>
				{instructorRoutes.map((route, key) => (
					<Route
						key={key}
						path={route.path}
						exact
						render={() => route.component}
					/>
				))}
			</InstructorNav>
			{/* Instructor Routes End */}

			{/* Student Routes */}
			<StudentNav {...GLOBAL_STATE}>
				{studentRoutes.map((route, key) => (
					<Route
						key={key}
						path={route.path}
						exact
						render={() => route.component}
					/>
				))}
			</StudentNav>
			{/* Student Routes End */}
		</React.Fragment>
	)
}

export default RouteList
