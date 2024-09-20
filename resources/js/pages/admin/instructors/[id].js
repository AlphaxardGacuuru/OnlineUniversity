import React, { useEffect, useState } from "react"
import {
	useHistory,
	useLocation,
	useParams,
} from "react-router-dom/cjs/react-router-dom.min"

import Img from "@/components/Core/Img"
import MyLink from "@/components/Core/MyLink"
import Btn from "@/components/Core/Btn"

import CourseList from "@/components/Courses/CourseList"
import UnitList from "@/components/Units/UnitList"
import FeeStatementList from "@/components/FeeStatement/FeeStatementList"
import CreditNoteList from "@/components/CreditNotes/CreditNoteList"

import DeleteModal from "@/components/Core/DeleteModal"

const show = (props) => {
	const { id } = useParams()
	const location = useLocation()
	const router = useHistory()

	const [tab, setTab] = useState("courses")

	const [nameQuery, setNameQuery] = useState("")
	const [unitNameQuery, setUnitNameQuery] = useState("")
	const [facultyQuery, setFacultyQuery] = useState("")
	const [departmentQuery, setDepartmentQuery] = useState("")
	const [yearQuery, setYearQuery] = useState("")
	const [semesterQuery, setSemesterQuery] = useState("")

	const [user, setUser] = useState({})
	const [courses, setCourses] = useState([])
	const [units, setUnits] = useState([])
	const [fees, setFees] = useState({})
	const [creditNotes, setCreditNotes] = useState([])

	const pagePath = location.pathname.match("/admin/staff")
		? "staff"
		: location.pathname.match("/instructor")
		? "instructor"
		: "student"

	const capitalize = (str) => {
		const [first, ...rest] = str
		return first.toUpperCase() + rest.join("")
	}

	useEffect(() => {
		// Set page
		props.setPage({
			name: capitalize(pagePath),
			path: [`${pagePath}s`, pagePath],
		})
		props.get(`${pagePath}s/${id}`, setUser)
		props.get(`fee-statements/${id}`, setFees)
		props.getPaginated(
			`credit-notes?
			userId=${id}`,
			setCreditNotes,
			"creditNotes"
		)
	}, [])

	// Fetch on Type
	useEffect(() => {
		props.getPaginated(
			`courses?userId=${id}&
			name=${nameQuery}&
			facultyId=${facultyQuery}&
			departmentId=${departmentQuery}`,
			setCourses
		)
	}, [nameQuery, facultyQuery, departmentQuery])

	useEffect(() => {
		props.getPaginated(
			`units?userId=${id}&
			name=${unitNameQuery}&
			year=${yearQuery}&
			semester=${semesterQuery}`,
			setUnits
		)
	}, [unitNameQuery, yearQuery, semesterQuery])

	/*
	 * Delete Instructor
	 */
	const onDeleteInstructor = (instructorId) => {
		Axios.delete(`/api/instructors/${instructorId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Redirect to Instructors
				router.push("/admin/instructors")
			})
			.catch((err) => props.getErrors(err))
	}

	const active = (activeTab) => {
		return activeTab == tab ? "bg-light" : "bg-secondary-subtle"
	}

	const activeTab = (activeTab) => {
		return activeTab == tab ? "d-block" : "d-none"
	}

	var canEditProfile = location.pathname.match("/admin/") || props.auth.id == id

	return (
		<div className="row">
			<div className="col-sm-4">
				<div className="card shadow mb-2 p-4 text-center">
					<div className="m-3">
						<Img
							src={user.avatar ?? "/storage/avatars/male-avatar.png"}
							className="rounded-circle"
							width="100px"
							height="100px"
							alt="Avatar"
						/>
					</div>
					<h4>{user.name}</h4>
					<h6>{user.email}</h6>
					<h6>{user.phone}</h6>
					<h6 className="text-capitalize">{user.gender}</h6>
					<h6 className="text-capitalize">{user.accountType}</h6>
					<h6>{user.facultyName}</h6>
					<h6>{user.departmentName}</h6>
					<hr />
					<div className="d-flex justify-content-between">
						<div className="d-flex justify-content-start">
							{/* Edit Link Start */}
							{canEditProfile && (
								<MyLink
									linkTo={`${
										location.pathname.match("/admin/instructors")
											? "/instructors"
											: location.pathname.match("/admin/students")
											? "/students"
											: location.pathname.match("/admin/staff")
											? "/staff"
											: ""
									}/${id}/edit`}
									text="edit"
									className="btn-sm"
								/>
							)}
							{/* Edit Link End */}

							{/* Credit Note Link Start */}
							{location.pathname.match("/admin/") && (
								<MyLink
									linkTo={`/finance/credit-notes/${id}/create`}
									text="award credit note"
									className="btn-sm mx-1"
								/>
							)}
							{/* Credit Note Link End */}
						</div>

						{location.pathname.match("/admin/") ? (
							<React.Fragment>
								<div className="mx-1">
									<DeleteModal
										index={`instructor`}
										model={user}
										modelName="Instructor"
										message={`Are you sure you want to delete ${user.name}`}
										onDelete={onDeleteInstructor}
									/>
								</div>
							</React.Fragment>
						) : (
							<Btn
								text="delete"
								className="btn-sm"
								disabled={true}
							/>
						)}
					</div>
				</div>
			</div>
			<div className="col-sm-8">
				{/* Tabs */}
				<div className="d-flex justify-content-between flex-wrap mb-2">
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"courses"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("courses")}>
						Courses
					</div>
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"units"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("units")}>
						Course Units
					</div>
					{location.pathname.match("/student") && (
						<div
							className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
								"fee-statements"
							)}`}
							style={{ cursor: "pointer" }}
							onClick={() => setTab("fee-statements")}>
							Fee Statements
						</div>
					)}
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"credit-notes"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("credit-notes")}>
						Credit Notes
					</div>
				</div>
				{/* Tabs End */}

				{/* Courses Tab */}
				<CourseList
					{...props}
					activeTab={activeTab("courses")}
					courses={courses}
					setCourses={setCourses}
					setNameQuery={setNameQuery}
					setFacultyQuery={setFacultyQuery}
					setDepartmentQuery={setDepartmentQuery}
				/>
				{/* Courses Tab End */}

				{/* Units Tab */}
				<UnitList
					{...props}
					activeTab={activeTab("units")}
					units={units}
					setUnits={setUnits}
					userId={id}
					setNameQuery={setUnitNameQuery}
					setYearQuery={setYearQuery}
					setSemesterQuery={setSemesterQuery}
				/>
				{/* Units Tab End */}

				{/* Fee Statements Tab */}
				{location.pathname.match("/student") && (
					<FeeStatementList
						{...props}
						activeTab={activeTab("fee-statements")}
						fees={fees}
					/>
				)}
				{/* Fee Statements Tab End */}

				{/* Credit Notes Tab */}
				<CreditNoteList
					{...props}
					creditNotes={creditNotes}
					setCreditNotes={setCreditNotes}
					activeTab={activeTab("credit-notes")}
					setNameQuery={setNameQuery}
				/>
				{/* Credit Notes Tab End */}
			</div>
		</div>
	)
}

export default show
