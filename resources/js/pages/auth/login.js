import React from "react"
import { Link } from "react-router-dom"

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
								<h2>Sign up to became a teacher</h2>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
									malesuada lorem maximus mauris scelerisque, at rutrum nulla
									dictum. Ut ac ligula sapien. Suspendisse cursus faucibus
									finibus.
								</p>
							</div>
							{/* <!-- signup form --> */}
							<form className="signup-form">
								<input
									type="text"
									placeholder="Your Name"
								/>
								<input
									type="text"
									placeholder="Your E-mail"
								/>
								<input
									type="text"
									placeholder="Your Phone"
								/>
								<label
									htmlFor="v-upload"
									className="file-up-btn">
									Upload Course
								</label>
								
								<div className="d-flex justify-content-between">
									<Link
										to="/register"
										className="site-btn btn-dark">
										Register
									</Link>
									<button className="site-btn">Login</button>
								</div>

								<h5 className="w-50 mx-auto my-4">Visit Other Portals</h5>

								{/* Links to Other Portals */}
								<div className="d-flex justify-content-between">
									<Link
										to="/admin"
										className="site-btn btn-dark">
										Admin
									</Link>
									<Link
										to="/professor"
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
