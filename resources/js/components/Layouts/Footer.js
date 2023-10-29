import React from "react"
import { Link, useLocation } from "react-router-dom"

import Img from "@/components/Core/Img"
import PrivacySVG from "@/svgs/PrivacySVG"
import ChevronUpSVG from "@/svgs/ChevronUpSVG"

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
		<div
			className={`mt-5 p-5 ${hide}`}
			style={{ backgroundColor: "#0077B6" }}>
			<div className="row">
				<div className="col-sm-1"></div>
				<div className="col-sm-3 mb-5">
					<h1 className="text-white">Online University</h1>
					<p className="text-white">
					</p>
				</div>
				<div className="col-sm-1"></div>
				<div className="col-sm-3 mb-5">
					<h1 className="text-white">Quick Links</h1>
					{/* Privacy Policy */}
					<Link
						to="/privacy"
						className="text-white">
						<span className="me-2">
							<PrivacySVG />
						</span>
						Privacy Policy
					</Link>
					{/* Privacy Policy End */}
				</div>
				<div className="col-sm-1"></div>
				<div className="col-sm-3">
					<h1 className="text-white">Contact Us</h1>
					<p></p>
				</div>
			</div>
			<div className="row">
				<center>
					<div
						id="scrollUpBtn"
						onClick={onScroll}>
						<ChevronUpSVG />
					</div>
					<br className="anti-hidden" />
				</center>
			</div>
		</div>
	)
}

export default Footer
