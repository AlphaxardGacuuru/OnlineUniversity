import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

import Countries from "@/components/Core/Countries"

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
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"

// Register the plugins
registerPlugin(
	FilePondPluginImageExifOrientation,
	FilePondPluginImagePreview,
	FilePondPluginFileValidateType,
	FilePondPluginImageCrop,
	FilePondPluginImageTransform
)

const edit = (props) => {
	var { id } = useParams()

	const [staff, setStaff] = useState({})
	const [roles, setRoles] = useState([])
	const [userRoles, setUserRoles] = useState([])

	const [name, setName] = useState()
	const [email, setEmail] = useState()
	const [phone, setPhone] = useState()
	const [gender, setGender] = useState()
	const [originLocation, setOriginLocation] = useState()
	const [currentLocation, setCurrentLocation] = useState()
	const [loading, setLoading] = useState()

	// Get Faculties and Departments
	useEffect(() => {
		// Set page
		props.setPage({ name: "Edit Staff", path: ["staff", "edit"] })
		// Fetch Staff
		Axios.get(`api/staff/${id}`).then((res) => {
			setStaff(res.data.data)
			setUserRoles(res.data.data.roles.map((role) => role.id))
		})
		// Fetch Roles
		props.get("roles", setRoles)
	}, [])

	// Handle Permission checkboxes
	const handleUserRoles = (roleId) => {
		var exists = userRoles.includes(roleId)

		var newRoles = exists
			? userRoles.filter((item) => item != roleId)
			: [...userRoles, roleId]

		setUserRoles(newRoles)
	}

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.put(`/api/staff/${id}`, {
			name: name,
			email: email,
			phone: phone,
			gender: gender,
			originLocation: originLocation,
			currentLocation: currentLocation,
			userRoles: userRoles,
		})
			.then((res) => {
				setLoading(false)
				// Show messages
				props.setMessages([res.data.message])
			})
			.catch((err) => {
				setLoading(false)
				// Get Errors
				props.getErrors(err)
			})
	}

	return (
		<form onSubmit={onSubmit}>
			<div className="row">
				<div className="col-sm-4">
					<center>
						<div className="card shadow p-4 mb-4 text-center">
							<div className="m-3">
								<div className="avatar-container">
									<FilePond
										name="filepond-avatar"
										labelIdle='Drag & Drop your Profile Picture or <span class="filepond--label-action text-dark"> Browse </span>'
										stylePanelLayout="compact circle"
										imageCropAspectRatio="1:1"
										acceptedFileTypes={["image/*"]}
										stylePanelAspectRatio="1:1"
										allowRevert={false}
										server={{
											url: `/api/filepond`,
											process: {
												url: `/avatar/${staff.id}`,
												onload: (res) => {
													props.setMessages([res])
													// Update Auth
													props.get("auth", props.setAuth, "auth")
												},
												onerror: (err) => console.log(err.response),
											},
										}}
									/>
								</div>
							</div>
						</div>
					</center>
				</div>
				<div className="col-sm-4">
					<input
						type="text"
						name="name"
						placeholder={staff.name}
						className="form-control mb-2 me-2"
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						type="text"
						name="email"
						placeholder={staff.email}
						className="form-control mb-2 me-2"
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="tel"
						name="phone"
						placeholder={staff.phone}
						className="form-control mb-2 me-2"
						onChange={(e) => setPhone(e.target.value)}
					/>

					<select
						name="gender"
						className="form-control mb-3 me-2"
						onChange={(e) => setGender(e.target.value)}>
						<option value="">Select Gender</option>
						<option
							value="male"
							selected={staff.gender == "male"}>
							Male
						</option>
						<option
							value="female"
							selected={staff.gender == "female"}>
							Female
						</option>
					</select>

					<select
						type="text"
						name="nationality"
						className="form-control mb-2 me-2"
						onChange={(e) => setOriginLocation(e.target.value)}>
						<option value="">Nationality</option>
						{Countries().map((country, key) => (
							<option
								key={key}
								value={country}
								selected={staff.originLocation == country}>
								{country}
							</option>
						))}
					</select>

					<select
						type="text"
						name="currentLocation"
						className="form-control mb-2 me-2"
						onChange={(e) => setCurrentLocation(e.target.value)}>
						<option value="">Current Country</option>
						{Countries().map((country, key) => (
							<option
								key={key}
								value={country}
								selected={staff.currentLocation == country}>
								{country}
							</option>
						))}
					</select>

					<div className="col-sm-4"></div>
				</div>
				<div className="col-sm-4">
					{/* Roles */}
					<div className="form-group">
						<label htmlFor="">Roles</label>
						<div className="d-flex justify-content-center flex-wrap">
							{roles.map((role, key) => (
								<div
									key={key}
									className="border-bottom m-1 p-2">
									<label key={key}>
										<input
											type="checkbox"
											id=""
											name="entities"
											defaultChecked={staff.roleNames.includes(role.name)}
											onClick={(e) => handleUserRoles(role.id)}
										/>
										<span className="text-capitalize me-2"> {role.name}</span>
									</label>
								</div>
							))}
						</div>
					</div>
					{/* Roles End */}
				</div>
			</div>

			<div className="d-flex justify-content-center mb-2">
				<Btn
					text="update"
					loading={loading}
				/>
			</div>

			<center className="mb-5">
				<MyLink
					linkTo="/staff"
					text="back to staff"
				/>
			</center>
		</form>
	)
}

export default edit
