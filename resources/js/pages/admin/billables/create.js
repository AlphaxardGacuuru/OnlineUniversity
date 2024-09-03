import React, { useEffect, useState } from "react"
import {
	useHistory,
	useParams,
} from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

const create = (props) => {
	const { id } = useParams()
	var history = useHistory()

	const [name, setName] = useState()
	const [description, setDescription] = useState()
	const [price, setPrice] = useState()
	const [year, setYear] = useState()
	const [semester, setSemester] = useState()
	const [loading, setLoading] = useState()

	useEffect(() => {
		// Set page
		props.setPage({
			name: "Add Billable",
			path: ["courses", `courses/${id}/show`, "billables", "create"],
		})
	}, [])

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()
		setLoading(true)

		Axios.post("/api/billables", {
			courseId: id,
			name: name,
			description: description,
			price: price,
			year: year,
			semester: semester,
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])
				// Redirect to Faculties
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
					{/* Name Start */}
					<input
						type="text"
						name="name"
						placeholder="Name"
						className="form-control mb-2 me-2"
						onChange={(e) => setName(e.target.value)}
						required={true}
					/>
					{/* Name End */}

					{/* Description Start */}
					<textarea
						type="text"
						name="name"
						placeholder="Description"
						className="form-control mb-2 me-2"
						rows="5"
						onChange={(e) => setDescription(e.target.value)}
						required={true}></textarea>
					{/* Description End */}

					{/* Price Start */}
					<input
						type="number"
						name="name"
						placeholder="Price"
						className="form-control mb-2 me-2"
						onChange={(e) => setPrice(e.target.value)}
						required={true}
					/>
					{/* Price End */}

					{/* Year Start */}
					<input
						type="number"
						name="name"
						placeholder="Year"
						className="form-control mb-2 me-2"
						onChange={(e) => setYear(e.target.value)}
						required={true}
					/>
					{/* Year End */}

					{/* Semester Start */}
					<input
						type="number"
						name="name"
						placeholder="Semester"
						className="form-control mb-2 me-2"
						onChange={(e) => setSemester(e.target.value)}
						required={true}
					/>
					{/* Semester End */}

					<div className="d-flex justify-content-end mb-2">
						<Btn
							text="add billable"
							loading={loading}
						/>
					</div>

					<div className="d-flex justify-content-center">
						<MyLink
							linkTo={`/courses/${id}/show`}
							text="back to courses"
						/>
					</div>
					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default create
