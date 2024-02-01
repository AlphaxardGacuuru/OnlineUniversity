import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

import CryptoJS from "crypto-js"

import { GoogleLoginButton } from "react-social-login-buttons"

const login = (props) => {
	var router = useHistory()

	const [email, setEmail] = useState("cikumuhandi@gmail.com")
	const [password, setPassword] = useState("cikumuhandi@gmail.com")
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (props.auth.name != "Guest") {
			// Handle Redirects
			if (props.auth.accountType == "instructor") {
				router.push("/instructor")
			} else if (props.auth.accountType == "admin") {
				router.push("/admin")
			} else {
				router.push("/student")
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
		<section className="signup-section spad">
			<div
				className="signup-bg set-bg"
				style={{ background: `url("/storage/img/signup-bg.jpg")` }}></div>
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-6">
						<div className="signup-warp">
							<div className="section-title text-white text-left">
								<h2>Sign up to became a student</h2>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
									malesuada lorem maximus mauris scelerisque, at rutrum nulla
									dictum. Ut ac ligula sapien. Suspendisse cursus faucibus
									finibus.
								</p>
							</div>
							{/* <!-- signup form --> */}
							<form
								onSubmit={onSubmit}
								className="signup-form">
								{/* <GoogleLoginButton
									className="border-0 m-0 w-100 mb-4"
									onClick={() => onSocial("google")}
								/> */}

								<input
									type="text"
									placeholder="Your Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									autoComplete="email"
								/>
								<input
									type="password"
									placeholder="Your Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>

								<h6 className="invisible">Some text</h6>

								<div className="d-flex justify-content-between">
									<Link
										to="/student/login"
										className="site-btn btn-dark">
										Back
									</Link>
									<button
										type="submit"
										className="site-btn">
										Login
										{loading && (
											<div className="spinner-border spinner-border-sm border-2 light my-auto mx-2"></div>
										)}
									</button>
								</div>

								<h5 className="w-50 mx-auto my-4">Visit Other Portals</h5>

								{/* Links to Other Portals */}
								<div className="d-flex justify-content-between">
									<Link
										to="/admin/login"
										className="site-btn btn-dark">
										Admin
									</Link>
									<Link
										to="/instructor/login"
										className="site-btn btn-dark">
										Instructor
									</Link>
								</div>
								{/* Links to Other Portals End */}

								<br />

								<center>
									<Link
										to="/"
										className="site-btn btn-dark">
										Back
									</Link>
								</center>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default login
