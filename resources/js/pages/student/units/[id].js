import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import Img from "@/components/Core/Img"
import Btn3 from "@/components/Core/Btn3"
import DiscussionForum from "@/components/Unit/DiscussionForum"
import Submission from "@/components/Unit/Submission"

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
	const [week, setWeek] = useState("")
	const [isActive, setIsActive] = useState()

	const [nameQuery, setNameQuery] = useState("")

	const [unitSession] = (props.auth?.unitSessions || [{}])
		.filter((unitSession) => unitSession.unitId == id)
		.map((unitSession) => unitSession)

	useEffect(() => {
		// Set page
		props.setPage({ name: "View Unit", path: ["units", "view"] })
		props.get(`units/${id}`, setUnit)
		props.get(`materials/by-unit-id/${id}`, setSyllabus)
	}, [])

	/*
	 * Handle Material Change
	 */
	const handleMaterialTab = (title, richText, syllabusWeek, isActive) => {
		// Check Type of material clicked
		if (title == "Learning Guide") {
			setMaterialTab("Learning Guide")
			setRichText(richText)
		} else if (title == "Discussion Forum") {
			setMaterialTab("Discussion Forum")
			setRichText(richText)
			setWeek(syllabusWeek)
			setIsActive(isActive)
		} else if (title == "Written Assignment") {
			setMaterialTab("Written Assignment")
			setRichText(richText)
			setWeek(syllabusWeek)
			setIsActive(isActive)
		} else if (title == "Learning Reflection") {
			setMaterialTab("Learning Reflection")
			setRichText(richText)
			setWeek(syllabusWeek)
			setIsActive(isActive)
		}
	}

	const active = (activeTab) => {
		return activeTab == tab ? "bg-light" : "bg-secondary-subtle"
	}

	const materialActive = (activeTab) => {
		return activeTab == materialTab ? "bg-light" : "bg-secondary-subtle"
	}

	const activeTab = (activeTab) => {
		return activeTab == tab ? "d-block" : "d-none"
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
								<div className="fs-1 py-3 px-4 bg-success-subtle text-success rounded-circle">
									<MaterialSVG />
								</div>
							</div>
							{/* Total End */}
						</div>
					</div>
					{/* Data End */}

					{/* Weeks */}
					<div
						className="accordion shadow mb-5"
						id="accordionPanelsStayOpenExample">
						{syllabus.map((syllabus, key) => (
							<div
								key={key}
								className="accordion-item">
								<h2 className="accordion-header">
									<button
										className={`accordion-button ${
											!syllabus.isActive && "collapsed"
										}`}
										type="button"
										data-bs-toggle="collapse"
										data-bs-target={`#panelsStayOpen-${key}`}
										aria-expanded="true"
										aria-controls={`panelsStayOpen-${key}`}>
										<div className="d-flex justify-content-start flex-wrap w-100 me-2">
											<div className="me-2 mb-1">Week {syllabus.week}</div>
											<div className="border border-success rounded-pill text-success me-2 mb-1 px-2">
												{syllabus.range}
											</div>
											{syllabus.isActive && (
												<div className="border border-success rounded-pill text-success me-2 mb-1 px-2">
													Current
												</div>
											)}
										</div>
									</button>
								</h2>
								<div
									id={`panelsStayOpen-${key}`}
									className={`accordion-collapse collapse ${
										syllabus.isActive && "show"
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
																	<Btn3
																		btnText="view"
																		btnClass="btn-outline-success  btn-sm me-1"
																		onClick={() =>
																			handleMaterialTab(
																				material.title,
																				material.richText,
																				syllabus.week,
																				syllabus.isActive
																			)
																		}
																	/>
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

					{/* Materials Tab */}
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

					{/* Discussion Forum */}
					{materialTab == "Discussion Forum" && isActive && (
						<DiscussionForum
							{...props}
							sessionId={unitSession?.sessionId}
							unitId={unitSession?.unitId}
							week={week}
						/>
					)}
					{/* Discussion Forum End */}

					{/* Submission */}
					{(materialTab == "Written Assignment" ||
						materialTab == "Learning Reflection") &&
						isActive && (
							<Submission
								{...props}
								sessionId={unitSession?.sessionId}
								unitId={id}
								week={week}
								materialTab={materialTab}
							/>
						)}
					{/* Submission End */}
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
								<div className="fs-1 py-3 px-4 bg-success-subtle text-success rounded-circle">
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
									<th>#</th>
									<th></th>
									<th>Name</th>
									<th>Email</th>
									<th>Material</th>
									<th>Date Joined</th>
								</tr>
								{unit?.instructors?.map((instructor, key) => (
									<tr key={key}>
										<td>{key + 1}</td>
										<td>
											<Img
												src={instructor.avatar}
												className="rounded-circle"
												style={{ minWidth: "10px", minHeight: "10px" }}
												alt="Avatar"
											/>
										</td>
										<td>{instructor.name}</td>
										<td>{instructor.email}</td>
										<td>{instructor.materialName}</td>
										<td>{instructor.createdAt}</td>
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
									<th>Material</th>
									<th>Date Joined</th>
								</tr>
							</thead>
							<tbody>
								{unit.students
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
													style={{ minWidth: "25px", minHeight: "25px" }}
													alt="Avatar"
												/>
											</td>
											<td>{student.name}</td>
											<td>{student.email}</td>
											<td>{student.phone}</td>
											<td className="text-capitalize">{student.gender}</td>
											<td>{student.materialName}</td>
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
	)
}

export default show
