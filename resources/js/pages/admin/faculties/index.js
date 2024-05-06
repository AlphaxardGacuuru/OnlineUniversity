import React, { useEffect, useState } from "react"

import MyLink from "@/components/Core/MyLink"
import DeleteModal from "@/components/Core/DeleteModal"

import FacultySVG from "@/svgs/FacultySVG"
import HeroIcon from "@/components/Core/HeroIcon"

const index = (props) => {
	// Get Faculties
	const [faculties, setFaculties] = useState(props.getLocalStorage("faculties"))
	const [loading, setLoading] = useState()

	useEffect(() => {
		// Set page
		props.setPage({ name: "Faculties", path: ["faculties"] })
		props.get("faculties", setFaculties, "faculties")
	}, [])

	/*
	 * Delete
	 */
	const onDeleteFaculty = (facultyId) => {
		// Toggle loader
		setLoading(true)

		Axios.delete(`/api/faculties/${facultyId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Toggle loader
				setLoading(true)
				// Delete rows
				setFaculties(faculties.filter((faculty) => faculty.id != facultyId))
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
								<span className="fs-4">{faculties.length}</span>
								<h4>Total Faculties</h4>
							</div>
							<HeroIcon>
								<FacultySVG />
							</HeroIcon>
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
								<th colSpan="3"></th>
								<th className="text-end">
									<MyLink
										linkTo="/faculties/create"
										text="add faculty"
									/>
								</th>
							</tr>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th>Date Founded</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{faculties.map((faculty, key) => (
								<tr key={key}>
									<td>{key + 1}</td>
									<td>{faculty.name}</td>
									<td>{faculty.createdAt}</td>
									<td className="text-end">
										<div className="d-flex">
											<MyLink
												linkTo={`/faculties/${faculty.id}/show`}
												text="view"
												className="btn-sm me-2"
											/>

											<MyLink
												linkTo={`/faculties/${faculty.id}/edit`}
												text="edit"
												className="btn-sm"
											/>

											<div className="mx-1">
												<DeleteModal
													index={`faculty${key}`}
													model={faculty}
													modelName="Faculty"
													onDelete={onDeleteFaculty}
												/>
											</div>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

export default index
