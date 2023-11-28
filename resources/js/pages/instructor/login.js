import React, { useEffect, useState } from "react"
import { Link, useHistory, useLocation } from "react-router-dom"

import CryptoJS from "crypto-js"

const login = (props) => {
	var router = useHistory()

	const [email, setEmail] = useState("gacuuruwakarenge@gmail.com")
	const [password, setPassword] = useState("gacuuruwakarenge@gmail.com")
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (props.auth.name != "Guest") {
			// Handle Redirects
			if (props.auth.accountType == "professor") {
				router.push("/instructor")
			} else if (props.auth.accountType == "admin") {
				router.push("/admin")
			} else {
				router.push("/student")
			}
		}
	}, [])

	// Encrypt Token
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
		<section className="signup-section spad py-5">
			<div
				className="signup-bg set-bg"
				style={{ background: `url("/storage/img/signup-bg.jpg")` }}></div>
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-6">
						<div className="signup-warp">
							<div className="section-title text-white text-left">
								<h2>Login to Instructor Portal</h2>
								<p>
									Lorem ipsum dolor sit amet consectetur, adipisicing elit.
									Distinctio earum, eligendi tenetur placeat praesentium iure.
									Nam aperiam blanditiis repellendus, pariatur eveniet
									similique, ipsam consequatur nostrum ipsum, molestiae quas
									magnam quibusdam nobis neque quidem delectus culpa!
								</p>
							</div>
							<form
								onSubmit={onSubmit}
								className="signup-form">
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
										to="/login"
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
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default login
