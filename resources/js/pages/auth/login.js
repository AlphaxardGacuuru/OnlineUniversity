import React from "react"
import { Link } from "react-router-dom"

import { GoogleLoginButton } from "react-social-login-buttons"

const login = () => {
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
							<form className="signup-form">
								<GoogleLoginButton
									className="border-0 m-0 w-100 mb-2"
									onClick={() => onSocial("google")}
								/>

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
										Professor
									</Link>
								</div>
								{/* Links to Other Portals End */}
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default login
