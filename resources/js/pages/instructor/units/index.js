import React, { useEffect, useState } from "react"

import Btn from "@/components/Core/Btn"
import Img from "@/components/Core/Img"
import MyLink from "@/components/Core/MyLink"

import PersonSVG from "@/svgs/PersonSVG"
import UnitSVG from "@/svgs/UnitSVG"

const index = (props) => {
	// Get Units
	const [units, setUnits] = useState([])
	const [loading, setLoading] = useState()
	const [nameQuery, setNameQuery] = useState("")
	const [genderQuery, setGenderQuery] = useState("")
	const [dateQuery, setDateQuery] = useState("")

	useEffect(() => {
		// Set page
		props.setPage({ name: "Units", path: ["units"] })
		props.get("units", setUnits)
	}, [])

	/*
	 * Delete
	 */
	const onDelete = (unitId) => {
		// Toggle loader
		setLoading(true)

		Axios.delete(`/api/units/${unitId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Toggle loader
				setLoading(true)
				// Delete rows
				setUnits(units.filter((unit) => unit.id != unitId))
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

				<br />

				<div className="table-responsive">
					<table className="table table-hover">
						<thead>
							<tr>
								<th colSpan="5"></th>
								<th className="text-end">
									<MyLink
										linkTo="/admin/units/create"
										text="add unit"
									/>
								</th>
							</tr>
							<tr>
								<td>#</td>
								<td>Name</td>
								<td>Description</td>
								<td>Instructor</td>
								<td>Credits</td>
								<td>Action</td>
							</tr>
						</thead>
						<tbody>
							{props.auth.courses?.map((course, key) => (
								<React.Fragment key={key}>
									{course.units.map((unit, key) => (
										<tr key={key}>
											<td>{key + 1}</td>
											<td>{unit.name}</td>
											<td>{unit.description}</td>
											<td>{unit.instructorName}</td>
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
								</React.Fragment>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

export default index
