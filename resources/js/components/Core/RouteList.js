import React from "react"
import { Route } from "react-router-dom"

import Login from "@/pages/auth/login"

import Index from "@/pages/index"
import Blog from "@/pages/blog"
import Contact from "@/pages/contact"
import Courses from "@/pages/courses"
import Elements from "@/pages/elements"

import AdminLogin from "@/pages/admin/login"
import AdminDashboard from "@/pages/admin/index"

const RouteList = ({ GLOBAL_STATE }) => {
	const routes = [
		{
			path: "/login",
			component: <Login {...GLOBAL_STATE} />,
		},
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
			path: "/admin/login",
			component: <AdminLogin {...GLOBAL_STATE} />,
		},
		{
			path: "/admin",
			component: <AdminDashboard {...GLOBAL_STATE} />,
		},
	] 

	return (
		<React.Fragment>
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
			{adminRoutes.map((route, key) => (
				<Route
					key={key}
					path={route.path}
					exact
					render={() => route.component}
				/>
			))}
			{/* Admin Routes End */}
		</React.Fragment>
	)
}

export default RouteList
