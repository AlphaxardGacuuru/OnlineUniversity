import React from "react"
import { Route } from "react-router-dom"

import Index from "@/pages/index"
import Blog from "@/pages/blog"
import Contact from "@/pages/contact"
import Courses from "@/pages/courses"
import Elements from "@/pages/elements"

const RouteList = () => {
	const routes = [
		{
			path: "/",
			component: <Index />,
		},
		{
			path: "/blog",
			component: <Blog />,
		},
		{
			path: "/contact",
			component: <Contact />,
		},
		{
			path: "/courses",
			component: <Courses />,
		},
		{
			path: "/elements",
			component: <Elements />,
		},
	]

	return (
		<React.Fragment>
			{routes.map((route, key) => (
				<Route
					key={key}
					path={route.path}
					exact
					render={() => route.component}
				/>
			))}
		</React.Fragment>
	)
}

export default RouteList
