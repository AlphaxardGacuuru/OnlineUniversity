import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"

import MyLink from "@/components/Core/MyLink"
import DeleteModal from "@/components/Core/DeleteModal"

import CourseSVG from "@/svgs/CourseSVG"
import HeroIcon from "../Core/HeroIcon"

import PaginationLinks from "@/components/Core/PaginationLinks"

const CourseList = (props) => {
	const location = useLocation()

	const [faculties, setFaculties] = useState([])
	const [departments, setDepartments] = useState([])

	useEffect(() => {
		props.get("faculties", setFaculties)
		props.get("departments", setDepartments)
	}, [])

	/*
	 * Delete Course
	 */
	const onDeleteCourse = (courseId) => {
		Axios.delete(`/api/courses/${courseId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove row
				props.setCourses({
					meta: props.courses.meta,
					links: props.courses.links,
					data: props.courses.data.filter((course) => course.id != courseId),
				})
			})
			.catch((err) => props.getErrors(err))
	}

	return (
		<div className={props.activeTab}>
			{/* Data */}
			<div className="card shadow-sm p-2">
				<div className="d-flex justify-content-between">
					{/* Total */}
					<div className="d-flex justify-content-between w-100 align-items-center mx-4">
						<div>
							<span className="fs-4">{props.courses.meta?.total}</span>
							<h4>Total Courses</h4>
						</div>
						<HeroIcon>
							<CourseSVG />
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
					{/* Faculty */}
					<div className="flex-grow-1 me-2 mb-2">
						<select
							id=""
							type="text"
							name="name"
							placeholder="Search by Faculty"
							className="form-control me-2"
							onChange={(e) => props.setFacultyQuery(e.target.value)}>
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
							onChange={(e) => props.setDepartmentQuery(e.target.value)}>
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

			{/* Table */}
			<div className="table-responsive mb-5 pb-2">
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
						{props.courses.data?.map((course, key) => (
							<tr key={key}>
								<td>{key + 1}</td>
								<td>{course.name}</td>
								<td>{course.description}</td>
								<td>{course.facultyName}</td>
								<td>{course.departmentName}</td>
								<td>{course.duration}</td>
								<td className="text-success">{course.price}</td>
								<td className="text-end">
									<div className="d-flex">
										<MyLink
											linkTo={`/courses/${course.id}/show`}
											text="view"
											className="btn-sm me-2"
										/>

										{location.pathname.match("/admin/") && (
											<React.Fragment>
												<MyLink
													linkTo={`/courses/${course.id}/edit`}
													text="edit"
													className="btn-sm"
												/>

												<div className="mx-1">
													<DeleteModal
														index={`course${key}`}
														model={course}
														modelName="Course"
														onDelete={onDeleteCourse}
													/>
												</div>
											</React.Fragment>
										)}
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{/* Table End */}
				{/* Pagination Links */}
				<PaginationLinks
					list={props.courses}
					getPaginated={props.getPaginated}
					setState={props.setCourses}
				/>
				{/* Pagination Links End */}
			</div>
		</div>
	)
}

export default CourseList
