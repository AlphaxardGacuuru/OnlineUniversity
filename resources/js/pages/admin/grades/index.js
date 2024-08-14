import React, { useEffect, useState } from "react"
import {
	useLocation,
	useParams,
} from "react-router-dom/cjs/react-router-dom.min"

import MyLink from "@/components/Core/MyLink"
import Img from "@/components/Core/Img"
import DeleteModal from "@/components/Core/DeleteModal"

import HeroIcon from "@/components/Core/HeroIcon"

import PersonSVG from "@/svgs/PersonSVG"
import PaginationLinks from "@/components/Core/PaginationLinks"

const index = (props) => {
	var { id } = useParams()

	const location = useLocation()

	const [unit, setUnit] = useState({})

	const [students, setStudents] = useState([])

	const [faculties, setFaculties] = useState([])
	const [departments, setDepartments] = useState([])

	const [nameQuery, setNameQuery] = useState("")
	const [genderQuery, setGenderQuery] = useState("")
	const [facultyQuery, setFacultyQuery] = useState("")
	const [departmentQuery, setDepartmentQuery] = useState("")

	useEffect(() => {
		// Fetch Unit
		Axios.get(`api/units/${id}`)
			.then((res) => {
				// Set page
				props.setPage({
					name: "Grade Book",
					path: [
						"courses",
						`courses/${res.data.data.courseId}/show`,
						`units/${id}/show`,
						"grades",
					],
				})
				setUnit(res.data.data)
			})
			.catch((err) => props.setErrors([`Failed to fetch unit/${id}`]))

		// Fetch Students
		props.getPaginated(
			`students?unitId=${id}
			name=${nameQuery}&
			gender=${genderQuery}&
			facultyId=${facultyQuery}&,
			departmentId=${departmentQuery}`,
			setStudents
		)

		props.get("faculties?idAndName=true", setFaculties)
		props.get("departments?idAndName=true", setDepartments)
	}, [])
	return (
		<div>
			{/* Data */}
			<div className="card shadow-sm p-2">
				<div className="d-flex justify-content-between">
					{/* Total */}
					<div className="d-flex justify-content-between w-100 align-items-center mx-4">
						<div>
							<span className="fs-4">{students.meta?.total}</span>
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
							onChange={(e) => setNameQuery(e.target.value)}
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
							onChange={(e) => setGenderQuery(e.target.value)}>
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

			<div className="table-responsive mb-5 pb-2">
				<table className="table table-hover">
					<thead>
						<tr>
							<th
								colSpan={3}
								className="frozen-column">
								Student
							</th>
							<th>Discussion Forum</th>
							<th>Written Assignment</th>
							<th>Learning Reflection</th>
							<th>Self Quiz</th>
							<th>CAT 1</th>
							<th>CAT 2</th>
							<th>Review Quiz</th>
							<th>Final Exam</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{students.data?.map((grade, key) => (
							<tr key={key}>
								<td className="frozen-column">
									<div className="d-flex">
										<div>{props.iterator(key, students)}</div>
										<Img
											src={grade.avatar}
											className="rounded-circle mx-2"
											style={{ minWidth: "3em", height: "3em" }}
											alt="Avatar"
										/>
										<h6>{grade.name}</h6>
									</div>
								</td>
								<td>{grade.discussionForum}</td>
								<td>{grade.writtenAssignment}</td>
								<td>{grade.learningReflection}</td>
								<td>{grade.selfQuiz}</td>
								<td>{grade.cat1}</td>
								<td>{grade.cat2}</td>
								<td>{grade.reviewQuiz}</td>
								<td>{grade.finalExam}</td>
								<td className="text-end">
									<div className="d-flex">
										{/* View Start */}
										<MyLink
											linkTo={`/students/${grade.id}/show`}
											text="view"
											className="btn-sm me-1"
										/>
										{/* View End */}

										{location.pathname.match("/admin/") &&
											location.pathname.match("/students") && (
												<React.Fragment>
													{/* Edit Start */}
													<MyLink
														linkTo={`/students/${grade.id}/edit`}
														text="edit"
														className="btn-sm"
													/>
													{/* Edit End */}

													<div className="mx-1">
														<DeleteModal
															index={`grade${key}`}
															model={grade}
															modelName="Student"
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
					list={students}
					getPaginated={props.getPaginated}
					setState={setStudents}
				/>
				{/* Pagination Links End */}
			</div>
		</div>
	)
}

export default index
