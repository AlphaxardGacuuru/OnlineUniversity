import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"

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

	const [student, setStudent] = useState({})
	const [name, setName] = useState()
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
	const [passwordConfirmation, setPasswordConfirmation] = useState()
	const [phone, setPhone] = useState()
	const [gender, setGender] = useState()
	const [facultyId, setFacultyId] = useState()
	const [departmentId, setDepartmentId] = useState()
	const [faculties, setFaculties] = useState([])
	const [departments, setDepartments] = useState([])
	const [loading, setLoading] = useState()

	// Get Faculties and Departments
	useEffect(() => {
		// Set page
		props.setPage({ name: "Edit Student", path: ["students", "edit"] })

		Axios.get(`/api/students/${id}`).then((res) => {
			setStudent(res.data.data)
			setFacultyId(res.data.data.facultyId.toString())
		})
		props.get("faculties", setFaculties)
		props.get("departments", setDepartments)
	}, [])

	/*
	 * Submit Form
	 */
	const onSubmit = (e) => {
		e.preventDefault()

		setLoading(true)
		Axios.put(`/api/students/${id}`, {
			name: name,
			email: email,
			password: password,
			password_confirmation: passwordConfirmation,
			phone: phone,
			gender: gender,
			facultyId: facultyId,
			departmentId: departmentId,
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
												url: `/avatar/${student.id}`,
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
						placeholder={student.name}
						className="form-control mb-2 me-2"
						onChange={(e) => setName(e.target.value)}
					/>

					<input
						type="text"
						name="email"
						placeholder={student.email}
						className="form-control mb-2 me-2"
						onChange={(e) => setEmail(e.target.value)}
					/>

					<input
						type="text"
						name="email"
						placeholder="Password"
						className="form-control mb-2 me-2"
						onChange={(e) => setPassword(e.target.value)}
					/>

					<input
						type="text"
						name="email"
						placeholder="Password Confirmation"
						className="form-control mb-2 me-2"
						onChange={(e) => setPasswordConfirmation(e.target.value)}
					/>

					<input
						type="tel"
						name="phone"
						placeholder={student.phone}
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
							selected={student.gender == "male"}>
							Male
						</option>
						<option
							value="female"
							selected={student.gender == "female"}>
							Female
						</option>
					</select>

					<select
						name="facultyId"
						className="form-control mb-3 me-2"
						onChange={(e) => setFacultyId(e.target.value)}>
						<option value="">Select Faculty</option>
						{faculties.map((faculty, key) => (
							<option
								key={key}
								value={faculty.id}
								selected={student.facultyId == faculty.id}>
								{faculty.name}
							</option>
						))}
					</select>

					<select
						name="departmentId"
						className="form-control mb-3 me-2"
						onChange={(e) => setDepartmentId(e.target.value)}>
						<option value="">Select Department</option>
						{departments
							.filter((department) => department.facultyId == facultyId)
							.map((department, key) => (
								<option
									key={key}
									value={department.id}
									selected={student.departmentId == department.id}>
									{department.name}
								</option>
							))}
					</select>
					<div className="col-sm-4"></div>
				</div>
			</div>

			<div className="d-flex justify-content-center mb-2">
				<Btn
					text="update"
					loading={loading}
				/>
			</div>

			<center>
				<MyLink
					linkTo="/students"
					text="back to students"
				/>
			</center>
		</form>
	)
}

export default edit
