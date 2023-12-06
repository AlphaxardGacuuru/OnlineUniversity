import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

const create = (props) => {
	var history = useHistory()

	const [name, setName] = useState()
	const [email, setEmail] = useState()
	const [phone, setPhone] = useState()
	const [gender, setGender] = useState()
	const [loading, setLoading] = useState()

	// Get Faculties and Departments
	useEffect(() => {
		// Set page
		props.setPage({ name: "Create Staff", path: ["staff", "create"] })
	}, [])

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.post("/api/staff", {
			name: name,
			email: email,
			phone: phone,
			gender: gender,
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])
				// Redirect to Staff
				setTimeout(() => history.push("/admin/staff"), 500)
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
						name="email"
						placeholder="Email"
						className="form-control mb-2 me-2"
						onChange={(e) => setEmail(e.target.value)}
						required={true}
					/>
					<input
						type="tel"
						name="phone"
						placeholder="Phone"
						className="form-control mb-2 me-2"
						onChange={(e) => setPhone(e.target.value)}
						required={true}
					/>

					<select
						name="gender"
						className="form-control mb-3 me-2"
						onChange={(e) => setGender(e.target.value)}
						required={true}>
						<option value="">Select Gender</option>
						<option value="male">Male</option>
						<option value="female">Female</option>
					</select>

					<div className="d-flex justify-content-end">
						<Btn
							btnText="add staff"
							loading={loading}
						/>
					</div>

					<div className="d-flex justify-content-center">
						<MyLink
							linkTo="/admin/staff"
							text="back to staff"
						/>
					</div>
					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default create
