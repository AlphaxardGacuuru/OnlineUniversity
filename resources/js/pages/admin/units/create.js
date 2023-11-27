import React, { useEffect, useState } from "react"
import {
	useHistory,
	useParams,
} from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

const create = (props) => {
	var { id } = useParams()
	var history = useHistory()

	const [name, setName] = useState()
	const [description, setDescription] = useState()
	const [professorId, setProfessorId] = useState()
	const [credits, setCredits] = useState()
	const [professors, setProfessors] = useState([])
	const [loading, setLoading] = useState()

	// Get Professors
	useEffect(() => {
		// Set page
		props.setPage({ name: "Create Unit", path: ["units", "create"] })
		props.get("professors", setProfessors)
	}, [])

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.post("/api/units", {
			name: name,
			description: description,
			professorId: professorId,
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

					<textarea
						type="text"
						name="description"
						placeholder="Description"
						className="form-control mb-2 me-2"
						onChange={(e) => setDescription(e.target.value)}
						required={true}></textarea>

					<select
						name="professorId"
						className="form-control mb-3 me-2"
						onChange={(e) => setProfessorId(e.target.value)}
						required={true}>
						<option value="">Select Professor</option>
						{professors.map((professor, key) => (
							<option
								key={key}
								value={professor.id}>
								{professor.name}
							</option>
						))}
					</select>

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
							btnText="create"
							loading={loading}
						/>
					</div>

					<div className="d-flex justify-content-center">
						<MyLink
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
