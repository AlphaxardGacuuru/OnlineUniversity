import React, { useEffect, useState, useRef } from "react"
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

// FilePond
import { FilePond, registerPlugin } from "react-filepond"
import "filepond/dist/filepond.min.css"
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"
import FilePondPluginImageCrop from "filepond-plugin-image-crop"
import FilePondPluginImageTransform from "filepond-plugin-image-transform"
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"

registerPlugin(
	FilePondPluginImageExifOrientation,
	FilePondPluginImagePreview,
	FilePondPluginFileValidateType,
	FilePondPluginImageCrop,
	FilePondPluginImageTransform,
	FilePondPluginFileValidateSize
)

const Create = (props) => {
	const { id } = useParams()
	const history = useHistory()

	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [week, setWeek] = useState("")
	const [startsAt, setStartsAt] = useState("")
	const [endsAt, setEndsAt] = useState("")
	const [richText, setRichText] = useState("")
	const [media, setMedia] = useState("")
	const [loading, setLoading] = useState(false)
	const [files, setFiles] = useState([])

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

	// Set Page
	useEffect(() => {
		props.setPage({
			name: "Add Learning Resource",
			path: ["courses", `units/${id}/show`, "create"],
		})
	}, [])

	useEffect(() => {
		const editorTypes = [
			"Learning Guide",
			"Discussion Forum",
			"Written Assignment",
			"Learning Reflection",
		]

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

		return () => {
			if (editorInstanceRef.current) {
				editorInstanceRef.current.destroy()
				editorInstanceRef.current = null
			}
		}
	}, [title])

	// Remove Question
	const removeQuestion = (index) => {
		const newQuestions = questions.filter((_, key) => key !== index)
		setQuestions([])
		setTimeout(() => setQuestions(newQuestions), 100)
	}

	const handleFilesUpdate = (fileItems) => {
		setFiles(fileItems)
		if (fileItems.length === 0 && media) {
			setMedia("")
		}
	}

	const onSubmit = (e) => {
		e.preventDefault()

		const questionsWithMeta = { time, questions }

		setLoading(true)

		Axios.post("/api/materials", {
			title,
			description,
			week,
			startsAt,
			endsAt,
			richText,
			media,
			questions: questions[0].question && questionsWithMeta,
			unitId: id,
		})
			.then((res) => {
				setLoading(false)
				props.setMessages([res.data.message])
				setTimeout(() => history.push(`/admin/units/${id}/show`), 500)
			})
			.catch((err) => {
				setLoading(false)
				props.getErrors(err)
			})
	}

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
				<form onSubmit={onSubmit} className="my-5">
					{/* TITLE */}
					<select
						className="form-control mb-2"
						onChange={(e) => setTitle(e.target.value)}
						required>
						<option value="">Choose Learning Resource</option>
						{titles.map((t, key) => (
							<option key={key} value={t}>
								{t}
							</option>
						))}
					</select>

					{/* DESCRIPTION */}
					<input
						type="text"
						className="form-control mb-2"
						placeholder="Description"
						onChange={(e) => setDescription(e.target.value)}
					/>

					{/* WEEK */}
					<input
						type="number"
						className="form-control mb-2"
						placeholder="Week"
						onChange={(e) => setWeek(e.target.value)}
						required
					/>

					{/* DATES */}
					<label className="ms-1">Week Start Date</label>
					<input
						type="date"
						className="form-control mb-2"
						onChange={(e) => setStartsAt(e.target.value)}
						required
					/>

					<label className="ms-1">Week End Date</label>
					<input
						type="date"
						className="form-control mb-2"
						onChange={(e) => setEndsAt(e.target.value)}
						required
					/>

					{/* RICH TEXT TYPES */}
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
									files={files}
									onupdatefiles={handleFilesUpdate}
									allowMultiple={false}
									maxFiles={1}
									name="filepond-thumbnail"
									labelIdle='Drag & Drop your Image or <span class="filepond--label-action text-dark">Browse</span>'
									imageCropAspectRatio="16:9"
									allowRevert={true}
									acceptedFileTypes={['image/*']}
									allowImagePreview={true}
									imagePreviewMaxHeight={200}
									instantUpload={true}
									server={{
										url: `${props.url}/api/filepond`,
										process: {
											url: "/materials",
											onload: (res) => {
												setMedia(res)
												return res
											},
											onerror: (err) => {
												console.error('Upload error:', err)
												props.setErrors(['Failed to upload media'])
											}
										},
										revert: {
											url: `/materials/${media?.substr(17)}`,
											onload: (res) => {
												props.setMessages([res])
												setMedia("")
												return res
											},
										},
									}}
								/>
								
								{media && (
									<div className="alert alert-success mt-2 py-2 mb-0">
										<small>✓ Media uploaded successfully: {media.split('/').pop()}</small>
									</div>
								)}
							</div>

							<br />
							<br />
						</>
					)}

					{/* QUIZ TYPES */}
					{[
						"Self Quiz",
						"CAT 1",
						"CAT 2",
						"Review Quiz",
						"Final Exam",
					].includes(title) && (
						<>
							<input
								type="number"
								className="form-control mb-2"
								placeholder="Quiz Time in minutes"
								onChange={(e) => setTime(e.target.value)}
								required
							/>

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

									<input
										type="text"
										className="form-control mb-2"
										placeholder="Which of the below is..."
										onChange={(e) => {
											questions[key].question = e.target.value
											setQuestions([...questions])
										}}
										required
									/>

									<label>Answers</label>

									{["A", "B", "C", "D"].map((letter) => (
										<input
											key={letter}
											type="text"
											className="form-control mb-2"
											placeholder={`Answer ${letter}`}
											onChange={(e) => {
												questions[key][`answer${letter}`] = e.target.value
												setQuestions([...questions])
											}}
											required
										/>
									))}

									<select
										className="form-control mb-2"
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
												text="add question"
												className="btn-sm"
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
						<Btn text="add learning resource" loading={loading} />
					</div>

					<div className="d-flex justify-content-center">
						<MyLink linkTo={`/units/${id}/show`} text="back to unit" />
					</div>
				</form>
			</div>
		</div>
	)
}

export default Create