import React from 'react'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'

import MyLink from "@/components/Core/MyLink"
import Img from "@/components/Core/Img"
import Btn from "@/components/Core/Btn"

import HeroIcon from "@/components/Core/HeroIcon"

import MaterialSVG from "@/svgs/MaterialSVG"

const Material = (props) => {
	const location = useLocation()

	/*
	 * Delete Material
	 */
	const onDeleteMaterial = (materialId) => {
		Axios.delete(`/api/materials/${materialId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove row
				props.get(`materials/by-unit-id/${props.courseId}`, props.setSyllabus)
			})
			.catch((err) => props.getErrors(err))
	}

	return (
		<div>
			{/* Data */}
			<div className="card shadow mb-2 p-2">
				<div className="d-flex justify-content-between">
					{/* Total */}
					<div className="d-flex justify-content-between w-100 align-items-center mx-4">
						<div>
							<span className="fs-4">{props.syllabus.length}</span>
							<h4>Total Weeks</h4>
						</div>
						<HeroIcon>
							<MaterialSVG />
						</HeroIcon>
					</div>
					{/* Total End */}
				</div>
			</div>
			{/* Data End */}

			{/* Weeks */}
			<div className="card shadow mb-2">
				<div className="d-flex justify-content-between p-2 px-4 align-items-center">
					<h5>Learning Resources</h5>
					{location.pathname.match("/admin/") && (
						<div>
							<MyLink
								linkTo={`/materials/${props.courseId}/create`}
								text="add learning resources"
							/>
						</div>
					)}
				</div>
			</div>
			<div
				className="accordion shadow mb-5"
				id="accordionPanelsStayOpenExample">
				{props.syllabus.map((syllabus, key) => (
					<div
						key={key}
						className="accordion-item">
						<h2 className="accordion-header">
							<button
								className={`accordion-button ${
									!syllabus.isActive && "collapsed"
								}`}
								type="button"
								data-bs-toggle="collapse"
								data-bs-target={`#panelsStayOpen-${key}`}
								aria-expanded="true"
								aria-controls={`panelsStayOpen-${key}`}>
								<div className="d-flex justify-content-start w-100 me-2">
									<div className="me-2">Week {syllabus.week}</div>
									<div
										className={`${
											location.pathname.match("/admin/")
												? "border-primary text-primary"
												: location.pathname.match("/instructor/")
												? "border-danger text-danger"
												: "border-success text-success"
										} border rounded-pill me-2 px-2`}>
										{syllabus.range}
									</div>
									{syllabus.isActive && (
										<div
											className={`${
												location.pathname.match("/admin/")
													? "border-primary text-primary"
													: location.pathname.match("/instructor/")
													? "border-danger text-danger"
													: "border-success text-success"
											} border rounded-pill me-2 px-2`}>
											Current
										</div>
									)}
								</div>
							</button>
						</h2>
						<div
							id={`panelsStayOpen-${key}`}
							className={`accordion-collapse collapse ${
								syllabus.isActive && "show"
							}`}>
							<div className="accordion-body p-1">
								{/* Table */}
								<div className="table-responsive">
									<table className="table table-hover table-borderless">
										<tbody>
											{syllabus.materials.map((material, key) => (
												<tr key={key}>
													<td>{material.title}</td>
													<td>
														<div className="d-flex justify-content-end">
															<Btn
																text="view"
																className="btn-sm me-1"
																onClick={() =>
																	props.handleMaterialTab(
																		material.title,
																		material.richText,
																		syllabus.week,
																		syllabus.isActive
																	)
																}
															/>

															{location.pathname.match("/admin/") && (
																<React.Fragment>
																	<MyLink
																		linkTo={`/materials/${material.id}/edit`}
																		text="edit"
																		className="btn-sm"
																	/>
																	<div className="mx-1">
																		{/* Confirm Delete Modal End */}
																		<div
																			className="modal fade"
																			id={`deleteMaterialModal${material.id}`}
																			tabIndex="-1"
																			aria-labelledby="deleteModalLabel"
																			aria-hidden="true">
																			<div className="modal-dialog">
																				<div className="modal-content">
																					<div className="modal-header">
																						<h1
																							id="deleteModalLabel"
																							className="modal-title fs-5 text-danger">
																							Delete Learning Resource
																						</h1>
																						<button
																							type="button"
																							className="btn-close"
																							data-bs-dismiss="modal"
																							aria-label="Close"></button>
																					</div>
																					<div className="modal-body text-start text-wrap">
																						Are you sure you want to delete{" "}
																						{material.title}.
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
																							onClick={() =>
																								onDeleteMaterial(material.id)
																							}>
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
																			data-bs-target={`#deleteMaterialModal${material.id}`}>
																			Delete
																		</button>
																	</div>
																</React.Fragment>
															)}
														</div>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
								{/* Table End */}
							</div>
						</div>
					</div>
				))}
			</div>
			{/* Weeks End */}
		</div>
	)
}

export default Material