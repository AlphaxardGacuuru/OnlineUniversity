import React, { useEffect, useState } from "react"
import {
	useLocation,
	useParams,
} from "react-router-dom/cjs/react-router-dom.min"

import DiscussionForum from "@/components/Units/DiscussionForum"
import Submission from "@/components/Units/Submission"
import Quiz from "@/components/Units/Quiz"

import InstructorList from "@/components/Instructors/InstructorList"
import StudentList from "@/components/Students/StudentList"

import Material from "@/components/Units/Material"

const show = (props) => {
	var { id } = useParams()

	const [unit, setUnit] = useState({})
	const [syllabus, setSyllabus] = useState([])
	const [tab, setTab] = useState("materials")
	const [materialTab, setMaterialTab] = useState("Learning Guide")
	const [richText, setRichText] = useState("")
	const [week, setWeek] = useState("")
	const [isActive, setIsActive] = useState()

	const [nameQuery, setNameQuery] = useState("")
	const [genderQuery, setGenderQuery] = useState("")
	const [facultyQuery, setFacultyQuery] = useState("")
	const [departmentQuery, setDepartmentQuery] = useState("")

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
		return activeTab == materialTab ? "bg-light" : "bg-secondary-subtle"
	}

	const activeTab = (activeTab) => {
		return activeTab == tab ? "d-block" : "d-none"
	}

	/*
	 * Handle Material Change
	 */
	const handleMaterialTab = (title, richText, syllabusWeek, isActive) => {
		// Check Type of material clicked
		if (title == "Learning Guide") {
			setMaterialTab("Learning Guide")
			setRichText(richText)
		} else if (title == "Discussion Forum") {
			setMaterialTab("Discussion Forum")
			setRichText(richText)
			setWeek(syllabusWeek)
			setIsActive(isActive)
		} else if (title == "Written Assignment") {
			setMaterialTab("Written Assignment")
			setRichText(richText)
			setWeek(syllabusWeek)
			setIsActive(isActive)
		} else if (title == "Learning Reflection") {
			setMaterialTab("Learning Reflection")
			setRichText(richText)
			setWeek(syllabusWeek)
			setIsActive(isActive)
		} else if (title == "Self-Quiz") {
			setMaterialTab("Self-Quiz")
			setRichText(richText)
			setWeek(syllabusWeek)
			setIsActive(isActive)
		} else if (title == "CAT 1") {
			setMaterialTab("CAT 1")
			setRichText(richText)
			setWeek(syllabusWeek)
			setIsActive(isActive)
		} else if (title == "CAT 2") {
			setMaterialTab("CAT 2")
			setRichText(richText)
			setWeek(syllabusWeek)
			setIsActive(isActive)
		} else if (title == "Review Quiz") {
			setMaterialTab("Review Quiz")
			setRichText(richText)
			setWeek(syllabusWeek)
			setIsActive(isActive)
		} else if (title == "Final Exam") {
			setMaterialTab("Final Exam")
			setRichText(richText)
			setWeek(syllabusWeek)
			setIsActive(isActive)
		}
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
				</div>

				{/* Materials Tab */}
				<Material
					{...props}
					handleMaterialTab={handleMaterialTab}
					syllabus={syllabus}
					setSyllabus={setSyllabus}
					courseId={id}
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
								"Self-Quiz"
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
					{/* Materials Tab */}
					<div className="card shadow-sm mb-2 py-5 p-2">
						{richText ? (
							<div
								dangerouslySetInnerHTML={{ __html: richText }}
								className="px-5"
							/>
						) : (
							<div className="d-flex justify-content-center p-5 text-muted">
								Nothing to show
							</div>
						)}
					</div>
					{/* Materials Tab End */}
					{/* Discussion Forum */}
					{materialTab == "Discussion Forum" && isActive && (
						<DiscussionForum
							{...props}
							sessionId={unitSession?.sessionId}
							unitId={unitSession?.unitId}
							week={week}
						/>
					)}
					{/* Discussion Forum End */}
					{/* Submission */}
					{(materialTab == "Written Assignment" ||
						materialTab == "Learning Reflection") &&
						isActive && (
							<Submission
								{...props}
								sessionId={unitSession?.sessionId}
								unitId={id}
								week={week}
								materialTab={materialTab}
							/>
						)}
					{/* Submission End */}

					{/* Quiz Start */}
					{[
						"Self-Quiz",
						"CAT 1",
						"CAT 2",
						"Review Quiz",
						"Final Exam",
					].includes(materialTab) && <Quiz {...props} />}
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
