import React, { useEffect, useState } from "react"

import MyLink3 from "@/components/Core/MyLink3"
import Img from "@/components/Core/Img"

import UnitSVG from "@/svgs/UnitSVG"
import CourseSVG from "@/svgs/CourseSVG"
import MoneySVG from "@/svgs/MoneySVG"

const index = (props) => {
	const [tab, setTab] = useState("courses")
	const [courses, setCourses] = useState([])
	const [units, setUnits] = useState([])
	const [fees, setFees] = useState({})

	useEffect(() => {
		// Set page
		props.setPage({ name: "Student", path: ["student"] })
		props.get(`courses/by-user-id/${props.auth.id}`, setCourses)
		props.get(`units/by-user-id/${props.auth.id}`, setUnits)
		props.get(`fee-statements/${props.auth.id}`, setFees)
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
					<h6>{props.auth.phone}</h6>
					<h6>{props.auth.gender}</h6>
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
						My Units
					</div>
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"fee-statements"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("fee-statements")}>
						My Fee Statements
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
								<div className="fs-1 py-3 px-4 bg-success-subtle text-success rounded-circle">
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
												<MyLink3
													linkTo={`/student/courses/${course.id}/show`}
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
				{/* Courses Tab End */}

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
									<th>#</th>
									<th>Name</th>
									<th>Description</th>
									<th>Student</th>
									<th>Credits</th>
									<th>Action</th>
								</tr>
								{units.map((unit, key) => (
									<tr key={key}>
										<td>{key + 1}</td>
										<td>{unit.name}</td>
										<td>{unit.description}</td>
										<td>{unit.studentName}</td>
										<td>{unit.credits}</td>
										<td>
											<div className="d-flex justify-content-end">
												<MyLink3
													linkTo={`/student/units/${unit.id}/show`}
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

				{/* Fee Statements Tab */}
				<div className={activeTab("fee-statements")}>
					{/* Data */}
					<div className="card shadow-sm p-2">
						<div className="d-flex justify-content-between">
							{/* Total */}
							<div className="d-flex justify-content-between w-100 align-items-center mx-4">
								<div>
									<span className="fs-4 text-success">KES {fees.paid}</span>
									<h4>Total Fees Paid</h4>
								</div>
								<div className="fs-1 py-3 px-4 bg-success-subtle text-success rounded-circle">
									<MoneySVG />
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
									<th>Type</th>
									<th>Date</th>
									<th>Debit (KES)</th>
									<th>Credit (KES)</th>
									<th>Balance (KES)</th>
								</tr>
							</thead>
							<tbody>
								{fees.statement?.map((feeStatement, key) => (
									<tr key={key}>
										<td>{key + 1}</td>
										<td>{feeStatement.type}</td>
										<td>{feeStatement.created_at}</td>
										<td className="text-warning">
											{feeStatement.debit?.toLocaleString()}
										</td>
										<td className="text-success">
											{feeStatement.credit?.toLocaleString()}
										</td>
										<td
											className={
												feeStatement.balance > 0
													? "text-warning"
													: "text-success"
											}>
											{feeStatement.balance?.toLocaleString()}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					{/* Table End */}
				</div>
				{/* Fee Statements Tab End */}
			</div>
		</div>
	)
}

export default index
