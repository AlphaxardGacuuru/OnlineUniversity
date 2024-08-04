import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import UnitList from "@/components/Units/UnitList"
import InstructorList from "@/components/Instructors/InstructorList"
import StudentList from "@/components/Students/StudentList"
import BillableList from "@/components/Billables/BillableList"

const show = (props) => {
	var { id } = useParams()

	const [course, setCourse] = useState({})
	const [units, setUnits] = useState([])
	const [instructors, setInstructors] = useState([])
	const [students, setStudents] = useState([])
	const [billables, setBillables] = useState([])
	const [session, setSession] = useState({})
	const [tab, setTab] = useState("units")
	const [hasBalance, setHasBalance] = useState()
	const [loading, setLoading] = useState()

	const [nameQuery, setNameQuery] = useState("")
	const [codeQuery, setCodeQuery] = useState("")

	const getCourse = () => {
		Axios.get(`api/courses/${id}`)
			.then((res) => {
				setCourse(res.data.data)

				// Set Payment Details
				props.setPaymentTitle("Fee Payment")
				props.setPaymentDescription(`Payment of Fees for ${res.data.data.name}`)
				props.setPaymentAmount(res.data.data.price)
			})
			.catch((err) => props.getErrors(err))
	}

	const getFeeStatement = () => {
		Axios.get(`api/fee-statements/${props.auth.id}`)
			.then((res) => {
				var [statements] = res.data.data.statement

				setHasBalance(statements?.balance)
				props.setPaymentAmount(statements?.balance)
			})
			.catch((err) => props.getErrors(err))
	}

	useEffect(() => {
		// Set page
		props.setPage({ name: "View Course", path: ["courses", "view"] })

		getCourse()
		getFeeStatement()
	}, [props.auth])

	useEffect(() => {
		// Fetch Academin Session
		props.get(`sessions/current-by-course-id/${id}`, setSession)
		// Fetch Units
		props.getPaginated(
			`units?courseId=${id}&
			name=${nameQuery}`,
			setUnits
		)
		// Fetch Instructors
		props.getPaginated(
			`instructors?courseId=${id}&
			name=${nameQuery}&
			code=${codeQuery}&`,
			setInstructors
		)
		// Fetch Students
		props.getPaginated(
			`students?courseId=${id}&
			name=${nameQuery}`,
			setStudents
		)
		// Fetch Billables
		props.getPaginated(
			`billables?courseId=${id}&
			name=${nameQuery}`,
			setBillables
		)

		// Close Pay Menu
		return () => props.setShowPayMenu("")
	}, [nameQuery])

	/*
	 * Create Invoice
	 */
	const createInvoice = () => {
		// Show loader
		setLoading(true)

		Axios.post(`/api/charge-enrollment-fee`, {
			courseId: id,
		})
			.then((res) => {
				setLoading(false)
				props.setMessages([res.data.message])
				// Fetch Auth
				props.get("auth", props.setAuth, "auth")
				// Show Pay menu
				props.setShowPayMenu("menu-open")
			})
			.catch((err) => {
				setLoading(false)
				props.getErrors(err)
			})
	}

	/*
	 * Self Enroll Course
	 */
	const enrollCourse = () => {
		// Show loader
		setLoading(true)

		Axios.put(`/api/students/${props.auth.id}`, {
			courseId: id,
		})
			.then((res) => {
				setLoading(false)
				props.setMessages([res.data.message])
				// Fetch Auth
				props.get("auth", props.setAuth, "auth")
			})
			.catch((err) => {
				setLoading(false)
				props.getErrors(err)
			})
	}

	const active = (activeTab) => {
		return activeTab == tab ? "bg-light" : "bg-secondary-subtle"
	}

	const activeTab = (activeTab) => {
		return activeTab == tab ? "d-block" : "d-none"
	}

	var isStudentAndCourseIsInSession =
		props.auth.accountType == "student" && session.id

	return (
		<div className="row">
			<div className="col-sm-4">
				<div className="card mb-2 p-4 text-center shadow">
					<h4>{course.name}</h4>
					{/* Check if user is student and course is in session */}
					{isStudentAndCourseIsInSession && (
						<React.Fragment>
							{/* Check if user has requested enrollment for course and is not enrolled in another course */}
							{props.auth.courseId == id ? (
								<React.Fragment>
									{/* Check if enrollment is approved */}
									{props.auth.courseApprovedBy ? (
										<Btn
											text="Enrolled"
											className="btn-success mt-2"
										/>
									) : (
										<Btn
											text={`enrollment ${
												props.auth.courseDeniedBy
													? " denied"
													: "awaiting approval"
											}`}
											className="btn-success mt-2"
											loading={loading}
										/>
									)}
								</React.Fragment>
							) : (
								<React.Fragment>
									{/* User not Enrolled in this or other course */}
									{hasBalance ? (
										<React.Fragment>
											{parseFloat(hasBalance.replace(/,/g, "")) <= 0 ? (
												<Btn
													text={`enroll`}
													className="btn-success mt-2"
													onClick={enrollCourse}
													loading={loading}
												/>
											) : (
												<Btn
													text={`pay KES ${hasBalance} to enroll`}
													className="btn-success mt-2"
													onClick={() => props.setShowPayMenu("menu-open")}
													loading={loading}
												/>
											)}
										</React.Fragment>
									) : (
										<Btn
											text={`Request enrollment @ KES ${course.admissionFee}`}
											className="btn-success mt-2"
											onClick={createInvoice}
											loading={loading}
										/>
									)}
								</React.Fragment>
							)}
							{hasBalance && (
								<p className="mb-0 text-warning">Balance KES {hasBalance}</p>
							)}
						</React.Fragment>
					)}
				</div>
			</div>
			<div className="col-sm-8">
				{/* Tabs */}
				<div className="d-flex justify-content-between flex-wrap mb-2">
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"units"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("units")}>
						Units
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
					<div
						className={`card shadow-sm flex-grow-1 text-center mb-2 py-2 px-4 ${active(
							"billables"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("billables")}>
						Fee Structure
					</div>
				</div>
				{/* Tabs End */}

				{/* Units Tab */}
				<UnitList
					{...props}
					activeTab={activeTab("units")}
					units={units}
					setUnits={setUnits}
					session={session}
					courseId={id}
					setCourse={setCourse}
					hasBalance={hasBalance}
					setNameQuery={setNameQuery}
					setCodeQuery={setCodeQuery}
				/>
				{/* Units Tab End */}

				{/* Instructors Tab */}
				<InstructorList
					{...props}
					instructors={instructors}
					setInstructors={setInstructors}
					activeTab={activeTab("instructors")}
					setCourse={setCourse}
					setNameQuery={setNameQuery}
				/>
				{/* Instructors Tab End */}

				{/* Students Tab */}
				<StudentList
					{...props}
					students={students}
					setStudents={setStudents}
					activeTab={activeTab("students")}
					setCourse={setCourse}
					setNameQuery={setNameQuery}
				/>
				{/* Students Tab End */}

				{/* Billables Tab */}
				<BillableList
					{...props}
					billables={billables}
					setBillables={setBillables}
					session={session}
					courseId={id}
					activeTab={activeTab("billables")}
					setCourse={setCourse}
					setNameQuery={setNameQuery}
				/>
				{/* Billables Tab End */}
			</div>
		</div>
	)
}

export default show
