import React, { useEffect, useState } from "react"

import Img from "@/components/Core/Img"
import MyLink from "@/components/Core/MyLink"

import HeroIcon from "@/components/Core/HeroIcon"
import PaginationLinks from "@/components/Core/PaginationLinks"
import DeleteModal from "@/components/Core/DeleteModal"

import StaffSVG from "@/svgs/StaffSVG"

const index = (props) => {
	// Get Staff
	const [staff, setStaff] = useState(props.getLocalStorage("staff"))
	const [roles, setRoles] = useState([])
	const [loading, setLoading] = useState()

	const [nameQuery, setNameQuery] = useState("")
	const [genderQuery, setGenderQuery] = useState("")
	const [roleQuery, setRoleQuery] = useState("")

	useEffect(() => {
		// Set page
		props.setPage({ name: "Staff", path: ["staff"] })
		props.get("roles?idAndName=true", setRoles)
	}, [])

	useEffect(() => {
		props.getPaginated(
			`staff?
			name=${nameQuery}&
			gender=${genderQuery}&
			roleId=${roleQuery}`,
			setStaff,
			"staff"
		)
	}, [nameQuery, genderQuery, roleQuery])

	/*
	 * Delete
	 */
	const onDeleteStaff = (staffId) => {
		// Toggle loader
		setLoading(true)

		Axios.delete(`/api/staff/${staffId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Toggle loader
				setLoading(true)
				// Delete rows
				setStaff(staff.filter((staff) => staff.id != staffId))
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
								<span className="fs-4">{staff.meta?.total}</span>
								<h4>Total Staff</h4>
							</div>
							<HeroIcon>
								<StaffSVG />
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
						{/* Role */}
						<div className="flex-grow-1 me-2 mb-2">
							<select
								id=""
								type="text"
								name="name"
								placeholder="Search by Role"
								className="form-control me-2"
								onChange={(e) => setRoleQuery(e.target.value)}>
								<option value="">Search by Role</option>
								{roles.map((role, key) => (
									<option
										key={key}
										value={role.id}>
										{role.name}
									</option>
								))}
							</select>
						</div>
						{/* Role End */}
					</div>
				</div>
				{/* Filters End */}

				<br />

				<div className="table-responsive mb-5 pb-2">
					<table className="table table-hover">
						<thead>
							<tr>
								<th colSpan="8"></th>
								<th className="text-end">
									<MyLink
										linkTo="/staff/create"
										text="add staff"
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
								<th>Role</th>
								<th>Date Joined</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{staff.data?.map((staff, key) => (
								<tr key={key}>
									<td>{key + 1}</td>
									<td>
										<Img
											src={staff.avatar}
											className="rounded-circle"
											width="25px"
											height="25px"
											alt="Avatar"
										/>
									</td>
									<td>{staff.name}</td>
									<td>{staff.email}</td>
									<td>{staff.phone}</td>
									<td className="text-capitalize">{staff.gender}</td>
									<td>
										{staff.roleNames.map((role, key) => (
											<span key={key}>
												{key != 0 && <span className="mx-1">|</span>}
												{role}
											</span>
										))}
									</td>
									<td>{staff.createdAt}</td>
									<td className="text-end">
										<div className="d-flex">
											<MyLink
												linkTo={`/staff/${staff.id}/edit`}
												text="edit"
												className="btn-sm"
											/>

											<div className="mx-1">
												<DeleteModal
													index={`staff${key}`}
													model={staff}
													modelName="Staff"
													message={`Are you sure you want to delete ${staff.name}`}
													onDelete={onDeleteStaff}
												/>
											</div>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					{/* Pagination Links */}
					<PaginationLinks
						list={staff}
						getPaginated={props.getPaginated}
						setState={setStaff}
					/>
					{/* Pagination Links End */}
				</div>
			</div>
		</div>
	)
}

export default index
