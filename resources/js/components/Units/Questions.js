import React, { useEffect, useState } from "react"

import Btn from "@/components/Core/Btn"

const Questions = (props) => {
	const [attempting, setAttempting] = useState(false)
	const [time, setTime] = useState(props.questions.time * 60)

	const [canAttempt, setCanAttempt] = useState()
	const [canReview, setCanReview] = useState()

	const [answers, setAnswers] = useState([])

	useEffect(() => {
		Axios.get(
			`api/submissions?
			sessionId=${props.sessionId}&
			unitId=${props.unitId}&
			materialId=${props.materialId}&
			userId=${props.auth.id}`
		)
			.then((res) => {
				setCanAttempt(res.data.data.length == 0)
				if (res.data.data[0]) {
					setAnswers(res.data.data[0].answers)
					setCanReview(true)
				}
			})
			.catch((err) => props.getErrors(err))

		return () => {
			setAttempting(false)
			setTime(props.questions.time * 60)
			setCanAttempt(false)
			setCanReview(false)
			setAnswers([])
		}
	}, [props.materialId])

	/*
	 * Handle Timer
	 */
	useEffect(() => {
		let intervalId
		if (attempting) {
			intervalId = setInterval(() => {
				setTime((prevTime) => {
					if (prevTime > 0) {
						return prevTime - 1
					} else {
						clearInterval(intervalId)
						setAttempting(false)
						return 0
					}
				})
			}, 1000)
		} else if (!attempting && time !== 0) {
			clearInterval(intervalId)
		}
		return () => clearInterval(intervalId)
	}, [props.materialId, attempting, time])

	const minutes = Math.floor(time / 60)
	const seconds = time % 60

	/*
	 * Submit Answers
	 */
	const onAnswer = () => {
		Axios.post(`api/submissions`, {
			sessionId: props.sessionId,
			unitId: props.unitId,
			materialId: props.materialId,
			type: props.materialTab,
			answers: answers,
		})
			.then((res) => props.setMessages([res.data.message]))
			.catch((err) => props.getErrors(err))
	}

	var counter = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`

	return (
		<React.Fragment>
			<div className="card shadow-sm mb-2 py-2 px-3">
				<div className="d-flex justify-content-between">
					<h6>Time Remaining: {canAttempt ? counter : "0:0"}</h6>
					{attempting ? (
						<Btn
							text="finish attempt"
							className="btn-sm btn-danger ms-2"
							onClick={() => {
								setAttempting(false)
							}}
						/>
					) : (
						<React.Fragment>
							{/* Modal Start */}
							<div
								className="modal fade"
								id="exampleModal"
								tabIndex="-1"
								aria-labelledby="exampleModalLabel"
								aria-hidden="true">
								<div className="modal-dialog">
									<div className="modal-content">
										<div className="modal-header">
											<h1
												className="modal-title fs-5"
												id="exampleModalLabel">
												Before you attempt
											</h1>
											<button
												type="button"
												className="btn-close"
												data-bs-dismiss="modal"
												aria-label="Close"></button>
										</div>
										<div className="modal-body">
											Once you start your attempt you cannot attempt it again!
										</div>
										<div className="modal-footer">
											<button
												type="button"
												className="btn btn-secondary rounded-pill"
												data-bs-dismiss="modal">
												Close
											</button>
											<button
												type="button"
												className="btn btn-primary rounded-pill"
												data-bs-dismiss="modal"
												onClick={() => setAttempting(true)}>
												Start Attempt
											</button>
										</div>
									</div>
								</div>
							</div>
							{/* Modal End */}
							{time > 0 && canAttempt ? (
								<button
									type="button"
									className="btn btn-primary btn-sm btn-success rounded-pill ms-2"
									data-bs-toggle="modal"
									data-bs-target="#exampleModal">
									Start Attempt
								</button>
							) : (
								<React.Fragment>
									{canReview && (
										<Btn
											text={`reviewing ${props.materialTab}`}
											className="btn-sm btn-danger ms-2"
										/>
									)}
								</React.Fragment>
							)}
						</React.Fragment>
					)}
				</div>
			</div>
			{attempting ? (
				<React.Fragment>
					{props.questions.questions?.map((question, key) => (
						<div
							key={key}
							className="card shadow-sm me-1 mb-2 py-2 px-3">
							<h5>Question {key + 1}</h5>
							<h6>{question.question}</h6>
							<form action="">
								<label className="d-block">
									<input
										type="radio"
										name={`answer${key}`}
										value="A"
										className="me-1"
										onChange={(e) => {
											answers[key] = {
												student: e.target.value,
												correct: question.correctAnswer,
											}
											setAnswers(answers)
											// Submit Answers
											onAnswer()
										}}
									/>
									{question.answerA}
								</label>
								<label className="d-block">
									<input
										type="radio"
										name={`answer${key}`}
										value="B"
										className="me-1"
										onChange={(e) => {
											answers[key] = {
												student: e.target.value,
												correct: question.correctAnswer,
											}
											setAnswers(answers)
											// Submit Answers
											onAnswer()
										}}
									/>
									{question.answerB}
								</label>
								<label className="d-block">
									<input
										type="radio"
										name={`answer${key}`}
										value="C"
										className="me-1"
										onChange={(e) => {
											answers[key] = {
												student: e.target.value,
												correct: question.correctAnswer,
											}
											setAnswers(answers)
											// Submit Answers
											onAnswer()
										}}
									/>
									{question.answerC}
								</label>
								<label className="d-block">
									<input
										type="radio"
										name={`answer${key}`}
										value="D"
										className="me-1"
										onChange={(e) => {
											answers[key] = {
												student: e.target.value,
												correct: question.correctAnswer,
											}
											setAnswers(answers)
											// Submit Answers
											onAnswer()
										}}
									/>
									{question.answerD}
								</label>
							</form>
						</div>
					))}
				</React.Fragment>
			) : (
				<React.Fragment>
					{canReview && (
						<React.Fragment>
							{props.questions.questions?.map((question, key) => (
								<div
									key={key}
									className="card shadow-sm me-1 mb-2 py-2 px-3">
									<h5>Question {key + 1}</h5>
									<h6>{question.question}</h6>
									<form action="">
										<label className="d-block">
											<input
												type="radio"
												name={`answer${key}`}
												value="A"
												className="me-1"
												checked={answers[key]?.student == "A"}
												disabled={true}
											/>
											{question.answerA}
										</label>
										<label className="d-block">
											<input
												type="radio"
												name={`answer${key}`}
												value="B"
												className="me-1"
												checked={answers[key]?.student == "B"}
												disabled={true}
											/>
											{question.answerB}
										</label>
										<label className="d-block">
											<input
												type="radio"
												name={`answer${key}`}
												value="C"
												className="me-1"
												checked={answers[key]?.student == "C"}
												disabled={true}
											/>
											{question.answerC}
										</label>
										<label className="d-block">
											<input
												type="radio"
												name={`answer${key}`}
												value="D"
												className="me-1"
												checked={answers[key]?.student == "D"}
												disabled={true}
											/>
											{question.answerD}
										</label>
										<small className="text-success text-bold">
											Correct Answer: {question.correctAnswer}
										</small>
									</form>
								</div>
							))}
						</React.Fragment>
					)}
				</React.Fragment>
			)}
		</React.Fragment>
	)
}

export default Questions
