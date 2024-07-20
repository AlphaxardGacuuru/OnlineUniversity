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
	const [loading1, setLoading1] = useState()
	const [loading2, setLoading2] = useState()

	const [nameQuery, setNameQuery] = useState("")
	const [statusQuery, setStatusQuery] = useState("")

	useEffect(() => {
		// Set page
		props.setPage({ name: "Enrollments", path: ["enrollments"] })
	}, [])

	const getEnrollments = () => {
		props.getPaginated(
			`enrollments?
			name=${nameQuery}&
			status=${statusQuery}`,
			setEnrollments,
			"enrollments"
		)
	}

	useEffect(() => {
		getEnrollments()
	}, [nameQuery, statusQuery])

	/*
	 * Approve
	 */
	const onApprove = (userId, enrollmentId, action) => {
		setLoading1(true)

		Axios.put(`api/users/${userId}`, {
			enrollmentId: enrollmentId,
			approved: true,
			action: action,
		})
			.then((res) => {
				setLoading1(false)
				props.setMessages([res.data.message])
				getEnrollments()
			})
			.catch((err) => {
				setLoading1(false)
				props.getErrors(err)
			})
	}

	/*
	 * Deny
	 */
	const onDeny = (userId, enrollmentId, action) => {
		setLoading2(true)

		Axios.put(`api/users/${userId}`, {
			enrollmentId: enrollmentId,
			denied: true,
			action: action,
		})
			.then((res) => {
				setLoading2(false)
				props.setMessages([res.data.message])
				getEnrollments()
			})
			.catch((err) => {
				setLoading2(false)
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
								<option value="pending">Pending</option>
								<option value="approved">Approved</option>
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
										<div
											className={`${
												enrollment.approvedBy
													? "bg-success-subtle"
													: enrollment.deniedBy
													? "bg-danger-subtle"
													: "bg-warning-subtle"
											} rounded-pill text-center py-1 px-3`}>
											{enrollment.approvedBy
												? "Approved"
												: enrollment.deniedBy
												? "Denied"
												: "Pending"}
										</div>
									</td>
									<td className="text-end">
										<div className="d-flex justify-content-end">
											{!enrollment.deniedBy && (
												<Btn
													text={enrollment.approvedBy ? "Unapprove" : "Approve"}
													className="btn-sm me-1"
													onClick={() =>
														onApprove(
															enrollment.userId,
															enrollment.id,
															enrollment.approvedBy ? false : true
														)
													}
													loading={loading1}
												/>
											)}
											{!enrollment.approvedBy && (
												<Btn
													text={enrollment.deniedBy ? "Undeny" : "Deny"}
													className="btn-sm btn-danger"
													onClick={() =>
														onDeny(
															enrollment.userId,
															enrollment.id,
															enrollment.deniedBy ? false : true
														)
													}
													loading={loading2}
												/>
											)}
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
