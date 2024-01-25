import React, { useEffect, useState } from "react"

import MyLink3 from "@/components/Core/MyLink3"
import PaginationLinks from "@/components/Core/PaginationLinks"

import PersonSVG from "@/svgs/PersonSVG"
import CourseSVG from "@/svgs/CourseSVG"

const index = (props) => {
	// Get Courses
	const [courses, setCourses] = useState([])
	const [faculties, setFaculties] = useState([])
	const [departments, setDepartments] = useState([])

	const [nameQuery, setNameQuery] = useState("")
	const [facultyQuery, setFacultyQuery] = useState("")
	const [departmentQuery, setDepartmentQuery] = useState("")

	useEffect(() => {
		// Set page
		props.setPage({ name: "Courses", path: ["courses"] })
		props.getPaginated("courses", setCourses)
		props.get("faculties", setFaculties)
		props.get("departments", setDepartments)
	}, [])

	return (
		<div className="row">
			<div className="col-sm-12">
				{/* Data */}
				<div className="card shadow-sm p-2">
					<div className="d-flex justify-content-between">
						{/* Total */}
						<div className="d-flex justify-content-between w-100 align-items-center mx-4">
							<div>
								<span className="fs-4">{courses.meta?.total}</span>
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
						{/* Faculty */}
						<div className="flex-grow-1 me-2 mb-2">
							<select
								id=""
								type="text"
								name="name"
								placeholder="Search by Faculty"
								className="form-control me-2"
								onChange={(e) => setFacultyQuery(e.target.value)}>
								<option value="">Search by Faculty</option>
								{faculties.map((faculty, key) => (
									<option
										key={key}
										value={faculty.id}>
										{faculty.name}
									</option>
								))}
							</select>
						</div>
						{/* Faculty End */}
						{/* Department */}
						<div className="flex-grow-1 me-2 mb-2">
							<select
								id=""
								type="text"
								name="name"
								placeholder="Search by Gender"
								className="form-control me-2"
								onChange={(e) => setDepartmentQuery(e.target.value)}>
								<option value="">Search by Department</option>
								{departments.map((department, key) => (
									<option
										key={key}
										value={department.id}>
										{department.name}
									</option>
								))}
							</select>
						</div>
						{/* Department End */}
					</div>
				</div>
				{/* Filters End */}

				<br />

				<div className="table-responsive mb-5">
					<table className="table table-hover">
						<thead>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th>Description</th>
								<th>Faculty</th>
								<th>Department</th>
								<th>Duration (Months)</th>
								<th>Price (KES)</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{courses.data
								?.filter((course) => {
									var name = course.name.toLowerCase()
									var query = nameQuery.toLowerCase()

									return name.match(query)
								})
								.filter((course) => {
									if (facultyQuery) {
										return course.facultyId == facultyQuery
									} else {
										return true
									}
								})
								.filter((course) => {
									if (departmentQuery) {
										return course.departmentId == departmentQuery
									} else {
										return true
									}
								})
								.map((course, key) => (
									<tr key={key}>
										<td>{props.iterator(key, courses)}</td>
										<td>{course.name}</td>
										<td>{course.description}</td>
										<td>{course.facultyName}</td>
										<td>{course.departmentName}</td>
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
					{/* Pagination Links */}
					<PaginationLinks
						list={courses}
						getPaginated={props.getPaginated}
						setState={setCourses}
					/>
					{/* Pagination Links End */}
				</div>
			</div>
		</div>
	)
}

export default index
