import React, { useEffect, useState } from "react"
import {
	useHistory,
	useParams,
} from "react-router-dom/cjs/react-router-dom.min"

import Btn2 from "@/components/Core/Btn2"
import MyLink2 from "@/components/Core/MyLink2"

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

const create = (props) => {
	var { id } = useParams()
	var history = useHistory()

	const [name, setName] = useState()
	const [description, setDescription] = useState()
	const [type, setType] = useState()
	const [media, setMedia] = useState("")
	const [loading, setLoading] = useState()

	// Get Faculties and Departments
	useEffect(() => {
		// Set page
		props.setPage({ name: "Add Material", path: ["materials", "create"] })
	}, [])

	/*
	* Set Filepond Type
	*/
	var filepondType = () => {
		switch (type) {
			case "image":
				return ["image/*"]

			case "video":
				return ["video/*"]

			default:
				return ["application/pdf", ".docx", ".pptx"]
		}
	}

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.post("/api/materials", {
			name: name,
			description: description,
			type: type,
			media: media,
			unitId: id,
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])
				// Redirect to Profile
				setTimeout(() => history.push(`/instructor/units/${id}/show`), 500)
			})
			.catch((err) => {
				setLoading(false)
				// Get Errors
				props.getErrors(err)
			})
	}

	return (
		<div className="row">
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				<form onSubmit={onSubmit}>
					<input
						type="text"
						name="name"
						placeholder="Name"
						className="form-control mb-2 me-2"
						onChange={(e) => setName(e.target.value)}
						required={true}
					/>
					<input
						type="text"
						name="description"
						placeholder="Description"
						className="form-control mb-2 me-2"
						onChange={(e) => setDescription(e.target.value)}
						required={true}
					/>

					<select
						name="type"
						className="form-control mb-3 me-2"
						onChange={(e) => setType(e.target.value)}
						required={true}>
						<option value="">Select Type</option>
						<option value="file">File</option>
						<option value="image">Image</option>
						<option value="video">Video</option>
					</select>

					<div className="card shadow-sm p-2">
						<FilePond
							name="filepond-material"
							labelIdle='Drag & Drop your Image or <span class="filepond--label-action text-dark"> Browse </span>'
							imageCropAspectRatio="16:9"
							acceptedFileTypes={filepondType()}
							// stylePanelAspectRatio="16:9"
							allowRevert={true}
							server={{
								url: `/api/filepond`,
								process: {
									url: `/materials`,
									onload: (res) => setMedia(res),
									onerror: (err) => console.log(err.response.data),
								},
								revert: {
									url: `/materials/${media.substr(10)}`,
									onload: (res) => props.setMessages([res]),
								},
							}}
						/>
					</div>
					<br />
					<br />

					<div className="d-flex justify-content-end mb-2">
						<Btn2
							btnText="add materials"
							loading={loading}
						/>
					</div>

					<div className="d-flex justify-content-center">
						<MyLink2
							linkTo={`/instructor/units/${id}/show`}
							text="back to unit"
						/>
					</div>
					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default create
