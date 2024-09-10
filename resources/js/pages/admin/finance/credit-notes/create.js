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

	const [description, setDescription] = useState()
	const [amount, setAmount] = useState()
	const [loading, setLoading] = useState()

	useEffect(() => {
		// Set page
		props.setPage({
			name: "Create Credit Note",
			path: ["students", `students/${id}/show`, "credit-notes", "create"],
		})
	}, [])

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()
		setLoading(true)

		Axios.post("/api/credit-notes", {
			userId: id,
			description: description,
			amount: amount,
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])
				// Redirect to Faculties
				setTimeout(() => history.push(`/admin/finance/credit-notes`), 500)
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

					{/* Amount Start */}
					<input
						type="number"
						name="name"
						placeholder="Amount"
						className="form-control mb-2 me-2"
						onChange={(e) => setAmount(e.target.value)}
						required={true}
					/>
					{/* Amount End */}

					<div className="d-flex justify-content-end mb-2">
						<Btn
							text="create credit note"
							loading={loading}
						/>
					</div>

					<div className="d-flex justify-content-center">
						<MyLink
							linkTo={`/students/${id}/show`}
							text="back to student"
						/>
					</div>
					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default create
