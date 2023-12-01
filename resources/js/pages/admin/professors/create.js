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
	const [education, setEducation] = useState()
	const [facultyId, setFacultyId] = useState()
	const [departmentId, setDepartmentId] = useState()
	const [courseId, setCourseId] = useState()
	const [unitId, setUnitId] = useState()
	const [faculties, setFaculties] = useState([])
	const [departments, setDepartments] = useState([])
	const [courses, setCourses] = useState([])
	const [units, setUnits] = useState([])
	const [loading, setLoading] = useState()

	var educationList = ["phd", " masters", "degree", "certificate"]

	// Get Faculties and Departments
	useEffect(() => {
		// Set page
		props.setPage({ name: "Create Professor", path: ["professors", "create"] })
		props.get("faculties", setFaculties)
		props.get("departments", setDepartments)
		props.get("courses?idAndName=true", setCourses)
		props.get("units?idAndName=true", setUnits)
	}, [])

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.post("/api/professors", {
			name: name,
			email: email,
			phone: phone,
			gender: gender,
			education: education,
			facultyId: facultyId,
			departmentId: departmentId,
			courseId: courseId,
			unitId: unitId,
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])
				// Redirect to Professors
				setTimeout(() => history.push("/admin/professors"), 500)
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

					<select
						name="education"
						className="form-control mb-3 me-2"
						onChange={(e) => setEducation(e.target.value)}
						required={true}>
						<option value="">Select Education</option>
						{educationList.map((education, key) => (
							<option
								key={key}
								value={education}
								className="text-capitalize">
								{education}
							</option>
						))}
					</select>

					<select
						name="facultyId"
						className="form-control mb-3 me-2"
						onChange={(e) => setFacultyId(e.target.value)}>
						<option value="">Select Faculty</option>
						{faculties.map((faculty, key) => (
							<option
								key={key}
								value={faculty.id}>
								{faculty.name}
							</option>
						))}
					</select>

					<select
						name="departmentId"
						className="form-control mb-3 me-2"
						onChange={(e) => setDepartmentId(e.target.value)}>
						<option value="">Select Department</option>
						{departments
							.filter((department) => department.facultyId == facultyId)
							.map((department, key) => (
								<option
									key={key}
									value={department.id}>
									{department.name}
								</option>
							))}
					</select>

					<select
						name="courseId"
						className="form-control mb-3 me-2"
						onChange={(e) => setCourseId(e.target.value)}>
						<option value="">Select Course</option>
						{courses
							.filter((course) => course.departmentId == departmentId)
							.map((course, key) => (
								<option
									key={key}
									value={course.id}>
									{course.name}
								</option>
							))}
					</select>

					<select
						name="unitId"
						className="form-control mb-3 me-2"
						onChange={(e) => setUnitId(e.target.value)}>
						<option value="">Select Unit</option>
						{units
							.filter((unit) => unit.courseId == courseId)
							.map((unit, key) => (
								<option
									key={key}
									value={unit.id}>
									{unit.code}
								</option>
							))}
					</select>

					<div className="d-flex justify-content-end">
						<Btn
							btnText="create"
							loading={loading}
						/>
					</div>

					<div className="d-flex justify-content-center">
						<MyLink
							linkTo="/admin/professors"
							text="back to professors"
						/>
					</div>
					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default create
