import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import MyLink3 from "@/components/Core/MyLink3"
import Img from "@/components/Core/Img"
import Btn3 from "@/components/Core/Btn3"

import UnitSVG from "@/svgs/UnitSVG"
import PersonSVG from "@/svgs/PersonSVG"
import StudentSVG from "@/svgs/StudentSVG"

const show = (props) => {
	var { id } = useParams()

	const [course, setCourse] = useState({})
	const [session, setSession] = useState({})
	const [tab, setTab] = useState("units")
	const [loading, setLoading] = useState()

	const [nameQuery, setNameQuery] = useState("")

	useEffect(() => {
		// Set page
		props.setPage({ name: "View Course", path: ["courses", "view"] })
		Axios.get(`api/courses/${id}`)
			.then((res) => {
				setCourse(res.data.data)

				// Set Payment Details
				props.setPaymentTitle("Fee Payment")
				props.setPaymentDescription(`Payment of Fees for ${res.data.data.name}`)
				props.setPaymentAmount(res.data.data.price)
			})
			.catch((err) => props.getErrors(err))

		// Fetch Session
		Axios.get(`api/sessions/by-course-id/${id}`)
			.then((res) => setSession(res.data.data))
			.catch((err) => props.getErrors(err))
	}, [])

	const active = (activeTab) => {
		return activeTab == tab ? "bg-light" : "bg-secondary-subtle"
	}

	const activeTab = (activeTab) => {
		return activeTab == tab ? "d-block" : "d-none"
	}

	/*
	 * Self Enroll
	 */
	const selfEnrollUnit = (unitId) => {
		// Show loader
		setLoading(true)

		Axios.put(`/api/students/${props.auth.id}`, {
			unitId: unitId,
			sessionId: session.id,
		})
			.then((res) => {
				setLoading(false)
				props.setMessages([res.data.message])
				// Fetch Auth
				props.get("auth", props.setAuth, "auth")
			})
			.catch((err) => {
				setLoading(false)
				props.getErrors(err)
			})
	}

	/*
	 * Self Enroll
	 */
	const selfEnrollCourse = () => {
		// Show loader
		setLoading(true)

		Axios.put(`/api/students/${props.auth.id}`, {
			courseId: id,
		})
			.then((res) => {
				setLoading(false)
				props.setMessages([res.data.message])
				// Fetch Auth
				props.get("auth", props.setAuth, "auth")
			})
			.catch((err) => {
				setLoading(false)
				props.getErrors(err)
			})
	}

	/*
	 * Format Amount
	 */
	const formatAmount = () => {
		return (
			"KES " + course.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
		)
	}

	return (
		<React.Fragment>
			<div className="row">
				<div className="col-sm-4">
					<div className="card mb-2 p-4 text-center shadow">
						<h4>{course.name}</h4>
						{props.auth.courseId != id && session.id && (
							<Btn3
								btnText={`self enroll ${
									!props.auth.paidCourse && formatAmount()
								}`}
								btnClass="btn-success mt-2"
								onClick={
									!props.auth.paidCourse
										? () => props.setShowPayMenu("menu-open")
										: selfEnrollCourse
								}
								loading={loading}
							/>
						)}
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
							className={`card shadow-sm flex-grow-1 text-center mb-2 py-2 px-4 ${active(
								"students"
							)}`}
							style={{ cursor: "pointer" }}
							onClick={() => setTab("students")}>
							Students
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
									<div className="fs-1 py-3 px-4 bg-success-subtle text-success rounded-circle">
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
												{props.auth.unitIds?.includes(unit.id) ? (
													<div className="d-flex justify-content-end">
														<MyLink3
															linkTo={`/student/units/${unit.id}/show`}
															text="view"
															className="btn-sm me-2"
														/>
													</div>
												) : (
													<React.Fragment>
														{props.auth.courseId == id &&
															unit.year == session.year &&
															unit.semester == session.semester && (
																<div className="d-flex justify-content-end">
																	<Btn3
																		btnText="self enroll"
																		btnClass="btn-sm btn-success me-2"
																		onClick={() => selfEnrollUnit(unit.id)}
																		loading={loading}
																	/>
																</div>
															)}
													</React.Fragment>
												)}
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
									<div className="fs-1 py-3 px-4 bg-success-subtle text-success rounded-circle">
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
										<th>#</th>
										<th></th>
										<th>Name</th>
										<th>Email</th>
										<th>Date Joined</th>
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
											<td>{instructor.createdAt}</td>
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
									<div className="fs-1 py-3 px-4 bg-success-subtle text-success rounded-circle">
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
										<th>Date Joined</th>
									</tr>
								</thead>
								<tbody>
									{course.students
										?.filter((student) => {
											var name = student.name.toLowerCase()
											var query = nameQuery.toLowerCase()

											return name.match(query)
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
												<td>{student.createdAt}</td>
											</tr>
										))}
								</tbody>
							</table>
						</div>
					</div>
					{/* Students Tab End */}
				</div>
			</div>
		</React.Fragment>
	)
}

export default show
