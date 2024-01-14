import React, { useEffect, useState } from "react"

import Btn2 from "@/components/Core/Btn2"
import Img from "@/components/Core/Img"
import MyLink2 from "@/components/Core/MyLink2"

import PersonSVG from "@/svgs/PersonSVG"
import ResourceSVG from "@/svgs/ResourceSVG"

const index = (props) => {
	// Get Resources
	const [resources, setResources] = useState([])
	const [loading, setLoading] = useState()
	const [nameQuery, setNameQuery] = useState("")

	useEffect(() => {
		// Set page
		props.setPage({ name: "Resources", path: ["resources"] })
		props.get("resources", setResources)
	}, [])

	/*
	 * View Resource
	 */
	var view = (link) => {
		window.open(link, "_blank")
	}

	/*
	 * Delete
	 */
	const onDelete = (resourceId) => {
		// Toggle loader
		setLoading(true)

		Axios.delete(`/api/resources/${resourceId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Toggle loader
				setLoading(true)
				// Delete rows
				setResources(resources.filter((resource) => resource.id != resourceId))
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
								<span className="fs-4">{resources.length}</span>
								<h4>Total Resources</h4>
							</div>
							<div className="fs-1 py-3 px-4 bg-danger-subtle text-danger rounded-circle">
								<ResourceSVG />
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
								<th colSpan="2"></th>
								<th className="text-end">
									<MyLink2
										linkTo="/instructor/resources/create"
										text="add resource"
									/>
								</th>
							</tr>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{resources.map((resource, key) => (
								<tr key={key}>
									<td>{key + 1}</td>
									<td>{resource.name}</td>
									<td className="text-end">
										<div className="d-flex">
											<Btn2
												btnText="view"
												btnClass="btn-outline-danger btn-sm me-2"
												onClick={() => view(resource.link)}
											/>

											<MyLink2
												linkTo={`/instructor/resources/${resource.id}/edit`}
												text="edit"
												className="btn-sm"
											/>

											<div className="mx-1">
												{/* Confirm Delete Modal End */}
												<div
													className="modal fade"
													id={`deleteModal${key}`}
													tabIndex="-1"
													aria-labelledby="deleteModalLabel"
													aria-hidden="true">
													<div className="modal-dialog">
														<div className="modal-content">
															<div className="modal-header">
																<h1
																	id="deleteModalLabel"
																	className="modal-title fs-5 text-danger">
																	Delete Resource
																</h1>
																<button
																	type="button"
																	className="btn-close"
																	data-bs-dismiss="modal"
																	aria-label="Close"></button>
															</div>
															<div className="modal-body text-wrap">
																Are you sure you want to delete {resource.name}.
															</div>
															<div className="modal-footer justify-content-between">
																<button
																	type="button"
																	className="btn btn-light rounded-pill"
																	data-bs-dismiss="modal">
																	Close
																</button>
																<button
																	type="button"
																	className="btn btn-danger rounded-pill"
																	data-bs-dismiss="modal"
																	onClick={() => onDelete(resource.id)}>
																	Delete
																</button>
															</div>
														</div>
													</div>
												</div>
												{/* Confirm Delete Modal End */}

												{/* Button trigger modal */}
												<button
													type="button"
													className="btn btn-sm btn-outline-danger rounded-pill"
													data-bs-toggle="modal"
													data-bs-target={`#deleteModal${key}`}>
													Delete
												</button>
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
