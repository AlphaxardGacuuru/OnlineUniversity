import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import MyLink from "@/components/Core/MyLink"
import Img from "@/components/Core/Img"

import UnitSVG from "@/svgs/UnitSVG"
import CourseSVG from "@/svgs/CourseSVG"

const index = (props) => {
	const [tab, setTab] = useState("courses")

	const [dateQuery, setDateQuery] = useState("")

	useEffect(() => {
		// Set page
		props.setPage({ name: "Instructor", path: ["instructor"] })
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
				<div className="card mb-2 p-4 text-center">
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
					<h6>{props.auth.phone}</h6>
					<h6>{props.auth.gender}</h6>
					<h6 className="text-capitalize">{props.auth.accountType}</h6>
				</div>
			</div>
			<div className="col-sm-8">
				{/* Tabs */}
				<div className="d-flex justify-content-between flex-wrap mb-2">
					<div
						className={`card flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"courses"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("courses")}>
						My Courses
					</div>
					<div
						className={`card flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"units"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("units")}>
						My Units
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
									<span className="fs-4">{props.auth.courses?.length}</span>
									<h4>Total Courses</h4>
								</div>
								<div className="fs-1 py-3 px-4 bg-danger-subtle rounded-circle">
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
									<th>Duration (M0nths)</th>
									<th>Price (KES)</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{props.auth.courses?.map((course, key) => (
									<tr key={key}>
										<td>{key + 1}</td>
										<td>{course.name}</td>
										<td>{course.description}</td>
										<td>{course.departmentName}</td>
										<td>{course.facultyName}</td>
										<td>{course.duration}</td>
										<td className="text-success">{course.price}</td>
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
									<span className="fs-4">{props.auth.units?.length}</span>
									<h4>Total Units</h4>
								</div>
								<div className="fs-1 py-3 px-4 bg-danger-subtle rounded-circle">
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
									<td>Name</td>
									<td>Description</td>
									<td>Professor</td>
									<td>Credits</td>
									<td>Action</td>
								</tr>
								{props.auth.units?.map((unit, key) => (
									<tr key={key}>
										<td>{key + 1}</td>
										<td>{unit.name}</td>
										<td>{unit.description}</td>
										<td>{unit.professorName}</td>
										<td>{unit.credits}</td>
										<td>
											<div className="d-flex justify-content-end">
												<MyLink
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