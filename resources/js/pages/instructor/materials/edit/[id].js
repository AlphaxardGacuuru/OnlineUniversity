import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

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

const edit = (props) => {
	var { id } = useParams()

	const [material, setMaterial] = useState({})
	const [name, setName] = useState()
	const [description, setDescription] = useState()
	const [type, setType] = useState()
	const [media, setMedia] = useState("media")
	const [loading, setLoading] = useState()

	// Get Faculties and Departments
	useEffect(() => {
		// Set page
		props.setPage({ name: "Edit Material", path: ["materials", "edit"] })

		Axios.get(`/api/materials/${id}`).then((res) => {
			setMaterial(res.data.data)
			setType(res.data.data.type)
		})
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
		Axios.put(`/api/materials/${id}`, {
			name: name,
			description: description,
			type: type,
			media: media,
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])
				// Reload
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
			<div className="col-sm-4"></div>
			<div className="col-sm-4">
				<form onSubmit={onSubmit}>
					<input
						type="text"
						name="name"
						placeholder={material.name}
						className="form-control mb-2 me-2"
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						type="text"
						name="description"
						placeholder={material.description}
						className="form-control mb-2 me-2"
						onChange={(e) => setDescription(e.target.value)}
					/>

					<select
						name="gender"
						className="form-control mb-3 me-2"
						onChange={(e) => setType(e.target.value)}
						required={true}>
						<option value="">Select Type</option>
						<option
							value="file"
							selected={material.type == "file"}>
							File
						</option>
						<option
							value="image"
							selected={material.type == "image"}>
							Image
						</option>
						<option
							value="video"
							selected={material.type == "video"}>
							Video
						</option>
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
							btnText="update"
							loading={loading}
						/>
					</div>

					<center>
						<MyLink2
							linkTo={`/instructor/units/${material.unitId}/show`}
							text="back to unit"
						/>
					</center>

					<div className="col-sm-4"></div>
				</form>
			</div>
		</div>
	)
}

export default edit