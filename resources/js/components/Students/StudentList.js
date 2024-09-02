import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"

import MyLink from "@/components/Core/MyLink"
import Img from "@/components/Core/Img"
import DeleteModal from "@/components/Core/DeleteModal"

import HeroIcon from "@/components/Core/HeroIcon"

import PersonSVG from "@/svgs/PersonSVG"
import PaginationLinks from "@/components/Core/PaginationLinks"

const StudentList = (props) => {
	const location = useLocation()

	const [faculties, setFaculties] = useState([])
	const [departments, setDepartments] = useState([])

	useEffect(() => {
		props.get("faculties?idAndName=true", setFaculties)
		props.get("departments?idAndName=true", setDepartments)
	}, [])

	/*
	 * Delete Student
	 */
	const onDeleteStudent = (studentId) => {
		Axios.delete(`/api/students/${studentId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove row
				props.setStudents({
					meta: props.students.meta,
					links: props.students.links,
					data: props.students.data.filter(
						(students) => students.id != studentId
					),
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
							<span className="fs-4">{props.students.meta?.total}</span>
							<h4>Total Students</h4>
						</div>
						<HeroIcon>
							<PersonSVG />
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
					{/* Gender */}
					<div className="flex-grow-1 me-2 mb-2">
						<select
							id=""
							type="text"
							name="name"
							placeholder="Search by Gender"
							className="form-control me-2"
							onChange={(e) => props.setGenderQuery(e.target.value)}>
							<option value="">Search by Gender</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
						</select>
					</div>
					{/* Gender End */}
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

			<div className="table-responsive mb-5 pb-2">
				<table className="table table-hover">
					<thead>
						{location.pathname.match("/admin") && (
							<tr>
								<th colSpan="7"></th>
								<th className="text-end">
									<MyLink
										linkTo="/students/create"
										text="add student"
									/>
								</th>
							</tr>
						)}
						<tr>
							<th>#</th>
							<th></th>
							<th>Name</th>
							<th>Email</th>
							<th>Gender</th>
							<th>Faculty</th>
							<th>Department</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{props.students.data?.map((student, key) => (
							<tr key={key}>
								<td>{props.iterator(key, props.students)}</td>
								<td>
									<Img
										src={student.avatar}
										className="rounded-circle"
										style={{ minWidth: "3em", height: "3em" }}
										alt="Avatar"
									/>
								</td>
								<td>{student.name}</td>
								<td>{student.email}</td>
								<td className="text-capitalize">{student.gender}</td>
								<td>{student.facultyName}</td>
								<td>{student.departmentName}</td>
								<td className="text-end">
									<div className="d-flex">
										{/* View Start */}
										<MyLink
											linkTo={`/students/${student.id}/show`}
											text="view"
											className="btn-sm me-1"
										/>
										{/* View End */}

										{location.pathname.match("/admin/") &&
											location.pathname.match("/students") && (
												<React.Fragment>
													{/* Edit Start */}
													<MyLink
														linkTo={`/students/${student.id}/edit`}
														text="edit"
														className="btn-sm"
													/>
													{/* Edit End */}

													<div className="mx-1">
														<DeleteModal
															index={`student${key}`}
															model={student}
															modelName="Student"
															message={`Are you sure you want to delete ${student.name}.`}
															onDelete={onDeleteStudent}
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
				{/* Pagination Links */}
				<PaginationLinks
					list={props.students}
					getPaginated={props.getPaginated}
					setState={props.setStudents}
				/>
				{/* Pagination Links End */}
			</div>
		</div>
	)
}

export default StudentList
