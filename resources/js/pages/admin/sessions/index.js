import React, { useEffect, useState } from "react"

import MyLink from "@/components/Core/MyLink"

import HeroIcon from "@/components/Core/HeroIcon"
import PaginationLinks from "@/components/Core/PaginationLinks"

import SessionSVG from "@/svgs/SessionSVG"

const index = (props) => {
	// Get Sessions
	const [sessions, setSessions] = useState([])
	const [courses, setCourses] = useState([])

	const [courseQuery, setCourseQuery] = useState("")
	const [yearQuery, setYearQuery] = useState("")
	const [semesterQuery, setSemesterQuery] = useState("")
	const [loading, setLoading] = useState()

	useEffect(() => {
		// Set page
		props.setPage({ name: "Sessions", path: ["sessions"] })
		props.get("courses?idAndName=true", setCourses)
	}, [])

	useEffect(() => {
		props.getPaginated(
			`sessions?
			courseId=${courseQuery}&
			year=${yearQuery}&
			semester=${semesterQuery}`,
			setSessions
		)
	}, [courseQuery, yearQuery, semesterQuery])

	/*
	 * Delete
	 */
	const onDeleteSession = (sessionId) => {
		// Toggle loader
		setLoading(true)

		Axios.delete(`/api/sessions/${sessionId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Toggle loader
				setLoading(true)
				// Remove row
				setSessions({
					meta: sessions.meta,
					links: sessions.links,
					data: sessions.data.filter((session) => session.id != sessionId),
				})
			})
			.catch((err) => {
				// Toggle loader
				setLoading(true)
				props.getErrors(err)
			})
	}

	return (
		<div className="row">
			<div className="col-sm-12">
				{/* Data */}
				<div className="card shadow-sm p-2">
					<div className="d-flex justify-content-between">
						{/* Total */}
						<div className="d-flex justify-content-between w-100 align-items-center mx-4">
							<div>
								<span className="fs-4">{sessions.meta?.total}</span>
								<h4>Total Sessions</h4>
							</div>
							<HeroIcon>
								<SessionSVG />
							</HeroIcon>
						</div>
						{/* Total End */}
					</div>
				</div>
				{/* Data End */}

				<br />

				{/* Filters */}
				<div className="card shadow-sm p-4">
					<div className="d-flex flex-wrap">
						{/* Course */}
						<div className="flex-grow-1 me-2 mb-2">
							<select
								type="text"
								placeholder="Search by Gender"
								className="form-control me-2"
								onChange={(e) => setCourseQuery(e.target.value)}>
								<option value="">Search by Course</option>
								{courses.map((course, key) => (
									<option
										key={key}
										value={course.id}>
										{course.name}
									</option>
								))}
							</select>
						</div>
						{/* Course End */}
						{/* Year */}
						<div className="flex-grow-1 me-2 mb-2">
							<input
								type="number"
								placeholder="Search by Year"
								className="form-control"
								onChange={(e) => setYearQuery(e.target.value)}
							/>
						</div>
						{/* Year End */}
						{/* Semester */}
						<div className="flex-grow-1 me-2 mb-2">
							<input
								type="number"
								placeholder="Search by Semester"
								className="form-control"
								onChange={(e) => setSemesterQuery(e.target.value)}
							/>
						</div>
						{/* Semester End */}
					</div>
				</div>
				{/* Filters End */}

				<br />

				<div className="table-responsive mb-5 pb-2">
					<table className="table table-hover">
						<thead>
							<tr>
								<th colSpan="6"></th>
								<th className="text-end">
									<MyLink
										linkTo="/sessions/create"
										text="create session"
									/>
								</th>
							</tr>
							<tr>
								<th>#</th>
								<th>Course</th>
								<th>Year</th>
								<th>Semester</th>
								<th>Starts At</th>
								<th>Ends At</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{sessions.data?.map((session, key) => (
								<tr key={key}>
									<td>{props.iterator(key, sessions)}</td>
									<td>{session.courseName}</td>
									<td>{session.year}</td>
									<td>{session.semester}</td>
									<td>{session.startsAtFormated}</td>
									<td>{session.endsAtFormated}</td>
									<td className="text-end">
										<div className="d-flex">
											<MyLink
												linkTo={`/sessions/${session.id}/edit`}
												text="edit"
												className="btn-sm"
											/>

											<div className="mx-1">
												{/* Confirm Delete Modal End */}
												<div
													className="modal fade"
													id={`deleteModal${key}`}
													tabIndex="-1"
													aria-labelledby="deleteModalLabel"
													aria-hidden="true">
													<div className="modal-dialog">
														<div className="modal-content">
															<div className="modal-header">
																<h1
																	id="deleteModalLabel"
																	className="modal-title fs-5 text-danger">
																	Delete Session
																</h1>
																<button
																	type="button"
																	className="btn-close"
																	data-bs-dismiss="modal"
																	aria-label="Close"></button>
															</div>
															<div className="modal-body text-start text-wrap">
																Are you sure you want to delete {session.name}.
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
																	onClick={() => onDeleteSession(session.id)}>
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
													data-bs-target={`#deleteModal${key}`}>
													Delete
												</button>
											</div>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					{/* Pagination Links */}
					<PaginationLinks
						list={sessions}
						getPaginated={props.getPaginated}
						setState={setSessions}
					/>
					{/* Pagination Links End */}
				</div>
			</div>
		</div>
	)
}

export default index
