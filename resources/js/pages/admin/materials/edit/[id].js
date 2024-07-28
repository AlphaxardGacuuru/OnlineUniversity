import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond"

// Import FilePond styles
import "filepond/dist/filepond.min.css"

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"
import FilePondPluginImageCrop from "filepond-plugin-image-crop"
import FilePondPluginImageTransform from "filepond-plugin-image-transform"
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"

// Register the plugins
registerPlugin(
	FilePondPluginImageExifOrientation,
	FilePondPluginImagePreview,
	FilePondPluginFileValidateType,
	FilePondPluginImageCrop,
	FilePondPluginImageTransform,
	FilePondPluginFileValidateSize
)

const edit = (props) => {
	var { id } = useParams()

	const [material, setMaterial] = useState({})
	const [title, setTitle] = useState(material.title)
	const [description, setDescription] = useState()
	const [week, setWeek] = useState("")
	const [startsAt, setStartsAt] = useState()
	const [endsAt, setEndsAt] = useState()
	const [richText, setRichText] = useState("")
	const [media, setMedia] = useState("")
	const [loading, setLoading] = useState()

	const questionPrototype = {
		question: "",
		answerA: "",
		answerB: "",
		answerC: "",
		answerD: "",
		correctAnswer: "",
	}
	const [questions, setQuestions] = useState([questionPrototype])
	const [time, setTime] = useState()

	// Get Faculties and Departments
	useEffect(() => {
		// Set page
		props.setPage({
			name: "Edit Learning Resource",
			path: ["courses", "create"],
		})

		// Fetch Material
		Axios.get(`/api/materials/${id}`)
			.then((res) => {
				setMaterial(res.data.data)
				setRichText(res.data.data.richText)
				setTitle(res.data.data.title)
				setQuestions(res.data.data.questions.questions)
				setTime(res.data.data.questions.time)
				// Set page
				props.setPage({
					name: "Edit Learning Resource",
					path: ["courses", `units/${res.data.data.unitId}/show`, "create"],
				})
			})
			.catch((err) => props.getErrors(err))
	}, [])

	/*
	 * Types
	 */
	const titles = [
		"Learning Guide",
		"Discussion Forum",
		"Written Assignment",
		"Learning Reflection",
		"Self-Quiz",
		"CAT 1",
		"CAT 2",
		"Review Quiz",
		"Final Exam",
	]

	/*
	 * Remove question
	 */
	const removeQuestion = (index) => {
		var newQuestions = questions.filter((question, key) => key != index)
		// Remove input inorder for input values to reflect
		setQuestions([])
		// Set questions with removed input
		setTimeout(() => setQuestions(newQuestions), 100)
	}

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		// Add meta to questions
		var questionsWithMeta = { time: time, questions: questions }

		setLoading(true)

		Axios.put(`/api/materials/${id}`, {
			title: title,
			description: description,
			week: week,
			startsAt: startsAt,
			endsAt: endsAt,
			richText: richText,
			media: media,
			questions: questionsWithMeta,
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])
				// Reload page
				window.location.reload()
			})
			.catch((err) => {
				setLoading(false)
				// Get Errors
				props.getErrors(err)
			})
	}

	return (
		<div className="row">
			<div className="col-sm-2"></div>
			<div className="col-sm-8">
				<form
					onSubmit={onSubmit}
					className="my-5">
					{/* Title Start */}
					<select
						type="text"
						name="title"
						className="form-control mb-2 me-2"
						onChange={(e) => setTitle(e.target.value)}>
						<option value="">Choose Learning Resource</option>
						{titles.map((title, key) => (
							<option
								key={key}
								value={title}
								selected={material.title == title && true}>
								{title}
							</option>
						))}
					</select>
					{/* Title End */}

					{/* Description Start */}
					<input
						type="text"
						name="description"
						defaultValue={material.description}
						className="form-control mb-2 me-2"
						onChange={(e) => setDescription(e.target.value)}
					/>
					{/* Description End */}

					{/* Week Start */}
					<input
						type="number"
						name="week"
						defaultValue={material.week}
						className="form-control mb-2 me-2"
						onChange={(e) => setWeek(e.target.value)}
					/>
					{/* Week End */}

					{/* Week Start Date Start */}
					<label
						htmlFor=""
						className="ms-1">
						Week Start Date
					</label>
					<input
						type="date"
						name="startsAt"
						defaultValue={material.startsAt}
						className="form-control mb-2 me-2"
						onChange={(e) => setStartsAt(e.target.value)}
					/>
					{/* Week Start Date End */}

					{/* Week End Date Start */}
					<label
						htmlFor=""
						className="ms-1">
						Week End Date
					</label>
					<input
						type="date"
						name="endsAt"
						defaultValue={material.endsAt}
						className="form-control mb-2 me-2"
						onChange={(e) => setEndsAt(e.target.value)}
					/>
					{/* Week End Date End */}

					{/* Text Box Start */}
					{[
						"Learning Guide",
						"Discussion Forum",
						"Written Assignment",
						"Learning Reflection",
					].includes(title) && (
						<React.Fragment>
							<div className="bg-white">
								<ReactQuill
									theme="snow"
									value={richText}
									onChange={setRichText}
								/>
							</div>
							{/* Text Box End */}

							{/* Media Start */}
							<h6 className="p-2">Add Media</h6>
							<div className="card shadow-sm p-2">
								<FilePond
									name="filepond-thumbnail"
									labelIdle='Drag & Drop your Image or <span class="filepond--label-action text-dark"> Browse </span>'
									imageCropAspectRatio="16:9"
									// acceptedFileTypes={["*"]}
									// stylePanelAspectRatio="16:9"
									allowRevert={true}
									server={{
										url: `${props.url}/api/filepond`,
										process: {
											url: "/materials",
											onload: (res) => setMedia(res),
											onerror: (err) => console.log(err.response.data),
										},
										revert: {
											url: `/materials/${media.substr(17)}`,
											onload: (res) => props.setMessages([res]),
										},
									}}
								/>
							</div>
							<br />
							<br />
						</React.Fragment>
					)}
					{/* Media End */}

					{/* Multi Choice Start */}
					{[
						"Self-Quiz",
						"CAT 1",
						"CAT 2",
						"Review Quiz",
						"Final Exam",
					].includes(title) && (
						<React.Fragment>
							{/* Time Start */}
							<input
								type="number"
								placeholder="Quiz Time in minutes"
								className="form-control mb-2"
								defaultValue={time}
								onChange={(e) => setTime(e.target.value)}
								required={true}
							/>
							{/* Time End */}

							{questions.map((question, key) => (
								<div
									key={key}
									className="card bg-secondary-subtle my-2 p-2">
									{/* Label Start */}
									<div className="d-flex justify-content-between">
										<label htmlFor="">
											<h5>Question {key + 1}</h5>
										</label>
										{key > 0 && (
											<Btn
												text="remove question"
												className="btn-sm mb-2"
												onClick={(e) => {
													e.preventDefault()
													removeQuestion(key)
												}}
											/>
										)}
									</div>
									{/* Label End */}

									{/* Question Start */}
									<input
										type="text"
										placeholder="Which of the below is..."
										className="form-control mb-2"
										defaultValue={questions[key].question}
										onChange={(e) => {
											questions[key] = {
												question: e.target.value,
												answerA: questions[key].answerA,
												answerB: questions[key].answerB,
												answerC: questions[key].answerC,
												answerD: questions[key].answerD,
												correctAnswer: questions[key].correctAnswer,
											}
											setQuestions(questions)
										}}
										required={true}
									/>
									{/* Question End */}

									{/* Answers Start */}
									<label htmlFor="">Answers</label>
									<input
										type="text"
										placeholder="Answer A"
										className="form-control mb-2"
										defaultValue={questions[key].answerA}
										onChange={(e) => {
											questions[key] = {
												question: questions[key].question,
												answerA: e.target.value,
												answerB: questions[key].answerB,
												answerC: questions[key].answerC,
												answerD: questions[key].answerD,
												correctAnswer: questions[key].correctAnswer,
											}
											setQuestions(questions)
										}}
										required={true}
									/>
									<input
										type="text"
										placeholder="Answer B"
										className="form-control mb-2"
										defaultValue={questions[key].answerB}
										onChange={(e) => {
											questions[key] = {
												question: questions[key].question,
												answerA: questions[key].answerA,
												answerB: e.target.value,
												answerC: questions[key].answerC,
												answerD: questions[key].answerD,
												correctAnswer: questions[key].correctAnswer,
											}
											setQuestions(questions)
										}}
										required={true}
									/>
									<input
										type="text"
										placeholder="Answer C"
										className="form-control mb-2"
										defaultValue={questions[key].answerC}
										onChange={(e) => {
											questions[key] = {
												question: questions[key].question,
												answerA: questions[key].answerA,
												answerB: questions[key].answerB,
												answerC: e.target.value,
												answerD: questions[key].answerD,
												correctAnswer: questions[key].correctAnswer,
											}
											setQuestions(questions)
										}}
										required={true}
									/>
									<input
										type="text"
										placeholder="Answer D"
										className="form-control mb-2"
										defaultValue={questions[key].answerD}
										onChange={(e) => {
											questions[key] = {
												question: questions[key].question,
												answerA: questions[key].answerA,
												answerB: questions[key].answerB,
												answerC: questions[key].answerC,
												answerD: e.target.value,
												correctAnswer: questions[key].correctAnswer,
											}
											setQuestions(questions)
										}}
										required={true}
									/>
									<select
										className="form-control mb-2"
										onChange={(e) => {
											questions[key] = {
												question: questions[key].question,
												answerA: questions[key].answerA,
												answerB: questions[key].answerB,
												answerC: questions[key].answerC,
												answerD: questions[key].answerD,
												correctAnswer: e.target.value,
											}
											setQuestions(questions)
										}}
										required={true}>
										<option value="">Select Correct Answer</option>
										<option
											value="A"
											selected={questions[key].correctAnswer == "A"}>
											A
										</option>
										<option
											value="B"
											selected={questions[key].correctAnswer == "B"}>
											B
										</option>
										<option
											value="C"
											selected={questions[key].correctAnswer == "C"}>
											C
										</option>
										<option
											value="D"
											selected={questions[key].correctAnswer == "D"}>
											D
										</option>
									</select>
									{/* Answers End */}

									{/* Add Question Start */}
									{key == questions.length - 1 && (
										<div className="d-flex justify-content-end">
											<Btn
												text="add question"
												className="btn-sm mb-2"
												onClick={(e) => {
													e.preventDefault()
													setQuestions([...questions, questionPrototype])
												}}
											/>
										</div>
									)}
									{/* Add Question End */}
								</div>
							))}
						</React.Fragment>
					)}
					{/* Multi Choice End */}

					<div className="d-flex justify-content-end mb-2">
						<Btn
							text="update learning resource"
							loading={loading}
						/>
					</div>
					<div className="d-flex justify-content-center">
						<MyLink
							linkTo={`/units/${material.unitId}/show`}
							text="back to unit"
						/>
					</div>
					<div className="col-sm-2"></div>
				</form>
			</div>
		</div>
	)
}

export default edit
