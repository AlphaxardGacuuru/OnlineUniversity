import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

import HomeSVG from "@/svgs/HomeSVG"
import CartSVG from "@/svgs/CartSVG"
import PersonSVG from "@/svgs/PersonSVG"

const Bottomnav = (props) => {
	const location = useLocation()

	// Hide BottomNav from various pages
	const display =
		location.pathname.match("/privacy") ||
		location.pathname.match("/download") ||
		location.pathname.match("/chat/show") ||
		location.pathname.match("/login") ||
		location.pathname.match("/register")
			? "d-none"
			: ""

	// Function for showing active color
	const active = (check) => {
		return location.pathname == check ? "#0077B6" : "#232323"
	}

	return (
		<>
			<br className="anti-hidden" />
			<br className="anti-hidden" />

			<div className="bottomNav menu-content-area header-social-area">
				{/* Bottom Nav */}
				<div className={`anti-hidden ${display}`}>
					<div className="container-fluid menu-area d-flex justify-content-between p-2 px-4">
						{/* Home */}
						<Link
							to="/"
							style={{
								textAlign: "center",
								fontSize: "10px",
								fontWeight: "100",
							}}>
							<span
								style={{
									fontSize: "20px",
									margin: "0",
									color: active("/"),
								}}
								className="nav-link">
								<HomeSVG />
							</span>
						</Link>
						{/* Home End */}
						{/* Cart */}
						<Link
							to="/cart"
							style={{
								textAlign: "center",
								fontSize: "10px",
								fontWeight: "100",
								position: "relative",
							}}>
							<span
								style={{
									fontSize: "20px",
									color: active("/cart"),
								}}
								className="nav-link">
								<CartSVG />
								<span
									className="position-absolute start-200 translate-middle badge rounded-circle bg-danger fw-lighter py-1"
									style={{
										fontSize: "0.6em",
										top: "0.6em",
									}}></span>
							</span>
						</Link>
						{/* Cart End */}
						{/* Library */}
						<Link
							to="/library"
							style={{
								textAlign: "center",
								fontSize: "10px",
								fontWeight: "100",
							}}>
							<span
								style={{
									fontSize: "23px",
									color: active("/library"),
								}}
								className="nav-link">
								<PersonSVG />
							</span>
						</Link>
						{/* Library End */}
					</div>
				</div>
				{/* Bottom Nav End */}
			</div>
		</>
	)
}

export default Bottomnav
