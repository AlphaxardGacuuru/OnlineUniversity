import React, { useEffect, useState, useRef } from "react"
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

// FilePond
import { FilePond, registerPlugin } from "react-filepond"
import "filepond/dist/filepond.min.css"
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size"
import FilePondPluginImageCrop from "filepond-plugin-image-crop"
import FilePondPluginImageTransform from "filepond-plugin-image-transform"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"

// Register FilePond
registerPlugin(
	FilePondPluginImageExifOrientation,
	FilePondPluginImagePreview,
	FilePondPluginFileValidateType,
	FilePondPluginFileValidateSize,
	FilePondPluginImageCrop,
	FilePondPluginImageTransform
)

const Edit = (props) => {
	const { id } = useParams()
	const history = useHistory()

	const [material, setMaterial] = useState({})
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [week, setWeek] = useState("")
	const [startsAt, setStartsAt] = useState("")
	const [endsAt, setEndsAt] = useState("")
	const [richText, setRichText] = useState("")
	const [media, setMedia] = useState("")
	const [loading, setLoading] = useState(false)
	const [dataLoaded, setDataLoaded] = useState(false) // NEW: Track data loading

	// CKEditor Refs
	const editorRef = useRef(null)
	const editorInstanceRef = useRef(null)

	const questionPrototype = {
		question: "",
		answerA: "",
		answerB: "",
		answerC: "",
		answerD: "",
		correctAnswer: "",
	}

	const [questions, setQuestions] = useState([questionPrototype])
	const [time, setTime] = useState("")

	// ================== FETCH MATERIAL ===================
	useEffect(() => {
		props.setPage({
			name: "Edit Learning Resource",
			path: ["courses", "edit"],
		})

		Axios.get(`/api/materials/${id}`)
			.then((res) => {
				const data = res.data.data

				setMaterial(data)
				setTitle(data.title)
				setDescription(data.description)
				setWeek(data.week)
				setStartsAt(data.startsAt)
				setEndsAt(data.endsAt)
				setRichText(data.richText || "")
				setMedia(data.media || "")

				if (data.questions) {
					setQuestions(data.questions.questions)
					setTime(data.questions.time)
				}

				props.setPage({
					name: "Edit Learning Resource",
					path: ["courses", `units/${data.unitId}/show`, "edit"],
				})

				// NEW: Mark data as loaded
				setDataLoaded(true)
			})
			.catch((err) => props.getErrors(err))
	}, [])

	useEffect(() => {
		const editorTypes = [
			"Learning Guide",
			"Discussion Forum",
			"Written Assignment",
			"Learning Reflection",
		]

		if (!dataLoaded) return

		if (!editorTypes.includes(title)) {
			if (editorInstanceRef.current) {
				editorInstanceRef.current.destroy()
				editorInstanceRef.current = null
			}
			return
		}

		if (editorInstanceRef.current) {
			editorInstanceRef.current.destroy()
			editorInstanceRef.current = null
		}

		if (editorRef.current) {
			editorRef.current.innerHTML = ""
		}

		if (!window.ClassicEditor && !document.querySelector('script[src*="ckeditor"]')) {
			const script = document.createElement("script")
			script.src = "https://cdn.ckeditor.com/ckeditor5/40.0.0/classic/ckeditor.js"
			script.async = true
			script.onload = () => initEditor()
			document.head.appendChild(script)
		} else if (window.ClassicEditor) {
			initEditor()
		}

		function initEditor() {
			if (!editorRef.current || !window.ClassicEditor) return

			window.ClassicEditor.create(editorRef.current, {
				toolbar: [
					"heading",
					"|",
					"bold",
					"italic",
					"underline",
					"|",
					"link",
					"bulletedList",
					"numberedList",
					"|",
					"insertTable",
					"tableColumn",
					"tableRow",
					"mergeTableCells",
					"|",
					"blockQuote",
					"|",
					"undo",
					"redo",
				],
			})
				.then((editor) => {
					editorInstanceRef.current = editor
					editor.setData(richText || "")

					editor.model.document.on("change:data", () => {
						setRichText(editor.getData())
					})
				})
				.catch((err) => console.error("CKEditor error:", err))
		}

		// Cleanup
		return () => {
			if (editorInstanceRef.current) {
				editorInstanceRef.current.destroy()
				editorInstanceRef.current = null
			}
		}
	}, [title, dataLoaded]) 

	const removeQuestion = (index) => {
		const newQuestions = questions.filter((_, i) => i !== index)
		setQuestions([])
		setTimeout(() => setQuestions(newQuestions), 100)
	}

	// ================== SUBMIT ===================
	const onSubmit = (e) => {
		e.preventDefault()

		const questionsWithMeta = { time, questions }

		setLoading(true)

		Axios.put(`/api/materials/${id}`, {
			title,
			description,
			week,
			startsAt,
			endsAt,
			richText,
			media,
			questions: questions[0].question ? questionsWithMeta : null, // FIXED: Only send if questions exist
		})
			.then((res) => {
				setLoading(false)
				props.setMessages([res.data.message])
				setTimeout(() => history.push(`/admin/units/${material.unitId}/show`), 500)
			})
			.catch((err) => {
				setLoading(false)
				props.getErrors(err)
			})
	}

	// ================== UI ===================
	const titles = [
		"Learning Guide",
		"Discussion Forum",
		"Written Assignment",
		"Learning Reflection",
		"Self Quiz",
		"CAT 1",
		"CAT 2",
		"Review Quiz",
		"Final Exam",
	]

	return (
		<div className="row">
			<div className="col-sm-2"></div>

			<div className="col-sm-8 my-5">
				<form className="my-5" onSubmit={onSubmit}>
					{/* TYPE */}
					<select
						className="form-control mb-2"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required>
						<option value="">Choose Learning Resource</option>
						{titles.map((t, k) => (
							<option key={k} value={t}>
								{t}
							</option>
						))}
					</select>

					<input
						className="form-control mb-2"
						type="text"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Description"
					/>

					{/* WEEK - FIXED: Changed from defaultValue to value */}
					<input
						className="form-control mb-2"
						type="number"
						value={week}
						onChange={(e) => setWeek(e.target.value)}
						placeholder="Week"
						required
					/>

					{/* DATES - FIXED: Changed from defaultValue to value */}
					<label className="ms-1">Week Start Date</label>
					<input
						className="form-control mb-2"
						type="date"
						value={startsAt}
						onChange={(e) => setStartsAt(e.target.value)}
						required
					/>

					<label className="ms-1">Week End Date</label>
					<input
						className="form-control mb-2"
						type="date"
						value={endsAt}
						onChange={(e) => setEndsAt(e.target.value)}
						required
					/>

					{[
						"Learning Guide",
						"Discussion Forum",
						"Written Assignment",
						"Learning Reflection",
					].includes(title) && (
						<>
							<div className="bg-white" style={{ minHeight: "200px" }}>
								<div ref={editorRef}></div>
							</div>

							<h6 className="p-2 mt-3">Add Media</h6>

							<div className="card shadow-sm p-2">
								<FilePond
									name="filepond-thumbnail"
									labelIdle='Drag & Drop your Image or <span class="filepond--label-action text-dark">Browse</span>'
									imageCropAspectRatio="16:9"
									allowRevert={true}
									files={media ? [{
										source: `${props.url}${media}`,
										options: { type: 'local' }
									}] : []}
									server={{
										url: `${props.url}/api/filepond`,
										process: {
											url: "/materials",
											onload: (res) => setMedia(res),
										},
										revert: {
											url: `/materials/${media?.substr(17)}`,
											onload: (res) => {
												props.setMessages([res])
												setMedia("") 
											},
										},
										load: (source, load, error) => {
											fetch(source)
												.then(res => res.blob())
												.then(load)
												.catch(error)
										}
									}}
								/>

								{media && !media.startsWith('blob:') && (
									<div className="mt-2">
										<p className="text-muted small">Current media: {media.split('/').pop()}</p>
									</div>
								)}
							</div>

							<br />
							<br />
						</>
					)}

					{/* MULTIPLE CHOICE SECTION */}
					{["Self Quiz", "CAT 1", "CAT 2", "Review Quiz", "Final Exam"].includes(
						title
					) && (
						<>
							{/* TIME - FIXED: Changed from defaultValue to value */}
							<input
								className="form-control mb-2"
								type="number"
								value={time}
								onChange={(e) => setTime(e.target.value)}
								placeholder="Quiz Time in minutes"
								required
							/>

							{/* QUESTIONS */}
							{questions.map((question, key) => (
								<div key={key} className="card bg-secondary-subtle p-2 my-2">
									<div className="d-flex justify-content-between">
										<h5>Question {key + 1}</h5>
										{key > 0 && (
											<Btn
												text="remove question"
												className="btn-sm"
												onClick={(e) => {
													e.preventDefault()
													removeQuestion(key)
												}}
											/>
										)}
									</div>

									{/* FIXED: Changed from defaultValue to value */}
									<input
										className="form-control mb-2"
										placeholder="Which of the below is..."
										value={question.question}
										onChange={(e) => {
											questions[key].question = e.target.value
											setQuestions([...questions])
										}}
										required
									/>

									<label>Answers</label>

									{/* FIXED: Changed from defaultValue to value */}
									{["A", "B", "C", "D"].map((letter) => (
										<input
											key={letter}
											className="form-control mb-2"
											placeholder={`Answer ${letter}`}
											value={question[`answer${letter}`]}
											onChange={(e) => {
												questions[key][`answer${letter}`] = e.target.value
												setQuestions([...questions])
											}}
											required
										/>
									))}

									<select
										className="form-control mb-2"
										value={question.correctAnswer}
										onChange={(e) => {
											questions[key].correctAnswer = e.target.value
											setQuestions([...questions])
										}}
										required>
										<option value="">Select Correct Answer</option>
										<option value="A">A</option>
										<option value="B">B</option>
										<option value="C">C</option>
										<option value="D">D</option>
									</select>

									{key === questions.length - 1 && (
										<div className="d-flex justify-content-end">
											<Btn
												className="btn-sm"
												text="add question"
												onClick={(e) => {
													e.preventDefault()
													setQuestions([...questions, questionPrototype])
												}}
											/>
										</div>
									)}
								</div>
							))}
						</>
					)}

					<div className="d-flex justify-content-end mb-2">
						<Btn text="update learning resource" loading={loading} />
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

export default Edit