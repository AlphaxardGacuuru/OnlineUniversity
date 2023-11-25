import React, { useState } from "react"
import { Link, useHistory, useLocation } from "react-router-dom"

import CryptoJS from "crypto-js"
// import Axios from "axios"
// import { useAuth } from "@/hooks/auth";

import Btn from "@/components/Core/Btn"
import MyLink from "@/components/Core/MyLink"

import { GoogleLoginButton } from "react-social-login-buttons"

const login = (props) => {
	const [email, setEmail] = useState("alphaxardgacuuru47@gmail.com")
	const [password, setPassword] = useState("alphaxardgacuuru47@gmail.com")
	const [loading, setLoading] = useState(false)

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
					// props.get(`auth`, props.setAuth, "auth", false)
					// Reload page
					setTimeout(
						() => (window.location.href = `${props.url}/#/admin`),
						1000
					)
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
								<h2>Login to Admin Portal</h2>
								<p>
									Lorem ipsum dolor sit amet consectetur, adipisicing elit.
									Distinctio earum, eligendi tenetur placeat praesentium iure.
									Cum libero blanditiis aut, provident fugiat aliquid sit et
									quae animi expedita quo eos ducimus.
								</p>
							</div>
							<form
								onSubmit={onSubmit}
								className="signup-form">
								<input
									type="text"
									placeholder="Your E-mail"
									onChange={(e) => setEmail(e.target.value)}
									autoComplete="email"
								/>
								<input
									type="password"
									placeholder="Your Password"
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
