import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import MyLink from "@/components/Core/MyLink"
import PaginationLinks from "@/components/Core/PaginationLinks"

import HeroIcon from "@/components/Core/HeroIcon"
import InstructorList from "@/components/Instructors/InstructorList"
import StudentList from "@/components/Students/StudentList"

import DepartmentSVG from "@/svgs/DepartmentSVG"
import DeleteModal from "@/components/Core/DeleteModal"

const show = (props) => {
	var { id } = useParams()

	const [faculty, setFaculty] = useState({})
	const [departments, setDepartments] = useState([])
	const [instructors, setInstructors] = useState([])
	const [students, setStudents] = useState([])
	const [tab, setTab] = useState("departments")

	const [departmentNameQuery, setDepartmentNameQuery] = useState("")

	const [instructorNameQuery, setInstructorNameQuery] = useState("")
	const [instructorGenderQuery, setInstructorGenderQuery] = useState("")
	const [instructorDepartmentQuery, setInstructorDepartmentQuery] = useState("")

	const [studentNameQuery, setStudentNameQuery] = useState("")
	const [studentGenderQuery, setStudentGenderQuery] = useState("")
	const [studentDepartmentQuery, setStudentDepartmentQuery] = useState("")

	useEffect(() => {
		// Set page
		props.setPage({ name: "View Faculty", path: ["faculties", "view"] })
		props.get(`faculties/${id}`, setFaculty)
	}, [])

	useEffect(() => {
		props.getPaginated(
			`departments?
			facultyId=${id}&
			name=${departmentNameQuery}`,
			setDepartments
		)
	}, [departmentNameQuery])

	useEffect(() => {
		props.getPaginated(
			`instructors?
			facultyId=${id}&
			name=${instructorNameQuery}&
			gender=${instructorGenderQuery}&
			departmentId=${instructorDepartmentQuery}`,
			setInstructors
		)
	}, [instructorNameQuery, instructorGenderQuery, instructorDepartmentQuery])

	useEffect(() => {
		props.getPaginated(
			`students?
			facultyId=${id}&
			name=${studentNameQuery}&
			gender=${studentGenderQuery}&
			departmentId=${studentDepartmentQuery}`,
			setStudents
		)
	}, [studentNameQuery, studentGenderQuery, studentDepartmentQuery])

	const active = (activeTab) => {
		return activeTab == tab ? "bg-light" : "bg-secondary-subtle"
	}

	const activeTab = (activeTab) => {
		return activeTab == tab ? "d-block" : "d-none"
	}

	/*
	 * Delete Department
	 */
	const onDeleteDepartment = (departmentId) => {
		Axios.delete(`/api/departments/${departmentId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Delete rows
				setDepartments({
					meta: departments.meta,
					links: departments.links,
					data: departments.data.filter((department) => department.id != departmentId),
				})
			})
			.catch((err) => props.getErrors(err))
	}

	return (
		<div className="row">
			<div className="col-sm-4">
				<div className="card mb-2 p-4 text-center shadow">
					<h4>{faculty.name}</h4>
				</div>
			</div>
			<div className="col-sm-8">
				{/* Tabs */}
				<div className="d-flex justify-content-between flex-wrap mb-2">
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"departments"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("departments")}>
						Departments
					</div>
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"instructors"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("instructors")}>
						Instructors
					</div>
					<div
						className={`card flex-grow-1 text-center mb-2 py-2 px-4 ${active(
							"students"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("students")}>
						Students
					</div>
				</div>
				{/* Tabs End */}

				{/* Departments Tab */}
				<div className={activeTab("departments")}>
					{/* Data */}
					<div className="card shadow-sm mb-2 p-2">
						<div className="d-flex justify-content-between">
							{/* Total */}
							<div className="d-flex justify-content-between w-100 align-items-center mx-4">
								<div>
									<span className="fs-4">{departments.meta?.total}</span>
									<h4>Total Departments</h4>
								</div>
								<HeroIcon>
									<DepartmentSVG />
								</HeroIcon>
							</div>
							{/* Total End */}
						</div>
					</div>
					{/* Data End */}

					{/* Table */}
					<div className="table-responsive">
						<table className="table table-hover">
							<thead>
								<tr>
									<th colSpan="2">Departments</th>
									<th className="text-end">
										<MyLink
											linkTo={`/departments/${id}/create`}
											text="add department"
										/>
									</th>
								</tr>
								<tr>
									<td>#</td>
									<td>Name</td>
									<td>Action</td>
								</tr>
								{departments.data?.map((department, key) => (
									<tr key={key}>
										<td>{props.iterator(key, departments)}</td>
										<td>{department.name}</td>
										<td>
											<div className="d-flex justify-content-start">
												<MyLink
													linkTo={`/departments/${department.id}/edit`}
													text="edit"
													className="btn-sm"
												/>

												<div className="mx-1">
													<DeleteModal
														index={`department${key}`}
														model={department}
														modelName="Department"
														message={`Are you sure you want to delete ${department.name}, it has ${department.courseCount} Courses, ${department.unitCount} Units and ${department.materialCount} Materials`}
														onDelete={onDeleteDepartment}
													/>
												</div>
											</div>
										</td>
									</tr>
								))}
							</thead>
						</table>
						{/* Pagination Links */}
						<PaginationLinks
							list={departments}
							getPaginated={props.getPaginated}
							setState={setDepartments}
						/>
						{/* Pagination Links End */}
					</div>
					{/* Table End */}
				</div>
				{/* Departments Tab End */}

				{/* Instructors Tab */}
				<InstructorList
					{...props}
					instructors={instructors}
					setInstructors={setInstructors}
					activeTab={activeTab("instructors")}
					setNameQuery={setInstructorNameQuery}
					setGenderQuery={setInstructorGenderQuery}
					setFaculty={setFaculty}
				/>
				{/* Instructors Tab End */}

				{/* Students Tab */}
				<StudentList
					{...props}
					students={students}
					setStudents={setStudents}
					activeTab={activeTab("students")}
					setFaculty={setFaculty}
					setNameQuery={setStudentNameQuery}
					setGenderQuery={setStudentGenderQuery}
					setDepartmentQuery={setStudentDepartmentQuery}
				/>
				{/* Students Tab End */}
			</div>
		</div>
	)
}

export default show
