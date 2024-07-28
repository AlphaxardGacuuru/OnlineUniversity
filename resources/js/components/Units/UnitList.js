import React, { useState } from "react"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"

import MyLink from "@/components/Core/MyLink"
import Btn from "@/components/Core/Btn"
import HeroIcon from "@/components/Core/HeroIcon"
import DeleteModal from "@/components/Core/DeleteModal"

import UnitSVG from "@/svgs/UnitSVG"

import PaginationLinks from "@/components/Core/PaginationLinks"

const UnitList = (props) => {
	const location = useLocation()

	const [loading, setLoading] = useState()

	/*
	 * Self Enroll
	 */
	const selfEnrollUnit = (unitId) => {
		// Show loader
		setLoading(unitId)

		Axios.put(`/api/students/${props.auth.id}`, {
			unitId: unitId,
			sessionId: props.session.id,
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
	 * Delete Unit
	 */
	const onDeleteUnit = (unitId) => {
		Axios.delete(`/api/units/${unitId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove row
				props.setUnits({
					meta: props.units.meta,
					links: props.units.links,
					data: props.units.data.filter((unit) => unit.id != unitId),
				})
			})
			.catch((err) => props.getErrors(err))
	}

	const isStudentAndEnrolledToCourse =
		props.auth.accountType == "student" &&
		props.auth.courseId == props.courseId &&
		props.auth.courseApprovedBy

	const doesntHaveBalance = parseFloat(props.hasBalance?.replace(/,/g, "")) <= 0

	return (
		<div className={props.activeTab}>
			{/* Data */}
			<div className="card shadow-sm mb-2 p-2">
				<div className="d-flex justify-content-between">
					{/* Total */}
					<div className="d-flex justify-content-between w-100 align-items-center mx-4">
						<div>
							<span className="fs-4">{props.units.meta?.total}</span>
							<h4>Total Units</h4>
						</div>
						<HeroIcon>
							<UnitSVG />
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
							onChange={(e) => props.setNameQuery(e.target.value)}
						/>
					</div>
					{/* Name End */}
					{/* Year */}
					<div className="flex-grow-1 me-2 mb-2">
						<input
							type="number"
							placeholder="Search by Year"
							className="form-control"
							onChange={(e) => props.setYearQuery(e.target.value)}
						/>
					</div>
					{/* Year End */}
					{/* Semester */}
					<div className="flex-grow-1 me-2 mb-2">
						<input
							type="number"
							placeholder="Search by Semester"
							className="form-control"
							onChange={(e) => props.setSemesterQuery(e.target.value)}
						/>
					</div>
					{/* Semester End */}
				</div>
			</div>
			{/* Filters End */}

			<br />

			{/* Table */}
			<div className="table-responsive mb-5 pb-2">
				<table className="table table-hover">
					<thead>
						{location.pathname.match("/admin") && (
							<tr>
								<th colSpan="6"></th>
								<th className="text-end">
									<MyLink
										linkTo={`/units/${props.courseId}/create`}
										text="add unit"
									/>
								</th>
							</tr>
						)}
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Code</th>
							<th>Year</th>
							<th>Semester</th>
							<th>Credits</th>
							<th>Action</th>
						</tr>
						{props.units.data?.map((unit, key) => (
							<tr
								key={key}
								className={`
									${
										unit.year == 1
											? "table-primary"
											: unit.year == 2
											? "table-warning"
											: unit.year == 3
											? "table-success"
											: "table-secondary"
									}
									${key == 0 && props.auth.id == props.userId ? "table-danger" : ""}
								`}>
								<td>{key + 1}</td>
								<td>{unit.name}</td>
								<td>{unit.code}</td>
								<td>{unit.year}</td>
								<td>{unit.semester}</td>
								<td>{unit.credits}</td>
								<td>
									<div className="d-flex justify-content-end">
										{props.auth.unitIds?.includes(unit.id) ||
										location.pathname.match("admin") ? (
											<div className="d-flex justify-content-end">
												<MyLink
													linkTo={`/units/${unit.id}/show`}
													text="view"
													className="btn-sm me-1"
												/>
												{location.pathname.match("admin") && (
													<MyLink
														linkTo={`/units/${unit.id}/edit`}
														text="edit"
														className="btn-sm me-1"
													/>
												)}
											</div>
										) : (
											<React.Fragment>
												{isStudentAndEnrolledToCourse &&
													doesntHaveBalance &&
													unit.year == props.session.year &&
													unit.semester == props.session.semester && (
														<div className="d-flex justify-content-end">
															<Btn
																text="self enroll"
																className="btn-sm btn-success me-2"
																onClick={() => selfEnrollUnit(unit.id)}
																loading={loading == unit.id}
															/>
														</div>
													)}
											</React.Fragment>
										)}

										{location.pathname.match("/admin/") &&
											location.pathname.match("/course/") && (
												<React.Fragment>
													<MyLink
														linkTo={`/units/${unit.id}/edit`}
														text="edit"
														className="btn-sm"
													/>

													<div className="mx-1">
														<DeleteModal
															index={`unit${key}`}
															model={unit}
															modelName="Unit"
															onDelete={onDeleteUnit}
														/>
													</div>
												</React.Fragment>
											)}
									</div>
								</td>
							</tr>
						))}
					</thead>
				</table>
				{/* Pagination Links */}
				<PaginationLinks
					list={props.units}
					getPaginated={props.getPaginated}
					setState={props.setUnits}
				/>
				{/* Pagination Links End */}
			</div>
			{/* Table End */}
		</div>
	)
}

export default UnitList
