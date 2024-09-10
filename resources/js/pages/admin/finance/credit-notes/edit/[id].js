import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

const edit = (props) => {
	var { id } = useParams()

	const [creditNote, setCreditNote] = useState({})
	const [description, setDescription] = useState()
	const [amount, setAmount] = useState()
	const [loading, setLoading] = useState()

	// Get Credit Notes and Departments
	useEffect(() => {
		// Set page
		props.setPage({
			name: "Edit Credit Note",
			path: ["credit-notes", "edit"],
		})

		props.get(`/credit-notes/${id}`, setCreditNote)
	}, [])

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.put(`/api/credit-notes/${id}`, {
			description: description,
			amount: amount,
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
					{/* Description Start */}
					<textarea
						type="text"
						name="name"
						placeholder="Description"
						defaultValue={creditNote.description}
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
						defaultValue={creditNote.amount?.replace(",", "")}
						className="form-control mb-2 me-2"
						onChange={(e) => setAmount(e.target.value)}
						required={true}
					/>
					{/* Amount End */}

					<div className="d-flex justify-content-end mb-2">
						<Btn
							text="update"
							loading={loading}
						/>
					</div>

					<center>
						<MyLink
							linkTo={`/finance/credit-notes`}
							text="back to credit notes"
						/>
					</center>

					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default edit
