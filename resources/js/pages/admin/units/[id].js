import React, { useEffect, useState } from "react"
import {
	useLocation,
	useParams,
} from "react-router-dom/cjs/react-router-dom.min"

import MyLink from "@/components/Core/MyLink"

import Material from "@/components/Units/Material"
import DiscussionForum from "@/components/Units/DiscussionForum"
import Submission from "@/components/Units/Submission"
import Questions from "@/components/Units/Questions"

import InstructorList from "@/components/Instructors/InstructorList"
import StudentList from "@/components/Students/StudentList"

const show = (props) => {
	var { id } = useParams()

	const location = useLocation()

	const [unit, setUnit] = useState({})
	const [syllabus, setSyllabus] = useState([])
	const [tab, setTab] = useState("materials")

	const [nameQuery, setNameQuery] = useState("")
	const [genderQuery, setGenderQuery] = useState("")
	const [facultyQuery, setFacultyQuery] = useState("")
	const [departmentQuery, setDepartmentQuery] = useState("")

	const [material, setMaterial] = useState({})
	const [instructors, setInstructors] = useState([])
	const [students, setStudents] = useState([])

	const [unitSession] = (props.auth?.unitSessions || [{}])
		.filter((unitSession) => unitSession.unitId == id)
		.map((unitSession) => unitSession)

	useEffect(() => {
		// Set page
		props.setPage({ name: "View Unit", path: ["courses", "view"] })
		// Fetch Unit
		Axios.get(`api/units/${id}`)
			.then((res) => {
				// Set page
				props.setPage({
					name: "View Unit",
					path: ["courses", `courses/${res.data.data.courseId}/show`, "view"],
				})
				setUnit(res.data.data)
			})
			.catch((err) => props.setErrors([`Failed to fetch unit/${id}`]))

		// Fetch Materials
		props.get(`materials/by-unit-id/${id}`, setSyllabus)
		// Fetch Instructors
		props.getPaginated(
			`instructors?unitId=${id}
			name=${nameQuery}&
			gender=${genderQuery}&
			facultyId=${facultyQuery}&,
			departmentId=${departmentQuery}`,
			setInstructors
		)

		// Fetch Students
		props.getPaginated(
			`students?unitId=${id}
			name=${nameQuery}&
			gender=${genderQuery}&
			facultyId=${facultyQuery}&,
			departmentId=${departmentQuery}`,
			setStudents
		)
	}, [])

	const active = (activeTab) => {
		return activeTab == tab ? "bg-light" : "bg-secondary-subtle"
	}

	const materialActive = (activeTab) => {
		return activeTab == material.title ? "bg-light" : "bg-secondary-subtle"
	}

	const activeTab = (activeTab) => {
		return activeTab == tab ? "d-block" : "d-none"
	}

	return (
		<div className="row">
			<div className="col-sm-4">
				<div className="card shadow mb-2 p-4 text-center">
					<h4>{unit.name}</h4>
					<h6>{unit.description}</h6>
					<h6>Year {unit.year}</h6>
					<h6>Semester {unit.semester}</h6>
					<h6>Credit {unit.credits}</h6>
					{/* Grades Link Start */}
					{!location.pathname.match("/student/") && (
						<MyLink
							linkTo={`/units/${id}/grades`}
							text="view grade book"
							className="btn-sm mt-4 me-1"
						/>
					)}
					{/* Grades Link End */}
				</div>

				{/* Materials Tab */}
				<Material
					{...props}
					syllabus={syllabus}
					setSyllabus={setSyllabus}
					courseId={id}
					setMaterial={setMaterial}
				/>
				{/* Materials Tab End */}
			</div>

			<div className="col-sm-8">
				{/* Tabs */}
				<div className="d-flex justify-content-between flex-wrap mb-1">
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"materials"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("materials")}>
						Learning Resources
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
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"students"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("students")}>
						Students
					</div>
				</div>
				{/* Tabs End */}

				{/* Materials Tab */}
				<div className={activeTab("materials")}>
					{/* Material Tabs */}
					<div className="d-flex justify-content-between flex-wrap mb-1">
						<div
							className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${materialActive(
								"Learning Guide"
							)}`}>
							Learning Guide
						</div>
						<div
							className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${materialActive(
								"Discussion Forum"
							)}`}>
							Discussion Forum
						</div>
						<div
							className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${materialActive(
								"Written Assignment"
							)}`}>
							Written Assignment
						</div>
						<div
							className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${materialActive(
								"Learning Reflection"
							)}`}>
							Learning Reflection
						</div>
					</div>
					<div className="d-flex justify-content-between flex-wrap mb-2">
						<div
							className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${materialActive(
								"Self Quiz"
							)}`}>
							Self-Quiz
						</div>
						<div
							className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${materialActive(
								"CAT 1"
							)}`}>
							CAT 1
						</div>
						<div
							className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${materialActive(
								"CAT 2"
							)}`}>
							CAT 2
						</div>
						<div
							className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${materialActive(
								"Review Quiz"
							)}`}>
							Review Quiz
						</div>
						<div
							className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${materialActive(
								"Final Exam"
							)}`}>
							Final Exam
						</div>
					</div>
					{/* Material Tabs End */}
					{/* Description Start */}
					<div className="card shadow-sm mb-2 p-2">
						<h5>Description</h5>
						{material.description ? (
							material.description
						) : (
							<div className="text-muted">No Description to show</div>
						)}
					</div>
					{/* Description End */}
					{/* Rich Text */}
					{[
						"Learning Guide",
						"Discussion Forum",
						"Written Assignment",
						"Learning Reflection",
					].includes(material.title) && (
						<div className="card shadow-sm mb-2 py-5 p-2">
							{material.richText ? (
								<div
									dangerouslySetInnerHTML={{ __html: material.richText }}
									className="px-5"
								/>
							) : (
								<div className="d-flex justify-content-center p-5 text-muted">
									No Rich text to show
								</div>
							)}
						</div>
					)}
					{/* Rich Text End */}
					{/* Discussion Forum */}
					{material.title == "Discussion Forum" && material.isActive && (
						<DiscussionForum
							{...props}
							sessionId={unitSession?.sessionId}
							unitId={unitSession?.unitId}
							week={material.week}
						/>
					)}
					{/* Discussion Forum End */}
					{/* Submission */}
					{(material.title == "Written Assignment" ||
						material.title == "Learning Reflection") &&
						material.isActive && (
							<Submission
								{...props}
								sessionId={unitSession?.sessionId}
								unitId={id}
								materialId={material.id}
								materialTab={material.title}
							/>
						)}
					{/* Submission End */}

					{/* Quiz Start */}
					{[
						"Self Quiz",
						"CAT 1",
						"CAT 2",
						"Review Quiz",
						"Final Exam",
					].includes(material.title) &&
						material.questions &&
						material.isActive &&
						location.pathname.match("/student/") && (
							<Questions
								{...props}
								questions={material.questions}
								sessionId={unitSession?.sessionId}
								unitId={id}
								materialId={material.id}
								materialTab={material.title}
							/>
						)}
					{/* Quiz End */}
				</div>
				{/* Materials Tab End */}

				{/* Instructors Tab */}
				<InstructorList
					{...props}
					instructors={instructors}
					activeTab={activeTab("instructors")}
					setNameQuery={setNameQuery}
					setGenderQuery={setGenderQuery}
					setFacultyQuery={setFacultyQuery}
					setDepartmentQuery={setDepartmentQuery}
				/>
				{/* Instructors Tab End */}

				{/* Students Tab */}
				<StudentList
					{...props}
					students={students}
					activeTab={activeTab("students")}
					setNameQuery={setNameQuery}
					setGenderQuery={setGenderQuery}
					setFacultyQuery={setFacultyQuery}
					setDepartmentQuery={setDepartmentQuery}
				/>
				{/* Students Tab End */}
			</div>
		</div>
	)
}

export default show
