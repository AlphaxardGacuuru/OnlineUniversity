import React, { useEffect, useState } from "react"

import Btn3 from "@/components/Core/Btn3"
import Img from "@/components/Core/Img"
import MyLink3 from "@/components/Core/MyLink3"

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
							<div className="fs-1 py-3 px-4 bg-success-subtle text-success rounded-circle">
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
			</div>
		</div>
	)
}

export default index
