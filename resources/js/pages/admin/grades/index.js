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

	const [submissions, setSubmissions] = useState([])

	const [nameQuery, setNameQuery] = useState("")

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
						"submissions",
					],
				})
				setUnit(res.data.data)
			})
			.catch((err) => props.setErrors([`Failed to fetch unit/${id}`]))

		// Fetch Submissions
		props.getPaginated(
			`submissions?unitId=${id}
			name=${nameQuery}`,
			setSubmissions
		)
	}, [])
	return (
		<div>
			{/* Data */}
			<div className="card shadow-sm p-2">
				<div className="d-flex justify-content-between">
					{/* Total */}
					<div className="d-flex justify-content-between w-100 align-items-center mx-4">
						<div>
							<span className="fs-4">{submissions.meta?.total}</span>
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

			<div className="table-responsive mb-5 pb-2">
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
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{submissions.data?.map((submission, key) => (
							<tr key={key}>
								<td className="frozen-column">
									<div className="d-flex">
										<div>{props.iterator(key, submissions)}</div>
										<Img
											src={submission.avatar}
											className="rounded-circle mx-2"
											style={{ minWidth: "3em", height: "3em" }}
											alt="Avatar"
										/>
										<h6>{submission.name}</h6>
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
								<td className="text-end">
									<div className="d-flex">
										{/* View Start */}
										<MyLink
											linkTo={`/submissions/${submission.id}/show`}
											text="view"
											className="btn-sm me-1"
										/>
										{/* View End */}

										{location.pathname.match("/admin/") &&
											location.pathname.match("/students") && (
												<React.Fragment>
													{/* Edit Start */}
													<MyLink
														linkTo={`/submissions/${submission.id}/edit`}
														text="edit"
														className="btn-sm"
													/>
													{/* Edit End */}

													<div className="mx-1">
														<DeleteModal
															index={`submission${key}`}
															model={submission}
															modelName="Submission"
															onDelete={onDeleteSubmission}
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
					list={submissions}
					getPaginated={props.getPaginated}
					setState={setSubmissions}
				/>
				{/* Pagination Links End */}
			</div>
		</div>
	)
}

export default index
