import React, { useEffect, useState } from "react"

import Btn from "@/components/Core/Btn"
import Img from "@/components/Core/Img"
import MyLink from "@/components/Core/MyLink"

import PersonSVG from "@/svgs/PersonSVG"
import ResourceSVG from "@/svgs/ResourceSVG"
import ResourceList from "@/components/Resources/ResourceList"

const index = (props) => {
	// Get Resources
	const [resources, setResources] = useState(props.getLocalStorage("resources"))

	const [nameQuery, setNameQuery] = useState("")
	const [loading, setLoading] = useState()

	useEffect(() => {
		// Set page
		props.setPage({ name: "Resources", path: ["resources"] })
	}, [])

	useEffect(() => {
		props.getPaginated(
			`resources?
			name=${nameQuery}`,
			setResources,
			"resources"
		)
	}, [nameQuery])

	return (
		<div className="row">
			<div className="col-sm-12">
				{/* Resources Tab */}
				<ResourceList
					{...props}
					activeTab={"resources"}
					resources={resources}
					setResources={setResources}
					setNameQuery={setNameQuery}
				/>
				{/* Resources Tab End */}
			</div>
		</div>
	)
}

export default index
