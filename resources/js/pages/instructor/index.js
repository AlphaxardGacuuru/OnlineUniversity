import React, { useEffect, useState } from "react"

import MyLink2 from "@/components/Core/MyLink2"
import Img from "@/components/Core/Img"

import UnitSVG from "@/svgs/UnitSVG"
import CourseSVG from "@/svgs/CourseSVG"

const index = (props) => {
	const [tab, setTab] = useState("courses")
	const [courses, setCourses] = useState([])
	const [units, setUnits] = useState([])

	useEffect(() => {
		// Set page
		props.setPage({ name: "Instructor", path: ["instructor"] })
		props.get(`courses/by-user-id/${props.auth.id}`, setCourses)
		props.get(`units/by-user-id/${props.auth.id}`, setUnits)
	}, [])

	const active = (activeTab) => {
		return activeTab == tab ? "bg-light" : "bg-secondary-subtle"
	}

	const activeTab = (activeTab) => {
		return activeTab == tab ? "d-block" : "d-none"
	}

	return (
		<div className="row">
			<div className="col-sm-4">
				<div className="card shadow mb-2 p-4 text-center">
					<div className="m-3">
						<Img
							src={props.auth.avatar}
							className="rounded-circle"
							width="100px"
							height="100px"
							alt="Avatar"
						/>
					</div>
					<h4>{props.auth.name}</h4>
					<h6>{props.auth.email}</h6>
					<h6 className="text-capitalize">{props.auth.accountType}</h6>
					<h6>{props.auth.facultyName}</h6>
					<h6>{props.auth.departmentName}</h6>
				</div>
			</div>
			<div className="col-sm-8">
				{/* Tabs */}
				<div className="d-flex justify-content-between flex-wrap mb-2">
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"courses"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("courses")}>
						My Courses
					</div>
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"units"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("units")}>
						Units
					</div>
				</div>
				{/* Tabs End */}

				{/* Courses Tab */}
				<div className={activeTab("courses")}>
					{/* Data */}
					<div className="card shadow-sm p-2">
						<div className="d-flex justify-content-between">
							{/* Total */}
							<div className="d-flex justify-content-between w-100 align-items-center mx-4">
								<div>
									<span className="fs-4">{courses.length}</span>
									<h4>Total Courses</h4>
								</div>
								<div className="fs-1 py-3 px-4 bg-danger-subtle text-danger rounded-circle">
									<CourseSVG />
								</div>
							</div>
							{/* Total End */}
						</div>
					</div>
					{/* Data End */}

					<br />

					{/* Table */}
					<div className="table-responsive">
						<table className="table table-hover">
							<thead>
								<tr>
									<th>#</th>
									<th>Name</th>
									<th>Description</th>
									<th>Department</th>
									<th>Faculty</th>
									<th>Duration (Months)</th>
									<th>Price (KES)</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{courses.map((course, key) => (
									<tr key={key}>
										<td>{key + 1}</td>
										<td>{course.name}</td>
										<td>{course.description}</td>
										<td>{course.departmentName}</td>
										<td>{course.facultyName}</td>
										<td>{course.duration}</td>
										<td className="text-success">
											{parseFloat(course.price).toLocaleString()}
										</td>
										<td className="text-end">
											<div className="d-flex">
												<MyLink2
													linkTo={`/instructor/courses/${course.id}/show`}
													text="view"
													className="btn-sm me-2"
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
				{/* Departments Tab End */}

				{/* Units Tab */}
				<div className={activeTab("units")}>
					{/* Data */}
					<div className="card shadow-sm mb-2 p-2">
						<div className="d-flex justify-content-between">
							{/* Total */}
							<div className="d-flex justify-content-between w-100 align-items-center mx-4">
								<div>
									<span className="fs-4">{units.length}</span>
									<h4>Total Units</h4>
								</div>
								<div className="fs-1 py-3 px-4 bg-danger-subtle text-danger rounded-circle">
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
									<th>#</th>
									<th>Name</th>
									<th>Description</th>
									<th>Instructor</th>
									<th>Credits</th>
									<th>Action</th>
								</tr>
								{units.map((unit, key) => (
									<tr
										key={key}
										className={key == 0 ? "table-danger" : ""}>
										<td>{key + 1}</td>
										<td>{unit.name}</td>
										<td>{unit.description}</td>
										<td>{unit.instructorName}</td>
										<td>{unit.credits}</td>
										<td>
											<div className="d-flex justify-content-end">
												<MyLink2
													linkTo={`/instructor/units/${unit.id}/show`}
													text="view"
													className="btn-sm me-2"
												/>
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
			</div>
		</div>
	)
}

export default index
