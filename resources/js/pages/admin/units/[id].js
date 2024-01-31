import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import MyLink from "@/components/Core/MyLink"
import Img from "@/components/Core/Img"
import Btn from "@/components/Core/Btn"

import MaterialSVG from "@/svgs/MaterialSVG"
import PersonSVG from "@/svgs/PersonSVG"
import StudentSVG from "@/svgs/StudentSVG"

const show = (props) => {
	var { id } = useParams()

	const [unit, setUnit] = useState({})
	const [syllabus, setSyllabus] = useState([])
	const [tab, setTab] = useState("materials")
	const [materialTab, setMaterialTab] = useState("Learning Guide")
	const [richText, setRichText] = useState("")

	const [nameQuery, setNameQuery] = useState("")
	const [genderQuery, setGenderQuery] = useState("")

	useEffect(() => {
		// Set page
		props.setPage({ name: "View Unit", path: ["units", "view"] })
		props.get(`units/${id}`, setUnit)
		props.get(`materials/by-unit-id/${id}`, setSyllabus)
	}, [])

	const active = (activeTab) => {
		return activeTab == tab ? "bg-light" : "bg-secondary-subtle"
	}

	const materialActive = (activeTab) => {
		return activeTab == materialTab ? "bg-light" : "bg-secondary-subtle"
	}

	const activeTab = (activeTab) => {
		return activeTab == tab ? "d-block" : "d-none"
	}

	/*
	 * Handle Material Change
	 */
	const handleMaterialTab = (title, richText) => {
		// Check Type of material clicked
		if (title == "Learning Guide") {
			setMaterialTab("Learning Guide")
			setRichText(richText)
		} else if (title == "Discussion Forum") {
			setMaterialTab("Discussion Forum")
		} else if (title == "Written Assignment") {
			setMaterialTab("Written Assignment")
			setRichText(richText)
		} else if (title == "Learning Reflection") {
			setMaterialTab("Learning Reflection")
			setRichText(richText)
		}
	}

	/*
	 * Delete Instructor
	 */
	const onDeleteInstructor = (instructorId) => {
		Axios.delete(`/api/instructors/${instructorId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove row
				props.get(`units/${id}`, setUnit)
			})
			.catch((err) => props.getErrors(err))
	}

	/*
	 * Delete Student
	 */
	const onDeleteStudent = (studentId) => {
		Axios.delete(`/api/students/${studentId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove row
				props.get(`units/${id}`, setUnit)
			})
			.catch((err) => props.getErrors(err))
	}

	/*
	 * Delete Material
	 */
	const onDeleteMaterial = (materialId) => {
		Axios.delete(`/api/materials/${materialId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove row
				props.get(`materials/by-unit-id/${id}`, setSyllabus)
			})
			.catch((err) => props.getErrors(err))
	}

	return (
		<div className="row">
			<div className="col-sm-4">
				<div className="card shadow mb-2 p-4 text-center">
					<h4>{unit.name}</h4>
					<h6>{unit.description}</h6>
					<h6>Year {unit.year}</h6>
					<h6>Semester {unit.semester}</h6>
					<h6>Credit {unit.credits}</h6>
				</div>

				{/* Materials Tab */}
				<div>
					{/* Data */}
					<div className="card shadow mb-2 p-2">
						<div className="d-flex justify-content-between">
							{/* Total */}
							<div className="d-flex justify-content-between w-100 align-items-center mx-4">
								<div>
									<span className="fs-4">{syllabus.length}</span>
									<h4>Total Weeks</h4>
								</div>
								<div className="fs-1 py-3 px-4 bg-primary-subtle text-primary rounded-circle">
									<MaterialSVG />
								</div>
							</div>
							{/* Total End */}
						</div>
					</div>
					{/* Data End */}

					{/* Weeks */}
					<div className="card shadow mb-2">
						<div className="d-flex justify-content-between p-2 px-4 align-items-center">
							<h5>Materials</h5>
							<div>
								<MyLink
									linkTo={`/admin/materials/${id}/create`}
									text="add material"
								/>
							</div>
						</div>
					</div>
					<div
						className="accordion shadow mb-5"
						id="accordionPanelsStayOpenExample">
						{syllabus.map((syllabus, key) => (
							<div
								key={key}
								className="accordion-item">
								<h2 className="accordion-header">
									<button
										className={`accordion-button ${key > 0 && "collapsed"}`}
										type="button"
										data-bs-toggle="collapse"
										data-bs-target={`#panelsStayOpen-${key}`}
										aria-expanded="true"
										aria-controls={`panelsStayOpen-${key}`}>
										Week {syllabus.week}
									</button>
								</h2>
								<div
									id={`panelsStayOpen-${key}`}
									className={`accordion-collapse collapse ${
										key == 0 && "show"
									}`}>
									<div className="accordion-body p-1">
										{/* Table */}
										<div className="table-responsive">
											<table className="table table-hover table-borderless">
												<tbody>
													{syllabus.materials.map((material, key) => (
														<tr key={key}>
															<td>{material.title}</td>
															<td>
																<div className="d-flex justify-content-end">
																	<Btn
																		btnText="view"
																		btnClass="btn-outline-primary  btn-sm me-1"
																		onClick={() =>
																			handleMaterialTab(
																				material.title,
																				material.richText
																			)
																		}
																	/>

																	<MyLink
																		linkTo={`/admin/materials/${material.id}/edit`}
																		text="edit"
																		className="btn-sm"
																	/>

																	<div className="mx-1">
																		{/* Confirm Delete Modal End */}
																		<div
																			className="modal fade"
																			id={`deleteMaterialModal${material.id}`}
																			tabIndex="-1"
																			aria-labelledby="deleteModalLabel"
																			aria-hidden="true">
																			<div className="modal-dialog">
																				<div className="modal-content">
																					<div className="modal-header">
																						<h1
																							id="deleteModalLabel"
																							className="modal-title fs-5 text-danger">
																							Delete Material
																						</h1>
																						<button
																							type="button"
																							className="btn-close"
																							data-bs-dismiss="modal"
																							aria-label="Close"></button>
																					</div>
																					<div className="modal-body text-wrap">
																						Are you sure you want to delete{" "}
																						{material.title}.
																					</div>
																					<div className="modal-footer justify-content-between">
																						<button
																							type="button"
																							className="btn btn-light rounded-pill"
																							data-bs-dismiss="modal">
																							Close
																						</button>
																						<button
																							type="button"
																							className="btn btn-danger rounded-pill"
																							data-bs-dismiss="modal"
																							onClick={() =>
																								onDeleteMaterial(material.id)
																							}>
																							Delete
																						</button>
																					</div>
																				</div>
																			</div>
																		</div>
																		{/* Confirm Delete Modal End */}

																		{/* Button trigger modal */}
																		<button
																			type="button"
																			className="btn btn-sm btn-outline-danger rounded-pill"
																			data-bs-toggle="modal"
																			data-bs-target={`#deleteMaterialModal${material.id}`}>
																			Delete
																		</button>
																	</div>
																</div>
															</td>
														</tr>
													))}
												</tbody>
											</table>
										</div>
										{/* Table End */}
									</div>
								</div>
							</div>
						))}
					</div>
					{/* Weeks End */}
				</div>
				{/* Materials Tab End */}
			</div>

			<div className="col-sm-8">
				{/* Tabs */}
				<div className="d-flex justify-content-between flex-wrap mb-2">
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"materials"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("materials")}>
						Materials
					</div>
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"instructors"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("instructors")}>
						Instructors
					</div>
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"students"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("students")}>
						Students
					</div>
				</div>
				{/* Tabs End */}

				{/* Materials Tab */}
				<div className={activeTab("materials")}>
					{/* Material Tabs */}
					<div className="d-flex justify-content-between flex-wrap mb-2">
						<div
							className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${materialActive(
								"Learning Guide"
							)}`}>
							Learning Guide
						</div>
						<div
							className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${materialActive(
								"Discussion Forum"
							)}`}>
							Discussion Forum
						</div>
						<div
							className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${materialActive(
								"Written Assignment"
							)}`}>
							Written Assignment
						</div>
						<div
							className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${materialActive(
								"Learning Reflection"
							)}`}>
							Learning Reflection
						</div>
					</div>
					{/* Material Tabs End */}

					<div className="card shadow-sm mb-2 py-5 p-2">
						{richText ? (
							<div
								dangerouslySetInnerHTML={{ __html: richText }}
								className="px-5"
							/>
						) : (
							<div className="d-flex justify-content-center p-5 text-muted">
								Nothing to show
							</div>
						)}
					</div>
				</div>
				{/* Materials Tab End */}

				{/* Instructors Tab */}
				<div className={activeTab("instructors")}>
					{/* Data */}
					<div className="card shadow-sm mb-2 p-2">
						<div className="d-flex justify-content-between">
							{/* Total */}
							<div className="d-flex justify-content-between w-100 align-items-center mx-4">
								<div>
									<span className="fs-4">{unit.instructors?.length}</span>
									<h4>Total Instructors</h4>
								</div>
								<div className="fs-1 py-3 px-4 bg-primary-subtle text-primary rounded-circle">
									<PersonSVG />
								</div>
							</div>
							{/* Total End */}
						</div>
					</div>
					{/* Data End */}

					{/* Table */}
					<div className="table-responsive">
						<table className="table table-hover">
							<thead>
								<tr>
									<th colSpan="8">Instructors</th>
									<th className="text-end">
										<MyLink
											linkTo={`/admin/instructors/${id}/create`}
											text="add instructor"
										/>
									</th>
								</tr>
								<tr>
									<th>#</th>
									<th></th>
									<th>Name</th>
									<th>Email</th>
									<th>Phone</th>
									<th>Gender</th>
									<th>Material</th>
									<th>Date Joined</th>
									<th>Action</th>
								</tr>
								{unit?.instructors?.map((instructor, key) => (
									<tr key={key}>
										<td>{key + 1}</td>
										<td>
											<Img
												src={instructor.avatar}
												className="rounded-circle"
												width="25px"
												height="25px"
												alt="Avatar"
											/>
										</td>
										<td>{instructor.name}</td>
										<td>{instructor.email}</td>
										<td>{instructor.phone}</td>
										<td className="text-capitalize">{instructor.gender}</td>
										<td>{instructor.materialName}</td>
										<td>{instructor.createdAt}</td>
										<td>
											<div className="d-flex justify-content-end">
												<MyLink
													linkTo={`/admin/instructors/${instructor.id}/edit`}
													text="edit"
													className="btn-sm"
												/>

												<div className="mx-1">
													{/* Confirm Delete Modal End */}
													<div
														className="modal fade"
														id={`deleteStudentModal${key}`}
														tabIndex="-1"
														aria-labelledby="deleteModalLabel"
														aria-hidden="true">
														<div className="modal-dialog">
															<div className="modal-content">
																<div className="modal-header">
																	<h1
																		id="deleteModalLabel"
																		className="modal-title fs-5 text-danger">
																		Delete Student
																	</h1>
																	<button
																		type="button"
																		className="btn-close"
																		data-bs-dismiss="modal"
																		aria-label="Close"></button>
																</div>
																<div className="modal-body text-wrap text-start">
																	Are you sure you want to delete{" "}
																	{instructor.name}.
																</div>
																<div className="modal-footer justify-content-between">
																	<button
																		type="button"
																		className="btn btn-light rounded-pill"
																		data-bs-dismiss="modal">
																		Close
																	</button>
																	<button
																		type="button"
																		className="btn btn-danger rounded-pill"
																		data-bs-dismiss="modal"
																		onClick={() =>
																			onDeleteInstructor(instructor.id)
																		}>
																		Delete
																	</button>
																</div>
															</div>
														</div>
													</div>
													{/* Confirm Delete Modal End */}

													{/* Button trigger modal */}
													<button
														type="button"
														className="btn btn-sm btn-outline-danger rounded-pill"
														data-bs-toggle="modal"
														data-bs-target={`#deleteStudentModal${key}`}>
														Delete
													</button>
												</div>
											</div>
										</td>
									</tr>
								))}
							</thead>
						</table>
					</div>
					{/* Table End */}
				</div>
				{/* Instructors Tab End */}

				{/* Students Tab */}
				<div className={activeTab("students")}>
					{/* Data */}
					<div className="card shadow-sm p-2">
						<div className="d-flex justify-content-between">
							{/* Total */}
							<div className="d-flex justify-content-between w-100 align-items-center mx-4">
								<div>
									<span className="fs-4">{unit.students?.length}</span>
									<h4>Total Students</h4>
								</div>
								<div className="fs-1 py-3 px-4 bg-primary-subtle text-primary rounded-circle">
									<StudentSVG />
								</div>
							</div>
							{/* Total End */}
						</div>
					</div>
					{/* Data End */}

					<br />

					{/* Filters */}
					<div className="card shadow-sm p-4">
						<div className="d-flex flex-wrap">
							{/* Name */}
							<div className="flex-grow-1 me-2 mb-2">
								<input
									id=""
									type="text"
									name="name"
									placeholder="Search by Name"
									className="form-control"
									onChange={(e) => setNameQuery(e.target.value)}
								/>
							</div>
							{/* Name End */}
							{/* Gender */}
							<div className="flex-grow-1 me-2 mb-2">
								<select
									id=""
									type="text"
									name="name"
									placeholder="Search by Gender"
									className="form-control me-2"
									onChange={(e) => setGenderQuery(e.target.value)}>
									<option value="">Search by Gender</option>
									<option value="male">Male</option>
									<option value="female">Female</option>
								</select>
							</div>
							{/* Gender End */}
						</div>
					</div>
					{/* Filters End */}

					<br />

					<div className="table-responsive">
						<table className="table table-hover">
							<thead>
								<tr>
									<th>#</th>
									<th></th>
									<th>Name</th>
									<th>Email</th>
									<th>Phone</th>
									<th>Gender</th>
									<th>Material</th>
									<th>Date Joined</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{unit.students
									?.filter((student) => {
										var name = student.name.toLowerCase()
										var query = nameQuery.toLowerCase()

										return name.match(query)
									})
									.filter((student) => {
										if (genderQuery) {
											return student.gender == genderQuery
										} else {
											return true
										}
									})
									.map((student, key) => (
										<tr key={key}>
											<td>{key + 1}</td>
											<td>
												<Img
													src={student.avatar}
													className="rounded-circle"
													width="25px"
													height="25px"
													alt="Avatar"
												/>
											</td>
											<td>{student.name}</td>
											<td>{student.email}</td>
											<td>{student.phone}</td>
											<td className="text-capitalize">{student.gender}</td>
											<td>{student.materialName}</td>
											<td>{student.createdAt}</td>
											<td>
												<div className="d-flex justify-content-end">
													<MyLink
														linkTo={`/admin/students/${student.id}/edit`}
														text="edit"
														className="btn-sm"
													/>

													<div className="mx-1">
														{/* Confirm Delete Modal End */}
														<div
															className="modal fade"
															id={`deleteStudentModal${key}`}
															tabIndex="-1"
															aria-labelledby="deleteModalLabel"
															aria-hidden="true">
															<div className="modal-dialog">
																<div className="modal-content">
																	<div className="modal-header">
																		<h1
																			id="deleteModalLabel"
																			className="modal-title fs-5 text-danger">
																			Delete Student
																		</h1>
																		<button
																			type="button"
																			className="btn-close"
																			data-bs-dismiss="modal"
																			aria-label="Close"></button>
																	</div>
																	<div className="modal-body text-wrap text-start">
																		Are you sure you want to delete{" "}
																		{student.name}.
																	</div>
																	<div className="modal-footer justify-content-between">
																		<button
																			type="button"
																			className="btn btn-light rounded-pill"
																			data-bs-dismiss="modal">
																			Close
																		</button>
																		<button
																			type="button"
																			className="btn btn-danger rounded-pill"
																			data-bs-dismiss="modal"
																			onClick={() =>
																				onDeleteStudent(student.id)
																			}>
																			Delete
																		</button>
																	</div>
																</div>
															</div>
														</div>
														{/* Confirm Delete Modal End */}

														{/* Button trigger modal */}
														<button
															type="button"
															className="btn btn-sm btn-outline-danger rounded-pill"
															data-bs-toggle="modal"
															data-bs-target={`#deleteStudentModal${key}`}>
															Delete
														</button>
													</div>
												</div>
											</td>
										</tr>
									))}
							</tbody>
						</table>
					</div>
				</div>
				{/* Students Tab End */}
			</div>
		</div>
	)
}

export default show
