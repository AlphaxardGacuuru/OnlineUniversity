import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

const edit = (props) => {
	var { id } = useParams()

	const [billable, setBillable] = useState({})
	const [name, setName] = useState()
	const [description, setDescription] = useState()
	const [price, setPrice] = useState()
	const [year, setYear] = useState()
	const [semester, setSemester] = useState()
	const [loading, setLoading] = useState()

	// Get Billables and Departments
	useEffect(() => {
		// Set page
		props.setPage({
			name: "Edit Billable",
			path: ["courses", "edit"],
		})

		Axios.get(`/api/billables/${id}`)
			.then((res) => {
				setBillable(res.data.data)
				// Set page
				props.setPage({
					name: "Edit Billable",
					path: ["courses", `courses/${id}/show`, "billables", "edit"],
				})
			})
			.catch((err) => "Failed to fetch Billable")
	}, [])

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.put(`/api/billables/${id}`, {
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
						defaultValue={billable.name}
						className="form-control mb-2 me-2"
						onChange={(e) => setName(e.target.value)}
					/>
					{/* Name End */}

					{/* Description Start */}
					<textarea
						type="text"
						name="name"
						placeholder="Description"
						defaultValue={billable.description}
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
						defaultValue={billable.price}
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
						defaultValue={billable.year}
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
						defaultValue={billable.semester}
						className="form-control mb-2 me-2"
						onChange={(e) => setSemester(e.target.value)}
						required={true}
					/>
					{/* Semester End */}

					<div className="d-flex justify-content-end mb-2">
						<Btn
							text="update"
							loading={loading}
						/>
					</div>

					<center>
						<MyLink
							linkTo={`/courses/${id}/show`}
							text="back to billables"
						/>
					</center>

					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default edit
