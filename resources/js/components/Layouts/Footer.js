import React from "react"
import { Link, useLocation } from "react-router-dom"

import Img from "@/components/Core/Img"

const Footer = () => {
	const location = useLocation()

	const onScroll = () => {
		// Smooth scroll to top
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		})
	}

	const hide =
		location.pathname.match("/verify-email/") ||
		location.pathname.match("/admin") ||
		location.pathname.match("/service-provider/") ||
		location.pathname.match("/chat") ||
		location.pathname.match("/profile")
			? "d-none"
			: ""

	return (
		<React.Fragment>
			{/* footer section */}
			<footer className={`footer-section spad pb-0 ${hide}`}>
				<div className="footer-top">
					<div className="footer-warp">
						<div className="row">
							<div className="widget-item">
								<h4>Contact Info</h4>
								<ul className="contact-list">
									<li>
										1481 Creekside Lane <br />
										Avila Beach, CA 931
									</li>
									<li>+53 345 7953 32453</li>
									<li>yourmail@gmail.com</li>
								</ul>
							</div>
							<div className="widget-item">
								<h4>Engeneering</h4>
								<ul>
									<li>
										<a href="">Applied Studies</a>
									</li>
									<li>
										<a href="">Computer Engeneering</a>
									</li>
									<li>
										<a href="">Software Engeneering</a>
									</li>
									<li>
										<a href="">Informational Engeneering</a>
									</li>
									<li>
										<a href="">System Engeneering</a>
									</li>
								</ul>
							</div>
							<div className="widget-item">
								<h4>Graphic Design</h4>
								<ul>
									<li>
										<a href="">Applied Studies</a>
									</li>
									<li>
										<a href="">Computer Engeneering</a>
									</li>
									<li>
										<a href="">Software Engeneering</a>
									</li>
									<li>
										<a href="">Informational Engeneering</a>
									</li>
									<li>
										<a href="">System Engeneering</a>
									</li>
								</ul>
							</div>
							<div className="widget-item">
								<h4>Development</h4>
								<ul>
									<li>
										<a href="">Applied Studies</a>
									</li>
									<li>
										<a href="">Computer Engeneering</a>
									</li>
									<li>
										<a href="">Software Engeneering</a>
									</li>
									<li>
										<a href="">Informational Engeneering</a>
									</li>
									<li>
										<a href="">System Engeneering</a>
									</li>
								</ul>
							</div>
							<div className="widget-item">
								<h4>Newsletter</h4>
								<form className="footer-newslatter">
									<input
										type="email"
										placeholder="E-mail"
									/>
									<button className="site-btn">Subscribe</button>
									<p>*We don’t spam</p>
								</form>
							</div>
						</div>
					</div>
				</div>
				<div className="footer-bottom">
					<div className="footer-warp">
						<ul className="footer-menu">
							<li>
								<a href="#">Terms & Conditions</a>
							</li>
							<li>
								<a href="#">Register</a>
							</li>
							<li>
								<a href="#">Privacy</a>
							</li>
						</ul>
						<div className="copyright">
							<a
								target="_blank"
								href="https://www.templateshub.net">
								Templates Hub
							</a>
						</div>
					</div>
				</div>
			</footer>
			{/* footer section end */}

			<div className="row">
				<center>
					<div
						id="scrollUpBtn"
						onClick={onScroll}></div>
					<br className="anti-hidden" />
				</center>
			</div>
		</React.Fragment>
	)
}

export default Footer
