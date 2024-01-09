import React, { useEffect, useState } from "react"
import {
	useHistory,
	useParams,
} from "react-router-dom/cjs/react-router-dom.min"

import Btn2 from "@/components/Core/Btn2"
import MyLink2 from "@/components/Core/MyLink2"

const create = (props) => {
	var { id } = useParams()
	var history = useHistory()

	const [name, setName] = useState()
	const [code, setCode] = useState()
	const [description, setDescription] = useState()
	const [credits, setCredits] = useState()
	const [loading, setLoading] = useState()

	// Get Instructors
	useEffect(() => {
		// Set page
		props.setPage({ name: "Add Unit", path: ["units", "create"] })
	}, [])

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.post("/api/units", {
			name: name,
			code: code,
			description: description,
			courseId: id,
			credits: credits,
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])
				// Redirect to Units
				setTimeout(() => history.push(`/admin/courses/${id}/show`), 500)
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
						placeholder="Name"
						className="form-control mb-2 me-2"
						onChange={(e) => setName(e.target.value)}
						required={true}
					/>

					<input
						type="text"
						name="code"
						placeholder="Code"
						className="form-control mb-2 me-2"
						onChange={(e) => setCode(e.target.value)}
						required={true}
					/>

					<textarea
						type="text"
						name="description"
						placeholder="Description"
						className="form-control mb-2 me-2"
						onChange={(e) => setDescription(e.target.value)}
						required={true}></textarea>

					<input
						type="number"
						name="credtis"
						placeholder="Credits"
						className="form-control mb-2 me-2"
						onChange={(e) => setCredits(e.target.value)}
						required={true}
					/>

					<div className="d-flex justify-content-end mb-2">
						<Btn2
							btnText="add unit"
							loading={loading}
						/>
					</div>

					<div className="d-flex justify-content-center">
						<MyLink2
							linkTo={`/admin/courses/${id}/show`}
							text="back to course"
						/>
					</div>
					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default create
