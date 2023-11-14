import React, { useState, useEffect } from "react"
import { Link, useLocation, useHistory } from "react-router-dom"

import Img from "@/components/Core/Img"
import MyLink from "@/components/Core/MyLink"

import CloseSVG from "@/svgs/CloseSVG"
import LogoutSVG from "@/svgs/LogoutSVG"
import DownloadSVG from "@/svgs/DownloadSVG"
import CupSVG from "@/svgs/CupSVG"
import MenuSVG from "@/svgs/MenuSVG"
import HomeSVG from "@/svgs/HomeSVG"
import ClubSVG from "@/svgs/ClubSVG"
import EventSVG from "@/svgs/EventSVG"
import CartSVG from "@/svgs/CartSVG"
import BellSVG from "@/svgs/BellSVG"

const TopNav = (props) => {
	const location = useLocation()

	const [menu, setMenu] = useState()

	// Function for showing active color
	const active = (check) => {
		return (
			location.pathname == check && "bg-primary-subtle rounded-pill py-2 px-5"
		)
	}

	// Function for showing active color
	const active2 = (check) => {
		return {
			color: location.pathname == check ? "#0077B6" : "#232323",
		}
	}

	// Hide TopNav from various pages
	const display =
		location.pathname.match("/404") ||
		location.pathname.match("/login") ||
		location.pathname.match("/register")
			? "d-none"
			: ""

	return (
		<div
			id="MyElement"
			className={`${menu} ${display}`}>
			{/* <!-- ***** Header Area Start ***** --> */}
			<header className="header-area shadow">
				<div className="container-fluid p-0">
					<div className="row">
						<div
							className="col-12"
							style={{ padding: "0" }}>
							<div className="menu-area d-flex justify-content-between">
								{/* <!-- Logo Area  --> */}
								<div className="logo-area">
									<Link to="/">Online University</Link>
								</div>

								{/* Nav Links */}
								<div className="d-flex align-items-center justify-content-between">
									<div className="hidden">
										<Link
											to="/"
											className={`nav-link mx-4 ${active("/")}`}
											onClick={() => setMenu("")}>
											Home
										</Link>
									</div>
								</div>
								{/* Nav Links End */}

								{/* Top Nav Links Area */}
								<div className="menu-content-area d-flex align-items-center">
									<div className="header-social-area d-flex align-items-center"></div>
									{/* <!-- Menu Icon --> */}
									<a
										href="#"
										id="menuIcon"
										onClick={(e) => {
											e.preventDefault()
											setMenu("menu-open")
										}}>
										<MenuSVG />
									</a>
								</div>
								{/* Top Nav Links Area End */}
							</div>
						</div>
					</div>
				</div>
			</header>
			<br />
			<br />
			<br />
			<br className="hidden" />

			{/* <!-- ***** Side Menu Area Start ***** --> */}
			<div className="mainMenu d-flex align-items-center justify-content-between">
				{/* <!-- Close Icon --> */}
				<div
					className="closeIcon"
					onClick={() => setMenu("")}>
					<CloseSVG />
				</div>
				{/* <!-- Logo Area --> */}
				<div className="logo-area">
					<Link to="/">Online University</Link>
				</div>
				{/* <!-- Nav --> */}
				<div
					className="sonarNav wow fadeInUp"
					data-wow-delay="1s">
					<nav>
						<ul>
							<li className="nav-item active">
								<Link
									to="/"
									style={active2("/")}
									className="nav-link"
									onClick={() => setMenu("")}>
									<span style={active2("/")}>
										<HomeSVG />
									</span>
									Home
								</Link>
							</li>
							<li className="nav-item">
								<Link
									to="/club"
									style={active2("/club")}
									className="nav-link"
									onClick={() => setMenu("")}>
									<span style={active2("/club")}>
										<ClubSVG />
									</span>
									Clubs
								</Link>
							</li>
							<li className="nav-item">
								<Link
									to="/party"
									style={active2("/party")}
									className="nav-link"
									onClick={() => setMenu("")}>
									<span style={active2("/party")}>
										<CupSVG />
									</span>
									Parties
								</Link>
							</li>
							<li className="nav-item">
								<Link
									to="/event"
									style={active2("/event")}
									className="nav-link"
									onClick={() => setMenu("")}>
									<span style={active2("/event")}>
										<EventSVG />
									</span>
									Events
								</Link>
							</li>
						</ul>
					</nav>
				</div>
				<br />
			</div>
			{/* <!-- ***** Side Menu Area End ***** --> */}
		</div>
	)
}

export default TopNav
