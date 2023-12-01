import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

const edit = (props) => {
	var { id } = useParams()

	const [unit, setUnit] = useState({})
	const [name, setName] = useState()
	const [code, setCode] = useState()
	const [description, setDescription] = useState()
	const [credits, setCredits] = useState()
	const [loading, setLoading] = useState()

	// Get Units and Departments
	useEffect(() => {
		// Set page
		props.setPage({ name: "Edit Unit", path: ["units", "edit"] })
		props.get(`units/${id}`, setUnit)
	}, [])

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.put(`/api/units/${id}`, {
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
						placeholder={unit.name}
						className="form-control mb-2 me-2"
						onChange={(e) => setName(e.target.value)}
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
						placeholder={unit.description}
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
						<Btn
							btnText="update"
							loading={loading}
						/>
					</div>

					<center>
						<MyLink
							linkTo={`/admin/courses/${unit.courseId}/show`}
							text="back to course"
						/>
					</center>

					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default edit
