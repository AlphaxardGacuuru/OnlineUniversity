import React, { useState, useEffect } from "react"
import { Link, useLocation, useHistory } from "react-router-dom"

import Img from "@/components/Core/Img"
import MyLink from "@/components/Core/MyLink"

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
	const hide =
		location.pathname.match("/404") ||
		location.pathname.match("/admin") ||
		location.pathname.match("/login") ||
		location.pathname.match("/register")
			? "d-none"
			: ""

	return (
	<header className={`header-section ${hide}`}>
		<div className="container">
			<div className="row">
				<div className="col-lg-3 col-md-3">
					<div className="site-logo">
						<Img src="/storage/img/logo.png"
							 alt="" />
					</div>
					<div className="nav-switch">
						<i className="fa fa-bars"></i>
					</div>
				</div>
				<div className="col-lg-9 col-md-9">
					<Link to="/login"
					   className="site-btn header-btn">Login</Link>
					<nav className="main-menu">
						<ul>
							<li><Link to="/">Home</Link></li>
							<li><Link to="/about">About us</Link></li>
							<li><Link to="/courses">Courses</Link></li>
							<li><Link to="/blog">News</Link></li>
							<li><Link to="/contact">Contact</Link></li>
						</ul>
					</nav>
				</div>
			</div>
		</div>
	</header>
	)
}

export default TopNav
