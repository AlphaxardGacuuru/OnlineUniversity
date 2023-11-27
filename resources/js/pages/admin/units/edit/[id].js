import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

const edit = (props) => {
	var { id } = useParams()

	const [unit, setUnit] = useState({})
	const [name, setName] = useState()
	const [description, setDescription] = useState()
	const [professorId, setProfessorId] = useState()
	const [credits, setCredits] = useState()
	const [professors, setProfessors] = useState([])
	const [loading, setLoading] = useState()

	// Get Units and Departments
	useEffect(() => {
		// Set page
		props.setPage({ name: "Edit Unit", path: ["units", "edit"] })
		props.get("professors", setProfessors)

		Axios.get(`/api/units/${id}`).then((res) => {
			setUnit(res.data.data)
			setProfessorId(res.data.data.professorId.toString())
		})
	}, [])

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.put(`/api/units/${id}`, {
			name: name,
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

					<textarea
						type="text"
						name="description"
						placeholder={unit.description}
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
								value={professor.id}
								selected={unit.professorId == professor.id}>
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
