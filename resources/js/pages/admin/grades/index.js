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

	const [submissions, setSubmissions] = useState([])
	const [discussions, setDiscussions] = useState([])
	const [weeks, setWeeks] = useState([])

	const [unitSession] = (props.auth?.unitSessions || [{}])
		.filter((unitSession) => unitSession.unitId == id)
		.map((unitSession) => unitSession)

	const [nameQuery, setNameQuery] = useState("")

	const [tab, setTab] = useState("Discussion Forum")

	useEffect(() => {
		// Fetch Submissions
		props.get(
			`grade-book-submissions/${id}?sessionId=${unitSession?.sessionId || ""}&
			name=${nameQuery}`,
			setSubmissions
		)

		// Fetch Discussions
		Axios.get(
			`/api/grade-book-discussions/${id}?sessionId=${
				unitSession?.sessionId || ""
			}&
			name=${nameQuery}`
		)
			.then((res) => {
				console.log(res.data.data)
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
	}, [])

	const active = (activeTab) => {
		return activeTab == tab ? "bg-light" : "bg-secondary-subtle"
	}

	const activeTab = (activeTab) => {
		return activeTab == tab ? "d-block" : "d-none"
	}

	const getSubmissionsTotal = (submission) =>
		submission.discussionForum +
		submission.writtenAssignment +
		submission.learningReflection +
		submission.selfQuiz +
		submission.cat1 +
		submission.cat2 +
		submission.reviewQuiz +
		submission.finalExam

	return (
		<div>
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
							{weeks.map((week, key) => (
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
											src={discussion.avatar}
											className="rounded-circle mx-2"
											style={{ minWidth: "3em", height: "3em" }}
											alt="Avatar"
										/>
										<h6>{discussion.userName}</h6>
									</div>
								</td>
								{discussion.data.map((week, key) => (
									<td key={key}>{week.ratings}</td>
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
								<td>{submission.discussionForum}</td>
								<td>{submission.writtenAssignment}</td>
								<td>{submission.learningReflection}</td>
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
