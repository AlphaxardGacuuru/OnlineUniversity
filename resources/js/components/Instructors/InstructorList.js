import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"

import MyLink from "@/components/Core/MyLink"
import Img from "@/components/Core/Img"
import DeleteModal from "@/components/Core/DeleteModal"

import HeroIcon from "@/components/Core/HeroIcon"

import PersonSVG from "@/svgs/PersonSVG"
import PaginationLinks from "@/components/Core/PaginationLinks"

const InstructorList = (props) => {
	const location = useLocation()

	const [faculties, setFaculties] = useState([])
	const [departments, setDepartments] = useState([])

	useEffect(() => {
		props.get("faculties?idAndName=true", setFaculties)
		props.get("departments?idAndName=true", setDepartments)
	}, [])

	/*
	 * Delete Instructor
	 */
	const onDeleteInstructor = (instructorId) => {
		Axios.delete(`/api/instructors/${instructorId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove row
				props.setInstructors({
					meta: props.instructors.meta,
					links: props.instructors.links,
					data: props.instructors.data.filter((unit) => unit.id != instructorId),
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
							<span className="fs-4">{props.instructors.meta?.total}</span>
							<h4>Total Instructors</h4>
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
										linkTo="/instructors/create"
										text="add instructor"
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
						{props.instructors.data?.map((instructor, key) => (
							<tr key={key}>
								<td>{props.iterator(key, props.instructors)}</td>
								<td>
									<Img
										src={instructor.avatar}
										className="rounded-circle"
										style={{ minWidth: "3em", height: "3em" }}
										alt="Avatar"
									/>
								</td>
								<td>{instructor.name}</td>
								<td>{instructor.email}</td>
								<td className="text-capitalize">{instructor.gender}</td>
								<td>{instructor.facultyName}</td>
								<td>{instructor.departmentName}</td>
								<td className="text-end">
									<div className="d-flex">
										<MyLink
											linkTo={`/instructors/${instructor.id}/show`}
											text="view"
											className="btn-sm me-1"
										/>

										{location.pathname.match("/admin/") &&
											location.pathname.match("/instructors") && (
												<React.Fragment>
													<MyLink
														linkTo={`/instructors/${instructor.id}/edit`}
														text="edit"
														className="btn-sm"
													/>

													<div className="mx-1">
														<DeleteModal
															index={`instructor${key}`}
															model={instructor}
															modelName="Instructor"
															onDelete={onDeleteInstructor}
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
					list={props.instructors}
					getPaginated={props.getPaginated}
					setState={props.setInstructors}
				/>
				{/* Pagination Links End */}
			</div>
		</div>
	)
}

export default InstructorList
