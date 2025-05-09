import React, { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import Img from "@/components/Core/Img"

import HeroIcon from "@/components/Core/HeroIcon"

import PersonSVG from "@/svgs/PersonSVG"
import StarFilledSVG from "@/svgs/StarFilledSVG"
import StarSVG from "@/svgs/StarSVG"

const index = (props) => {
	var { id } = useParams()

	const [unitSession] = (props.auth?.unitSessions || [{}])
		.filter((unitSession) => unitSession.unitId == id)
		.map((unitSession) => unitSession)

	const [submissions, setSubmissions] = useState([])
	const [discussions, setDiscussions] = useState([])
	const [tab, setTab] = useState("Discussion Forum")
	const [weeks, setWeeks] = useState([])
	
	const [week, setWeek] = useState({})
	const [hasRated, setHasRated] = useState()

	const [grade, setGrade] = useState({})
	const [newGrade, setNewGrade] = useState({})
	const [comments, setComments] = useState()
	
	const [ratingModalOpen, setRatingModalOpen] = useState(true)
	const [gradingModalOpen, setGradingModalOpen] = useState(true)

	const [nameQuery, setNameQuery] = useState("")
	const [loading, setLoading] = useState()

	useEffect(() => {
		// Set page
		props.setPage({ name: "View Grade Book", path: ["courses", "view"] })

		// Fetch Unit
		Axios.get(`api/units/${id}`)
			.then((res) => {
				// Set page
				props.setPage({
					name: "View Grade Book",
					path: [
						"courses",
						`courses/${res.data.data.courseId}/show`,
						`units/${id}/show`,
						"grade-book",
					],
				})
			})
			.catch((err) => props.setErrors([`Failed to fetch course unit/${id}`]))

		// Fetch Discussions
		Axios.get(
			`/api/grade-book-discussions/${id}?sessionId=${
				unitSession?.sessionId || ""
			}&
			name=${nameQuery}`
		)
			.then((res) => {
				setDiscussions(res.data.data)
				// Compute weeks
				let getWeeks = res.data.data
					.reduce((acc, curr) => {
						if (curr.data.length > acc.data.length) {
							return curr
						}
						return acc
					}, res.data.data[0])
					?.data.map((data) => data.week)

				setWeeks(getWeeks)
			})
			.catch((err) => props.getErrors(err))

		// Fetch Submissions
		props.get(
			`grade-book-submissions/${id}?
			sessionId=${unitSession?.sessionId || ""}&
			name=${nameQuery}`,
			setSubmissions
		)
	}, [])

	var ratingModalBtn = useRef()
	var gradingModalBtn = useRef()
	var ratingModalBtnClose = useRef()
	var gradingModalBtnClose = useRef()

	/*
	 * Handle Rating Modal
	 */
	const showRatingModal = (item) => {
		// Set Rating
		setWeek(item)
		// Open Modal button
		ratingModalBtn.current.click()
	}

	/*
	 * Handle Grade Modal
	 */
	const showGradeModal = (item) => {
		// Set Grade
		setGrade(item)
		// Open Modal button
		gradingModalBtn.current.click()
	}

	const ratings = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

	/*
	 * Edit Rating
	 */
	const onEditRating = (e) => {
		e.preventDefault()
		setLoading(true)

		Axios.put(`/api/discussion-forum-ratings/${week.gradedByInstructor}`, {
			rating: hasRated,
		})
			.then((res) => {
				setLoading(false)
				props.setMessages([res.data.message])

				// Fetch Submissions
				props.get(
					`grade-book-discussions/${id}?
					sessionId=${unitSession?.sessionId || ""}&
					name=${nameQuery}`,
					setDiscussions
				)
				// Close Modal
				ratingModalBtnClose.current.click()
				setRatingModalOpen(false)
				setRatingModalOpen(true)
			})
			.catch((err) => {
				setLoading(false)
				props.getErrors(err)
			})
	}

	/*
	 * Edit Grade
	 */
	const onEditGrade = (e) => {
		e.preventDefault()
		setLoading(true)

		Axios.put(`/api/grades/${grade.gradedByInstructor}`, {
			newGrade: newGrade,
			currentGrade: grade.grade,
			comments: comments,
		})
			.then((res) => {
				setLoading(false)
				props.setMessages([res.data.message])

				// Fetch Submissions
				props.get(
					`grade-book-submissions/${id}?
					sessionId=${unitSession?.sessionId || ""}&
					name=${nameQuery}`,
					setSubmissions
				)
				// Close Modal
				modalBtnClose.current.click()
				setGradingModalOpen(false)
				setGradingModalOpen(true)
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

	const getSubmissionsTotal = (submission) =>
		submission.discussionForum +
		submission.writtenAssignment.grade +
		submission.learningReflection.grade +
		submission.selfQuiz +
		submission.cat1 +
		submission.cat2 +
		submission.reviewQuiz +
		submission.finalExam

	return (
		<div>
			{/* Edit Rating Modal */}
			{/* Button */}
			<button
				ref={ratingModalBtn}
				type="hidden"
				className="btn btn-sm rounded-pill text-white d-none"
				data-bs-toggle="modal"
				data-bs-target="#statingBackdropRating"></button>

			{/* Modal */}
			{ratingModalOpen && (
				<div
					className="modal fade"
					id="statingBackdropRating"
					data-bs-backdrop="static"
					data-bs-keyboard="false"
					tabIndex="-1"
					aria-labelledby="statingBackdropRatingLabel"
					aria-hidden="true">
					<div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
						<div className="modal-content">
							<div className="modal-header">
								<h1
									className="modal-title fs-5"
									id="statingBackdropRatingLabel">
									Edit Rating
								</h1>
								<button
									ref={ratingModalBtnClose}
									type="button"
									className="btn-close"
									data-bs-dismiss="modal"
									aria-label="Close"></button>
							</div>
							<div className="modal-body text-start">
								{/* Form */}
								<div className={`flex-grow-1 me-2 mb-1`}>
									<form onSubmit={onEditRating}>
										{/* Rating */}
										<div className="d-flex justify-content-center bg-white shadow-sm mb-2 p-2">
											{ratings.map((rating, key) => (
												<div
													key={key}
													className="p-1"
													style={{ cursor: "pointer" }}
													onClick={() => {
														// Check if rating exists
														if (hasRated) {
															setHasRated()
														} else {
															// Change UI
															setHasRated(rating)
														}
													}}>
													{hasRated == rating ? (
														<span className="text-primary">
															<StarFilledSVG />
															<div className="m-0">{rating}</div>
														</span>
													) : (
														<span>
															<StarSVG />
															<div className="m-0">{rating}</div>
														</span>
													)}
												</div>
											))}
										</div>
										{/* Rating End */}

										<div className="text-end">
											<Btn
												text="submit rating"
												loading={loading}
											/>
										</div>
									</form>
								</div>
								{/* Form End */}
							</div>
						</div>
					</div>
				</div>
			)}
			{/* Edit Rating Modal End */}

			{/* Edit Grade Modal */}
			{/* Button */}
			<button
				ref={gradingModalBtn}
				type="hidden"
				className="btn btn-sm rounded-pill text-white d-none"
				data-bs-toggle="modal"
				data-bs-target="#statingBackdropGrading"></button>

			{/* Modal */}
			{gradingModalOpen && (
				<div
					className="modal fade"
					id="statingBackdropGrading"
					data-bs-backdrop="static"
					data-bs-keyboard="false"
					tabIndex="-1"
					aria-labelledby="statingBackdropGradingLabel"
					aria-hidden="true">
					<div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
						<div className="modal-content">
							<div className="modal-header">
								<h1
									className="modal-title fs-5"
									id="statingBackdropGradingLabel">
									Edit Grade
								</h1>
								<button
									ref={gradingModalBtnClose}
									type="button"
									className="btn-close"
									data-bs-dismiss="modal"
									aria-label="Close"></button>
							</div>
							<div className="modal-body text-start">
								{/* Form */}
								<div className={`flex-grow-1 me-2 mb-1`}>
									<form onSubmit={onEditGrade}>
										{/* Grade */}
										<input
											type="number"
											placeholder="Enter Grade"
											className="form-control mb-2"
											max="100"
											min="0"
											onChange={(e) => setNewGrade(parseInt(e.target.value))}
										/>
										{/* Grade End */}

										{/* Comments */}
										<textarea
											placeholder="Add Comments"
											className="form-control mb-2"
											rows="5"
											onChange={(e) => setComments(e.target.value)}></textarea>
										{/* Comments End */}

										<div className="text-end">
											<Btn
												text="submit grade"
												loading={loading}
											/>
										</div>
									</form>
								</div>
								{/* Form End */}
							</div>
						</div>
					</div>
				</div>
			)}
			{/* Edit Grade Modal End */}

			{/* Data */}
			<div className="card shadow-sm p-2">
				<div className="d-flex justify-content-between">
					{/* Total */}
					<div className="d-flex justify-content-between w-100 align-items-center mx-4">
						<div>
							<span className="fs-4">{submissions.length}</span>
							<h4>Total Submissions</h4>
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
				</div>
			</div>
			{/* Filters End */}

			<br />
			{/* Tabs */}
			<div>
				<div className="d-flex justify-content-between flex-wrap mb-1">
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"Discussion Forum"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("Discussion Forum")}>
						Discussion Forum
					</div>
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"Submissions"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("Submissions")}>
						Submissions
					</div>
				</div>
			</div>
			{/* Tabs End */}

			<br />

			{/* Discussion Forum Table Start */}
			<div
				className={`table-responsive mb-5 pb-2 ${activeTab(
					"Discussion Forum"
				)}`}>
				<table className="table table-hover">
					<thead>
						<tr>
							<th className="frozen-column">Student</th>
							{/* Get the longest data and use it to loop throught the weeks */}
							{weeks?.map((week, key) => (
								<th key={key}>Week {week}</th>
							))}
							<th>Total</th>
						</tr>
					</thead>
					<tbody>
						{discussions?.map((discussion, key) => (
							<tr key={key}>
								<td className="frozen-column">
									<div className="d-flex">
										<div>{key + 1}</div>
										<Img
											src={discussion.userAvatar}
											className="rounded-circle mx-2"
											style={{ minWidth: "3em", height: "3em" }}
											alt="Avatar"
										/>
										<h6>{discussion.userName}</h6>
									</div>
								</td>
								{discussion.data.map((week, key) => (
									<td key={key}>
										<div className="d-flex justify-content-start">
											<div className="mx-1"> {week.ratings}</div>
											<div className="mx-1">
												<Btn
													text="edit"
													className={`btn-sm btn-secondary mb-1`}
													onClick={() => showRatingModal(week)}
													disabled={
														!week.gradedByInstructor
													}
												/>
											</div>
										</div>
									</td>
								))}
								<td>
									{discussion.data.reduce((acc, week) => acc + week.ratings, 0)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{/* Discussion Forum Table End */}

			{/* Submissions Table Start */}
			<div className={`table-responsive mb-5 pb-2 ${activeTab("Submissions")}`}>
				<table className="table table-hover">
					<thead>
						<tr>
							<th className="frozen-column">Student</th>
							<th>Discussion Forum</th>
							<th>Written Assignment</th>
							<th>Learning Reflection</th>
							<th>Self Quiz</th>
							<th>CAT 1</th>
							<th>CAT 2</th>
							<th>Review Quiz</th>
							<th>Final Exam</th>
							<th>Total</th>
						</tr>
					</thead>
					<tbody>
						{submissions?.map((submission, key) => (
							<tr key={key}>
								<td className="frozen-column">
									<div className="d-flex">
										<div>{key + 1}</div>
										<Img
											src={submission.avatar}
											className="rounded-circle mx-2"
											style={{ minWidth: "3em", height: "3em" }}
											alt="Avatar"
										/>
										<h6>{submission.userName}</h6>
									</div>
								</td>
								<td>
									<div className="d-flex justify-content-start">
										<div className="mx-1">{submission.discussionForum}</div>
										<div className="mx-1">
											<Btn
												text="edit"
												className={`btn-sm btn-secondary mb-1`}
												onClick={() =>
													showGradeModal(submission.discussionForum)
												}
											/>
										</div>
									</div>
								</td>
								<td>
									<div className="d-flex justify-content-between">
										<div className="mx-1">
											{submission.writtenAssignment.grade}
										</div>
										<div className="mx-1">
											<Btn
												text="edit"
												className={`btn-sm btn-secondary mb-1`}
												onClick={() =>
													showGradeModal(submission.writtenAssignment)
												}
												disabled={
													!submission.writtenAssignment.gradedByInstructor
												}
											/>
										</div>
									</div>
								</td>
								<td>
									<div className="d-flex justify-content-between">
										<div className="mx-1">
											{submission.learningReflection.grade}
										</div>
										<div className="mx-1">
											<Btn
												text="edit"
												className={`btn-sm btn-secondary mb-1`}
												onClick={() =>
													showGradeModal(submission.learningReflection)
												}
												disabled={
													!submission.learningReflection.gradedByInstructor
												}
											/>
										</div>
									</div>
								</td>
								<td>{submission.selfQuiz}</td>
								<td>{submission.cat1}</td>
								<td>{submission.cat2}</td>
								<td>{submission.reviewQuiz}</td>
								<td>{submission.finalExam}</td>
								<td>{getSubmissionsTotal(submission)}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{/* Submissions Table End */}
		</div>
	)
}

export default index
