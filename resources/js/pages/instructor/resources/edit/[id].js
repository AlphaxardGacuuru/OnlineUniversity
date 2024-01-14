import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import Btn2 from "@/components/Core/Btn2"
import MyLink2 from "@/components/Core/MyLink2"

const edit = (props) => {
	var { id } = useParams()

	const [resource, setResource] = useState({})

	const [name, setName] = useState()
	const [link, setLink] = useState()
	const [loading, setLoading] = useState()

	// Get Resources and Departments
	useEffect(() => {
		// Set page
		props.setPage({ name: "Edit Resource", path: ["resources", "edit"] })
		props.get(`resources/${id}`, setResource)
	}, [])

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.put(`/api/resources/${id}`, {
			name: name,
			link: link
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])
				// Reload
				window.location.reload()
			})
			.catch((err) => {
				setLoading(false)
				// Get Errors
				props.getErrors(err)
			})
	}

	return (
		<div className="row">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				<form onSubmit={onSubmit}>
					<input
						type="text"
						name="name"
						placeholder={resource.name}
						className="form-control mb-2 me-2"
						onChange={(e) => setName(e.target.value)}
					/>
					
					<input
						type="text"
						name="link"
						placeholder={resource.link}
						className="form-control mb-2 me-2"
						onChange={(e) => setLink(e.target.value)}
					/>
					
					<div className="d-flex justify-content-end mb-2">
						<Btn2
							btnText="update"
							loading={loading}
						/>
					</div>

					<center className="mb-5">
						<MyLink2
							linkTo="/instructor/resources"
							text="back to resources"
						/>
					</center>

					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default edit
