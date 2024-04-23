import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import MyLink from "@/components/Core/MyLink"
import Img from "@/components/Core/Img"

import UnitSVG from "@/svgs/UnitSVG"
import PersonSVG from "@/svgs/PersonSVG"
import StudentSVG from "@/svgs/StudentSVG"
import BillableSVG from "@/svgs/BillableSVG"

const show = (props) => {
	var { id } = useParams()

	const [course, setCourse] = useState({})
	const [tab, setTab] = useState("units")

	const [nameQuery, setNameQuery] = useState("")
	const [genderQuery, setGenderQuery] = useState("")

	useEffect(() => {
		// Set page
		props.setPage({ name: "View Course", path: ["courses", "view"] })
		props.get(`courses/${id}`, setCourse)
	}, [])

	const active = (activeTab) => {
		return activeTab == tab ? "bg-light" : "bg-secondary-subtle"
	}

	const activeTab = (activeTab) => {
		return activeTab == tab ? "d-block" : "d-none"
	}

	/*
	 * Delete Unit
	 */
	const onDeleteUnit = (unitId) => {
		Axios.delete(`/api/units/${unitId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove row
				props.get(`courses/${id}`, setCourse)
			})
			.catch((err) => props.getErrors(err))
	}

	/*
	 * Delete Instructor
	 */
	const onDeleteInstructor = (instructorId) => {
		Axios.delete(`/api/instructors/${instructorId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove row
				props.get(`courses/${id}`, setCourse)
			})
			.catch((err) => props.getErrors(err))
	}

	return (
		<div className="row">
			<div className="col-sm-4">
				<div className="card mb-2 p-4 text-center shadow">
					<h4>{course.name}</h4>
				</div>
			</div>
			<div className="col-sm-8">
				{/* Tabs */}
				<div className="d-flex justify-content-between flex-wrap mb-2">
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"units"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("units")}>
						Units
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
					<div
						className={`card shadow-sm flex-grow-1 text-center mb-2 py-2 px-4 ${active(
							"billables"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("billables")}>
						Fee Structure
					</div>
				</div>
				{/* Tabs End */}

				{/* Units Tab */}
				<div className={activeTab("units")}>
					{/* Data */}
					<div className="card shadow-sm mb-2 p-2">
						<div className="d-flex justify-content-between">
							{/* Total */}
							<div className="d-flex justify-content-between w-100 align-items-center mx-4">
								<div>
									<span className="fs-4">{course.units?.length}</span>
									<h4>Total Units</h4>
								</div>
								<div className="fs-1 py-3 px-4 bg-primary-subtle text-primary rounded-circle">
									<UnitSVG />
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
									<th colSpan="7">Units</th>
									<th className="text-end">
										<MyLink
											linkTo={`/admin/units/${id}/create`}
											text="add unit"
										/>
									</th>
								</tr>
								<tr>
									<td>#</td>
									<td>Code</td>
									<td>Name</td>
									<td>Description</td>
									<td>Year</td>
									<td>Sem</td>
									<td>Credits</td>
									<td>Action</td>
								</tr>
								{course.units?.map((unit, key) => (
									<tr key={key}>
										<td>{key + 1}</td>
										<td>{unit.code}</td>
										<td>{unit.name}</td>
										<td>{unit.description}</td>
										<td>{unit.year}</td>
										<td>{unit.semester}</td>
										<td>{unit.credits}</td>
										<td>
											<div className="d-flex justify-content-end">
												<MyLink
													linkTo={`/admin/units/${unit.id}/show`}
													text="view"
													className="btn-sm me-2"
												/>

												<MyLink
													linkTo={`/admin/units/${unit.id}/edit`}
													text="edit"
													className="btn-sm"
												/>

												<div className="mx-1">
													{/* Confirm Delete Modal End */}
													<div
														className="modal fade"
														id={`deleteUnitModal${key}`}
														tabIndex="-1"
														aria-labelledby="deleteModalLabel"
														aria-hidden="true">
														<div className="modal-dialog">
															<div className="modal-content">
																<div className="modal-header">
																	<h1
																		id="deleteModalLabel"
																		className="modal-title fs-5 text-danger">
																		Delete Course
																	</h1>
																	<button
																		type="button"
																		className="btn-close"
																		data-bs-dismiss="modal"
																		aria-label="Close"></button>
																</div>
																<div className="modal-body text-wrap">
																	Are you sure you want to delete {unit.name}.
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
																		onClick={() => onDeleteUnit(unit.id)}>
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
														data-bs-target={`#deleteUnitModal${key}`}>
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
				{/* Units Tab End */}

				{/* Instructors Tab */}
				<div className={activeTab("instructors")}>
					{/* Data */}
					<div className="card shadow-sm p-2">
						<div className="d-flex justify-content-between">
							{/* Total */}
							<div className="d-flex justify-content-between w-100 align-items-center mx-4">
								<div>
									<span className="fs-4">{course.instructors?.length}</span>
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

					<br />

					<div className="table-responsive">
						<table className="table table-hover">
							<thead>
								<tr>
									<th colSpan="8"></th>
									<th className="text-end">
										<MyLink
											linkTo="/admin/instructors/create"
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
									<th>Unit</th>
									<th>Date Joined</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{course.instructors?.map((instructor, key) => (
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
										<td>{instructor.unitName}</td>
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
														id={`deleteInstructorModal${key}`}
														tabIndex="-1"
														aria-labelledby="deleteModalLabel"
														aria-hidden="true">
														<div className="modal-dialog">
															<div className="modal-content">
																<div className="modal-header">
																	<h1
																		id="deleteModalLabel"
																		className="modal-title fs-5 text-danger">
																		Delete Instructor
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
														data-bs-target={`#deleteInstructorModal${key}`}>
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
				{/* Instructors Tab End */}

				{/* Students Tab */}
				<div className={activeTab("students")}>
					{/* Data */}
					<div className="card shadow-sm p-2">
						<div className="d-flex justify-content-between">
							{/* Total */}
							<div className="d-flex justify-content-between w-100 align-items-center mx-4">
								<div>
									<span className="fs-4">{course.students?.length}</span>
									<h4>Total Instructors</h4>
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
							{/* Date */}
							{/* <div className="flex-grow-1">
							<input
								id=""
								type="date"
								name="daterange"
								placeholder="Search by Date Joined"
								className="form-control"
								onChange={(e) => setDateQuery(e.target.value)}
							/>
						</div> */}
							{/* Date End */}
						</div>
					</div>
					{/* Filters End */}

					<br />

					<div className="table-responsive">
						<table className="table table-hover">
							<thead>
								<tr>
									<th colSpan="8"></th>
									<th className="text-end">
										<MyLink
											linkTo="/admin/students/create"
											text="add student"
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
									<th>Unit</th>
									<th>Date Joined</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{course.students
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
											<td>{student.unitName}</td>
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
																				onDeleteInstructor(student.id)
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

				{/* Billables Tab */}
				<div className={activeTab("billables")}>
					{/* Data */}
					<div className="card shadow-sm p-2">
						<div className="d-flex justify-content-between">
							{/* Total */}
							<div className="d-flex justify-content-between w-100 align-items-center mx-4">
								<div>
									<span className="fs-4">{course.billables?.length}</span>
									<h4>Total Billables</h4>
								</div>
								<div className="fs-1 py-3 px-4 bg-primary-subtle text-primary rounded-circle">
									<BillableSVG />
								</div>
							</div>
							{/* Total End */}
						</div>
					</div>
					{/* Data End */}

					<br />

					<div className="table-responsive">
						<table className="table table-hover">
							<thead>
								<tr>
									<th colSpan="6"></th>
									<th className="text-end">
										<MyLink
											linkTo="/admin/billables/create"
											text="add billable"
										/>
									</th>
								</tr>
								<tr>
									<th>#</th>
									<th>Name</th>
									<th>Description</th>
									<th>Price</th>
									<th>Year</th>
									<th>Semester</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{course.billables?.map((billable, key) => (
									<tr key={key}>
										<td>{key + 1}</td>
										<td>{billable.name}</td>
										<td>{billable.description}</td>
										<td>{billable.price}</td>
										<td>{billable.year}</td>
										<td>{billable.semester}</td>
										<td>
											<div className="d-flex justify-content-end">
												<MyLink
													linkTo={`/admin/billables/${billable.id}/edit`}
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
																	{billable.name}.
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
																			onDeleteInstructor(billable.id)
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
				{/* Billables Tab End */}
			</div>
		</div>
	)
}

export default show
