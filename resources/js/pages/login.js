import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min"
import Btn from "@/components/Core/Btn"

import CryptoJS from "crypto-js"

import { GoogleLoginButton } from "react-social-login-buttons"
import BackSVG from "@/svgs/BackSVG"

const login = (props) => {
	var router = useHistory()

	const [tab, setTab] = useState("admin")

	const [name, setName] = useState()
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
	const [confirmPassword, setConfirmPassword] = useState()
	const [loading, setLoading] = useState(false)

	const [register, setRegister] = useState(true)

	useEffect(() => {
		if (props.auth.name != "Guest") {
			// Handle Redirects
			if (props.auth.accountType == "staff") {
				router.push(`/admin/dashboard`)
			} else if (props.auth.accountType == "instructor") {
				router.push(`/instructor/${props.auth.id}/show`)
			} else {
				router.push(`/student/${props.auth.id}/show`)
			}
		}
	}, [])

	/*
	 * Encrypt Token
	 */
	const encryptedToken = (token) => {
		const secretKey = "OnlineUniversityAuthorizationToken"
		// Encrypt
		return CryptoJS.AES.encrypt(token, secretKey).toString()
	}

	const onRegister = (e) => {
		setLoading(true)
		e.preventDefault()

		Axios.get("/sanctum/csrf-cookie").then(() => {
			Axios.post(`/register`, {
				name: name,
				email: email,
				password: password,
				password_confirmation: confirmPassword,
				device_name: "computer",
			})
				.then((res) => {
					props.setMessages([res.data.message])
					// Remove loader
					setLoading(false)
					// Encrypt and Save Sanctum Token to Local Storage
					props.setLocalStorage("sanctumToken", encryptedToken(res.data.data))
					// Update Logged in user
					Axios.get("/api/auth", {
						headers: { Authorization: `Bearer ${res.data.data}` },
					})
						.then((res) => {
							// Set LocalStorage
							props.setLocalStorage("auth", res.data.data)
							// Reload page
							// window.location.href = `/#/instructor`
							window.location.reload()
						})
						.catch((err) => props.getErrors(err, false))
				})
				.catch((err) => {
					// Remove loader
					setLoading(false)
					props.getErrors(err)
				})
		})
	}

	const onSubmit = (e) => {
		setLoading(true)
		e.preventDefault()

		Axios.get("/sanctum/csrf-cookie").then(() => {
			Axios.post(`/login`, {
				email: email,
				password: password,
				device_name: "deviceName",
				remember: "checked",
			})
				.then((res) => {
					props.setMessages([res.data.message])
					// Remove loader
					setLoading(false)
					// Encrypt and Save Sanctum Token to Local Storage
					props.setLocalStorage("sanctumToken", encryptedToken(res.data.data))
					// Update Logged in user
					Axios.get("/api/auth", {
						headers: { Authorization: `Bearer ${res.data.data}` },
					})
						.then((res) => {
							// Set LocalStorage
							props.setLocalStorage("auth", res.data.data)
							// Reload page
							// window.location.href = `/#/instructor`
							window.location.reload()
						})
						.catch((err) => props.getErrors(err, false))
				})
				.catch((err) => {
					// Remove loader
					setLoading(false)
					props.getErrors(err)
				})
		})
	}

	return (
		<section className="signup-section spad pt-4">
			<div
				className="signup-bg set-bg"
				style={{ background: `url("/storage/img/signup-bg.jpg")` }}></div>
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-6">
						<div className="signup-warp">
							<div className="section-title text-white text-left mb-2">
								{register ? (
									<h2>Sign up to became a student</h2>
								) : (
									<h2>Login to Admin, Instructor or Student Portal</h2>
								)}
								<p></p>
							</div>
							{register ? (
								<form
									onSubmit={onRegister}
									className="signup-form">
									{/* Name Start */}
									<input
										type="text"
										placeholder="Your Name"
										className="mb-1"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
									{/* Name End */}

									{/* Email Start */}
									<input
										type="text"
										name="email"
										placeholder="Your Email"
										className="mb-1"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										autoComplete="email"
									/>
									{/* Email End */}

									{/* Password Start */}
									<input
										type="password"
										placeholder="Your Password"
										className="mb-1"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
									{/* Password End */}

									{/* Password Confirmation Start */}
									<input
										type="password"
										placeholder="Confirm Your Password"
										className="mb-1"
										value={confirmPassword}
										onChange={(e) => setConfirmPassword(e.target.value)}
									/>
									{/* Password Confirmation End */}

									<h6 className="invisible">Some text</h6>

									<div className="d-flex justify-content-between">
										<button
											className="site-btn btn-dark"
											onClick={(e) => {
												e.preventDefault()
												setRegister(false)
											}}>
											<div className="d-flex justify-content-between  align-items-center">
												<div
													className="mt-2"
													style={{ fontSize: "0.7em" }}>
													<BackSVG />
												</div>
												<div>Login</div>
												<div className="invisible">
													<BackSVG />
												</div>
											</div>
										</button>
										<button
											type="submit"
											className="site-btn">
											Register
											{loading && (
												<div className="spinner-border spinner-border-sm border-2 light my-auto mx-2"></div>
											)}
										</button>
									</div>
								</form>
							) : (
								<form
									onSubmit={onSubmit}
									className="signup-form">
									{/* <GoogleLoginButton
									className="border-0 m-0 w-100 mb-4"
									onClick={() => onSocial("google")}
								/> */}

									{/* Tabs */}
									<div className="d-flex justify-content-between mb-4">
										<button
											type="reset"
											className="btn text-white rounded-0 w-100"
											style={{
												backgroundColor: tab == "admin" ? "#d82a4e" : "#000",
											}}
											onClick={() => setTab("admin")}>
											Admin
										</button>
										<button
											type="reset"
											className="btn text-white rounded-0 mx-1 w-100"
											style={{
												backgroundColor:
													tab == "instructor" ? "#d82a4e" : "#000",
											}}
											onClick={() => setTab("instructor")}>
											Instructor
										</button>
										<button
											type="reset"
											className="btn text-white rounded-0 w-100"
											style={{
												backgroundColor: tab == "student" ? "#d82a4e" : "#000",
											}}
											onClick={() => setTab("student")}>
											Student
										</button>
									</div>
									{/* Tabs End */}

									{/* Email Start */}
									<input
										type="text"
										placeholder="Your Email"
										className="mb-1"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										autoComplete="email"
									/>
									{/* Email End */}

									{/* Password Start */}
									<input
										type="password"
										placeholder="Your Password"
										className="mb-1"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
									{/* Password End */}

									<h6 className="invisible">Some text</h6>

									<div className="d-flex justify-content-between">
										{/* Register Button Start */}
										<button
											className="site-btn btn-dark"
											onClick={(e) => {
												e.preventDefault()
												setRegister(true)
											}}>
											<div className="d-flex justify-content-between align-items-center">
												<div
													className="mt-2"
													style={{ fontSize: "0.7em" }}>
													<BackSVG />
												</div>
												<div>Register</div>
												<div className="invisible">
													<BackSVG />
												</div>
											</div>
										</button>
										{/* Register Button End */}
										<button
											type="submit"
											className="site-btn">
											Login
											{loading && (
												<div className="spinner-border spinner-border-sm border-2 light my-auto mx-2"></div>
											)}
										</button>
									</div>
								</form>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default login
