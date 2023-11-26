import React from "react"
import { Route } from "react-router-dom"

import Login from "@/pages/auth/login"

import Index from "@/pages/index"
import Blog from "@/pages/blog"
import Contact from "@/pages/contact"
import Courses from "@/pages/courses"
import Elements from "@/pages/elements"

import AdminNav from "@/components/Layouts/AdminNav"

import AdminLogin from "@/pages/admin/login"
import AdminDashboard from "@/pages/admin/index"

import AdminProfessors from "@/pages/admin/professors/index"
import AdminProfessorCreate from "@/pages/admin/professors/create"
import AdminProfessorEdit from "@/pages/admin/professors/[id]"

import AdminStudents from "@/pages/admin/students/index"
import AdminStudentCreate from "@/pages/admin/students/create"
import AdminStudentEdit from "@/pages/admin/students/[id]"

const RouteList = ({ GLOBAL_STATE }) => {
	const authRoutes = [
		{
			path: "/login",
			component: <Login {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/login",
			component: <AdminLogin {...GLOBAL_STATE} />,
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
			path: "/admin/professors",
			component: <AdminProfessors {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/professors/create",
			component: <AdminProfessorCreate {...GLOBAL_STATE} />,
		},
		{
			path: "/admin/professors/:id/edit",
			component: <AdminProfessorEdit {...GLOBAL_STATE} />,
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
		</React.Fragment>
	)
}

export default RouteList
