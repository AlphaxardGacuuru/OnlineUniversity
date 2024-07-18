import React, { useEffect, useState } from "react"

import Btn from "@/components/Core/Btn"
import Img from "@/components/Core/Img"
import HeroIcon from "@/components/Core/HeroIcon"

import EnrollmentSVG from "@/svgs/EnrollmentSVG"

import PaginationLinks from "@/components/Core/PaginationLinks"

const enrollments = (props) => {
	// Get Enrollments
	const [enrollments, setEnrollments] = useState(
		props.getLocalStorage("enrollments")
	)
	const [loading, setLoading] = useState()

	const [nameQuery, setNameQuery] = useState("")
	const [statusQuery, setStatusQuery] = useState("")

	useEffect(() => {
		// Set page
		props.setPage({ name: "Enrollments", path: ["enrollments"] })
	}, [])

	useEffect(() => {
		props.getPaginated(
			`enrollments?
			name=${nameQuery}&
			deniedBy=${statusQuery}`,
			setEnrollments,
			"enrollments"
		)
	}, [nameQuery, statusQuery])

	return (
		<div className="row">
			<div className="col-sm-12">
				{/* Data */}
				<div className="card shadow-sm p-2">
					<div className="d-flex justify-content-between">
						{/* Total */}
						<div className="d-flex justify-content-between w-100 align-items-center mx-4">
							<div>
								<span className="fs-4">{enrollments.meta?.total}</span>
								<h4>Total Enrollments</h4>
							</div>
							<HeroIcon>
								<EnrollmentSVG />
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
						{/* Status */}
						<div className="flex-grow-1 me-2 mb-2">
							<select
								className="form-control me-2"
								onChange={(e) => setStatusQuery(e.target.value)}>
								<option value="">Search by Status</option>
								<option value="denied">Declined</option>
							</select>
						</div>
						{/* Status End */}
					</div>
				</div>
				{/* Filters End */}

				<br />

				<div className="table-responsive mb-5 pb-2">
					<table className="table table-hover">
						<thead>
							<tr>
								<th>#</th>
								<th></th>
								<th>Name</th>
								<th>Email</th>
								<th>Gender</th>
								<th>Course</th>
								<th>Approved By</th>
								<th>Declined By</th>
								<th>Status</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{enrollments.data?.map((enrollment, key) => (
								<tr key={key}>
									<td>{props.iterator(key, enrollments)}</td>
									<td>
										<Img
											src={enrollment.userAvatar}
											className="rounded-circle"
											style={{ minWidth: "3em", height: "3em" }}
											alt="Avatar"
										/>
									</td>
									<td>{enrollment.userName}</td>
									<td>{enrollment.userEmail}</td>
									<td className="text-capitalize">{enrollment.userGender}</td>
									<td>{enrollment.courseName}</td>
									<td>{enrollment.approvedBy}</td>
									<td>{enrollment.deniedBy}</td>
									<td>
										<span
											className={`${
												enrollment.approvedBy
													? "bg-success-subtle"
													: enrollment.deniedBy
													? "bg-danger-subtle"
													: "bg-warning-subtle"
											} rounded-pill py-2 px-4`}>
											{enrollment.approvedBy
												? "Approved"
												: enrollment.deniedBy
												? "Approved"
												: "Pending"}
										</span>
									</td>
									<td className="text-end">
										<div className="d-flex justify-content-end">
											<Btn
												text="approve"
												className="btn-sm me-1"
												onClick={() => onApprove(enrollment.id)}
											/>
											<Btn
												text="decline"
												className="btn-sm btn-danger"
												onClick={() => onDecline(enrollment.id)}
											/>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					{/* Pagination Links */}
					<PaginationLinks
						list={enrollments}
						getPaginated={props.getPaginated}
						setState={setEnrollments}
					/>
					{/* Pagination Links End */}
				</div>
			</div>
		</div>
	)
}

export default enrollments
