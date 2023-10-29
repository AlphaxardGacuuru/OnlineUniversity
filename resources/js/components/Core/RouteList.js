import React from "react"
import { Route } from "react-router-dom"

import Index from "@/pages/index"

const RouteList = () => {
	const routes = [
		{
			path: "/",
			component: <Index />,
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
