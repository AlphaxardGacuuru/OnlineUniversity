import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import MyLink from "@/components/Core/MyLink"
import Img from "@/components/Core/Img"

import DepartmentSVG from "@/svgs/DepartmentSVG"
import PersonSVG from "@/svgs/PersonSVG"

const show = (props) => {
	var { id } = useParams()

	const [faculty, setFaculty] = useState({})
	const [tab, setTab] = useState("departments")

	const [nameQuery, setNameQuery] = useState("")
	const [genderQuery, setGenderQuery] = useState("")
	const [dateQuery, setDateQuery] = useState("")

	useEffect(() => {
		// Set page
		props.setPage({ name: "View Faculty", path: ["faculties", "view"] })
		props.get(`faculties/${id}`, setFaculty)
	}, [])

	const active = (activeTab) => {
		return activeTab == tab ? "bg-light" : "bg-secondary-subtle"
	}

	const activeTab = (activeTab) => {
		return activeTab == tab ? "d-block" : "d-none"
	}

	/*
	 * Delete Department
	 */
	const onDeleteDepartment = (departmentId) => {
		Axios.delete(`/api/departments/${departmentId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove row
				props.get(`faculties/${id}`, setFaculty)
			})
			.catch((err) => props.getErrors(err))
	}

	/*
	 * Delete Professor
	 */
	const onDeleteProfessor = (professorId) => {
		Axios.delete(`/api/professors/${professorId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove row
				props.get(`faculties/${id}`, setFaculty)
			})
			.catch((err) => props.getErrors(err))
	}

	return (
		<div className="row">
			<div className="col-sm-4">
				<div className="card mb-2 p-4 text-center">
					<h4>{faculty.name}</h4>
				</div>
			</div>
			<div className="col-sm-8">
				{/* Tabs */}
				<div className="d-flex justify-content-between flex-wrap mb-2">
					<div
						className={`card flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"departments"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("departments")}>
						Departments
					</div>
					<div
						className={`card flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"professors"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("professors")}>
						Professors
					</div>
					<div
						className={`card flex-grow-1 text-center mb-2 py-2 px-4 ${active(
							"students"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("students")}>
						Students
					</div>
				</div>
				{/* Tabs End */}

				{/* Departments Tab */}
				<div className={activeTab("departments")}>
					{/* Data */}
					<div className="card shadow-sm mb-2 p-2">
						<div className="d-flex justify-content-between">
							{/* Total */}
							<div className="d-flex justify-content-between w-100 align-items-center mx-4">
								<div>
									<span className="fs-4">{faculty.departments?.length}</span>
									<h4>Total Departments</h4>
								</div>
								<div className="fs-1 py-3 px-4 bg-primary-subtle rounded-circle">
									<DepartmentSVG />
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
									<th colSpan="2">Departments</th>
									<th className="text-end">
										<MyLink
											linkTo={`/admin/departments/${id}/create`}
											text="create"
										/>
									</th>
								</tr>
								<tr>
									<td>#</td>
									<td>Name</td>
									<td>Action</td>
								</tr>
								{faculty?.departments?.map((department, key) => (
									<tr key={key}>
										<td>{key + 1}</td>
										<td>{department.name}</td>
										<td>
											<div className="d-flex justify-content-end">
												<MyLink
													linkTo={`/admin/departments/${department.id}`}
													text="view"
													className="btn-sm me-2"
												/>

												<MyLink
													linkTo={`/admin/departments/${department.id}/edit`}
													text="edit"
													className="btn-sm"
												/>

												<div className="mx-1">
													{/* Confirm Delete Modal End */}
													<div
														className="modal fade"
														id={`deleteDepartmentModal${key}`}
														tabIndex="-1"
														aria-labelledby="deleteModalLabel"
														aria-hidden="true">
														<div className="modal-dialog">
															<div className="modal-content">
																<div className="modal-header">
																	<h1
																		id="deleteModalLabel"
																		className="modal-title fs-5 text-danger">
																		Delete Faculty
																	</h1>
																	<button
																		type="button"
																		className="btn-close"
																		data-bs-dismiss="modal"
																		aria-label="Close"></button>
																</div>
																<div className="modal-body text-wrap">
																	Are you sure you want to delete{" "}
																	{department.name}.
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
																			onDeleteDepartment(department.id)
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
														data-bs-target={`#deleteDepartmentModal${key}`}>
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
				{/* Departments Tab End */}

				{/* Professors Tab */}
				<div className={activeTab("professors")}>
					{/* Data */}
					<div className="card shadow-sm p-2">
						<div className="d-flex justify-content-between">
							{/* Total */}
							<div className="d-flex justify-content-between w-100 align-items-center mx-4">
								<div>
									<span className="fs-4">{faculty.professors?.length}</span>
									<h4>Total Professors</h4>
								</div>
								<div className="fs-1 py-3 px-4 bg-primary-subtle rounded-circle">
									<PersonSVG />
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
											linkTo="/admin/professors/create"
											text="create"
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
									<th>Department</th>
									<th>Date Joined</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{faculty.professors
									?.filter((professor) => {
										var name = professor.name.toLowerCase()
										var query = nameQuery.toLowerCase()

										return name.match(query)
									})
									.filter((professor) => {
										if (genderQuery) {
											return professor.gender == genderQuery
										} else {
											return true
										}
									})
									.map((professor, key) => (
										<tr key={key}>
											<td>{key + 1}</td>
											<td>
												<Img
													src={professor.avatar}
													className="rounded-circle"
													width="25px"
													height="25px"
													alt="Avatar"
												/>
											</td>
											<td>{professor.name}</td>
											<td>{professor.email}</td>
											<td>{professor.phone}</td>
											<td className="text-capitalize">{professor.gender}</td>
											<td>{professor.departmentName}</td>
											<td>{professor.createdAt}</td>
											<td>
												<div className="d-flex justify-content-end">
													<MyLink
														linkTo={`/admin/professors/${professor.id}/edit`}
														text="edit"
														className="btn-sm"
													/>

													<div className="mx-1">
														{/* Confirm Delete Modal End */}
														<div
															className="modal fade"
															id={`deleteProfessorModal${key}`}
															tabIndex="-1"
															aria-labelledby="deleteModalLabel"
															aria-hidden="true">
															<div className="modal-dialog">
																<div className="modal-content">
																	<div className="modal-header">
																		<h1
																			id="deleteModalLabel"
																			className="modal-title fs-5 text-danger">
																			Delete Professor
																		</h1>
																		<button
																			type="button"
																			className="btn-close"
																			data-bs-dismiss="modal"
																			aria-label="Close"></button>
																	</div>
																	<div className="modal-body text-wrap text-start">
																		Are you sure you want to delete{" "}
																		{professor.name}.
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
																				onDeleteProfessor(professor.id)
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
															data-bs-target={`#deleteProfessorModal${key}`}>
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
				{/* Professors Tab End */}

				{/* Students Tab */}
				<div className={activeTab("students")}>
					{/* Data */}
					<div className="card shadow-sm p-2">
						<div className="d-flex justify-content-between">
							{/* Total */}
							<div className="d-flex justify-content-between w-100 align-items-center mx-4">
								<div>
									<span className="fs-4">{faculty.students?.length}</span>
									<h4>Total Professors</h4>
								</div>
								<div className="fs-1 py-3 px-4 bg-primary-subtle rounded-circle">
									<PersonSVG />
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
											text="create"
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
									<th>Department</th>
									<th>Date Joined</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{faculty.students
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
											<td>{student.departmentName}</td>
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
																				onDeleteProfessor(student.id)
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
