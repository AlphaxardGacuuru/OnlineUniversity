import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

import Countries from "@/components/Core/Countries"

import CloseSVG from "@/svgs/CloseSVG"

const create = (props) => {
	var history = useHistory()

	const [name, setName] = useState()
	const [email, setEmail] = useState()
	const [phone, setPhone] = useState()
	const [gender, setGender] = useState()
	const [education, setEducation] = useState()
	const [originLocation, setOriginLocation] = useState()
	const [currentLocation, setCurrentLocation] = useState()
	const [facultyId, setFacultyId] = useState()
	const [departmentId, setDepartmentId] = useState()
	const [faculties, setFaculties] = useState([])
	const [departments, setDepartments] = useState([])
	const [courses, setCourses] = useState([])
	const [courseIds, setCourseIds] = useState([])
	const [units, setUnits] = useState([])
	const [unitIds, setUnitIds] = useState([])
	const [loading, setLoading] = useState()

	var educationList = ["phd", " masters", "degree", "certificate"]

	// Get Faculties and Departments
	useEffect(() => {
		// Set page
		props.setPage({
			name: "Add Instructor",
			path: ["instructors", "create"],
		})
		props.get("faculties", setFaculties)
		props.get("departments", setDepartments)
		props.get("courses?idAndName=true", setCourses)
		props.get("units?idAndName=true", setUnits)
	}, [])

	/*
	 * Handle Instructor selects
	 */
	const handleCourseIds = (id) => {
		if (id) {
			var exists = courseIds.includes(id)

			var newCourseIds = exists
				? courseIds.filter((item) => item != id)
				: [...courseIds, id]

			setCourseIds(newCourseIds)
		}
	}

	/*
	 * Handle Unit selects
	 */
	const handleUnitIds = (id) => {
		if (id) {
			var exists = unitIds.includes(id)

			var newUnitIds = exists
				? unitIds.filter((item) => item != id)
				: [...unitIds, id]

			setUnitIds(newUnitIds)
		}
	}

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.post("/api/instructors", {
			name: name,
			email: email,
			phone: phone,
			gender: gender,
			education: education,
			originLocation: originLocation,
			currentLocation: currentLocation,
			facultyId: facultyId,
			departmentId: departmentId,
			courseIds: courseIds,
			unitIds: unitIds,
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])
				// Redirect to Instructors
				setTimeout(() => history.push("/admin/instructors"), 500)
			})
			.catch((err) => {
				setLoading(false)
				// Get Errors
				props.getErrors(err)
			})
	}

	return (
		<div>
			<form onSubmit={onSubmit}>
				<div className="row">
					<div className="col-sm-2"></div>
					<div className="col-sm-4">
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
							type="text"
							name="nationality"
							className="form-control mb-2 me-2"
							onChange={(e) => setOriginLocation(e.target.value)}
							required={true}>
							<option value="">Nationality</option>
							{Countries().map((country, key) => (
								<option
									key={key}
									value={country}>
									{country}
								</option>
							))}
						</select>

						<select
							type="text"
							name="currentLocation"
							className="form-control mb-2 me-2"
							onChange={(e) => setCurrentLocation(e.target.value)}
							required={true}>
							<option value="">Current Country</option>
							{Countries().map((country, key) => (
								<option
									key={key}
									value={country}>
									{country}
								</option>
							))}
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
					</div>

					<div className="col-sm-4">
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

						{/* Courses Start */}
						<div className="d-flex">
							<select
								name="courseId"
								className="form-control mb-3 me-2"
								onChange={(e) =>
									handleCourseIds(Number.parseInt(e.target.value))
								}
								disabled={courseIds.length > 0}>
								<option value="">Select Course</option>
								{courses
									.filter((course) => course.departmentId == departmentId)
									.map((course, key) => (
										<option
											key={key}
											value={course.id}
											className="text-primary"
											selected={course.id == courseIds[0]}>
											{course.name}
										</option>
									))}
							</select>
							{/* Close Icon */}
							<span
								className="text-primary"
								style={{ cursor: "pointer" }}
								onClick={() => setCourseIds(courseIds.slice(0, 0))}>
								<CloseSVG />
							</span>
							{/* Close Icon End */}
						</div>

						{courseIds.map((input, key1) => (
							<div
								className="d-flex"
								key={key1}>
								<select
									name="courseId"
									className="form-control mb-3 me-2"
									onChange={(e) =>
										handleCourseIds(Number.parseInt(e.target.value))
									}
									disabled={courseIds.length > key1 + 1}>
									<option value="">Select Course</option>
									{courses
										.filter((course) => course.departmentId == departmentId)
										.map((course, key2) => (
											<option
												key={key2}
												value={!courseIds.includes(course.id) && course.id}
												className={
													courseIds.includes(course.id)
														? "text-secondary"
														: "text-primary"
												}
												selected={course.id == courseIds[key1 + 1]}>
												{course.name}
											</option>
										))}
								</select>
								{/* Close Icon */}
								<span
									className={
										key1 == courseIds.length - 1
											? "invisible text-primary"
											: "text-primary"
									}
									style={{ cursor: "pointer" }}
									onClick={() =>
										setCourseIds(
											courseIds.filter((courseId, index) => index != key1 + 1)
										)
									}>
									<CloseSVG />
								</span>
								{/* Close Icon End */}
							</div>
						))}
						{/* Courses End */}

						{/* Units Start */}
						<div className="d-flex">
							<select
								name="unitId"
								className="form-control mb-3 me-2"
								onChange={(e) => handleUnitIds(Number.parseInt(e.target.value))}
								disabled={unitIds.length > 0}>
								<option value="">Select Unit</option>
								{units
									.filter((unit) => courseIds.includes(unit.courseId))
									.map((unit, key) => (
										<option
											key={key}
											value={unit.id}
											className="text-primary"
											selected={unit.id == unitIds[0]}>
											{unit.name}
										</option>
									))}
							</select>
							{/* Close Icon */}
							<span
								className="text-primary"
								style={{ cursor: "pointer" }}
								onClick={() => setUnitIds(unitIds.slice(0, 0))}>
								<CloseSVG />
							</span>
							{/* Close Icon End */}
						</div>

						{unitIds.map((input, key1) => (
							<div
								className="d-flex"
								key={key1}>
								<select
									name="unitId"
									className="form-control mb-3 me-2"
									onChange={(e) =>
										handleUnitIds(Number.parseInt(e.target.value))
									}
									disabled={unitIds.length > key1 + 1}>
									<option value="">Select Unit</option>
									{units
										.filter((unit) => courseIds.includes(unit.courseId))
										.map((unit, key2) => (
											<option
												key={key2}
												value={!unitIds.includes(unit.id) && unit.id}
												className={
													unitIds.includes(unit.id)
														? "text-secondary"
														: "text-primary"
												}
												selected={unit.id == unitIds[key1 + 1]}>
												{unit.name}
											</option>
										))}
								</select>
								{/* Close Icon */}
								<span
									className={
										key1 == unitIds.length - 1
											? "invisible text-primary"
											: "text-primary"
									}
									style={{ cursor: "pointer" }}
									onClick={() =>
										setUnitIds(
											unitIds.filter((unitId, index) => index != key1 + 1)
										)
									}>
									<CloseSVG />
								</span>
								{/* Close Icon End */}
							</div>
						))}
						{/* Units End */}
					</div>
					<div className="col-sm-4"></div>
				</div>

				<center className="mt-4 mb-5">
					<Btn
						text="add instructor"
						loading={loading}
					/>

					<br />
					<br />

					<MyLink
						linkTo="/instructors"
						text="back to instructors"
					/>
				</center>
			</form>
		</div>
	)
}

export default create
