import React, { useEffect, useState } from "react"

import Btn from "@/components/Core/Btn"
import Img from "@/components/Core/Img"
import MyLink from "@/components/Core/MyLink"

import PersonSVG from "@/svgs/PersonSVG"
import CourseSVG from "@/svgs/CourseSVG"

const index = (props) => {
	// Get Courses
	const [courses, setCourses] = useState([])
	const [loading, setLoading] = useState()
	const [nameQuery, setNameQuery] = useState("")
	const [genderQuery, setGenderQuery] = useState("")
	const [dateQuery, setDateQuery] = useState("")

	useEffect(() => {
		// Set page
		props.setPage({ name: "Courses", path: ["courses"] })
		props.get("courses", setCourses)
	}, [])

	/*
	 * Delete
	 */
	const onDelete = (courseId) => {
		// Toggle loader
		setLoading(true)

		Axios.delete(`/api/courses/${courseId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Toggle loader
				setLoading(true)
				// Delete rows
				setCourses(courses.filter((course) => course.id != courseId))
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
								<span className="fs-4">{courses.length}</span>
								<h4>Total Courses</h4>
							</div>
							<div className="fs-1 py-3 px-4 bg-primary-subtle rounded-circle">
								<CourseSVG />
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
								<th colSpan="7"></th>
								<th className="text-end">
									<MyLink
										linkTo="/admin/courses/create"
										text="create"
									/>
								</th>
							</tr>
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
							{courses.map((course, key) => (
								<tr key={key}>
									<td>{key + 1}</td>
									<td>{course.name}</td>
									<td>{course.description}</td>
									<td>{course.departmentName}</td>
									<td>{course.facultyName}</td>
									<td>{course.duration}</td>
									<td className="text-success">{course.price}</td>
									<td className="text-end">
										<div className="d-flex">
											<MyLink
												linkTo={`/admin/courses/${course.id}/show`}
												text="view"
												className="btn-sm me-2"
											/>

											<MyLink
												linkTo={`/admin/courses/${course.id}/edit`}
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
																	Delete Course
																</h1>
																<button
																	type="button"
																	className="btn-close"
																	data-bs-dismiss="modal"
																	aria-label="Close"></button>
															</div>
															<div className="modal-body text-wrap">
																Are you sure you want to delete {course.name}.
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
																	onClick={() => onDelete(course.id)}>
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
