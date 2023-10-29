import React, { useEffect, useState } from "react"
import { Link, useLocation, useHistory, withRouter } from "react-router-dom"

import Img from "@/components/Core/Img"
import MyLink from "@/components/Core/MyLink"

import CloseSVG from "@/svgs/CloseSVG"
import LogoutSVG from "@/svgs/LogoutSVG"
import DownloadSVG from "@/svgs/DownloadSVG"
import MenuSVG from "@/svgs/MenuSVG"
import PersonSVG from "@/svgs/PersonSVG"
import HomeSVG from "@/svgs/HomeSVG"
import ClubSVG from "@/svgs/ClubSVG"
import ServiceSVG from "@/svgs/ServiceSVG"
import PersonGearSVG from "@/svgs/PersonGearSVG"
import PeopleSVG from "@/svgs/PeopleSVG"
import BoxSVG from "@/svgs/BoxSVG"
import PackageSVG from "@/svgs/PackageSVG"

const AdminMenu = (props) => {
	const location = useLocation()
	const router = useHistory()

	const [bottomMenu, setBottomMenu] = useState()
	const [avatarVisibility, setAvatarVisibility] = useState("")

	useEffect(() => {
		// Fetch Auth
		location.pathname.match("/admin") &&
			Axios.get("/api/admin/auth")
				.then((res) => {
					props.setAuth(res.data.data)
					// Set LocalStorage
					props.setLocalStorage("auth", res.data.data)
				})
				.catch((err) => {
					props.getErrors(err, false)

					var isInAdminPage =
						location.pathname.match("/admin") &&
						!location.pathname.match("/admin/login") &&
						!location.pathname.match("/admin/register")

					// Handle Redirects for Admin
					if (isInAdminPage) {
						if (props.auth.accountType != "admin") {
							router.push("/admin/login")
						}
					}
				})
	}, [props.location])

	const logout = () => {
		Axios.post(`/logout`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove phone from localStorage
				localStorage.clear()
				// Reload
				window.location.reload()
			})
			.catch((err) => {
				props.getErrors(err)
				// Remove phone from localStorage
				localStorage.clear()
				// Reload
				window.location.reload()
			})
	}

	// Show Admin Nav based on Location
	const showAdminNav =
		location.pathname.match("/admin") &&
		!location.pathname.match("/admin/login") &&
		!location.pathname.match("/admin/register")
			? "d-block"
			: "d-none"

	// Function for showing active color
	const active = (check) => {
		return (
			location.pathname.match(check) &&
			"rounded-end-pill text-primary bg-primary-subtle"
		)
	}

	// Function for showing active color
	const activeStrict = (check) => {
		return (
			location.pathname == check &&
			"rounded-end-pill text-primary bg-primary-subtle"
		)
	}

	return (
		<React.Fragment>
			<div
				id="MyElement"
				className={props.adminMenu + " " + showAdminNav}>
				{/* <!-- ***** Header Area Start ***** --> */}
				<header className="header-area bg-primary shadow">
					<div className="container-fluid p-0">
						<div className="row">
							<div
								className="col-12"
								style={{ padding: "0" }}>
								<div className="menu-area d-flex justify-content-between">
									<div className="d-flex align-items-center">
										{/* <!-- Left Menu Icon --> */}
										<a
											href="#"
											id="menuIcon"
											className="text-white me-3"
											onClick={(e) => {
												e.preventDefault()
												// Open Admin Menu
												props.setAdminMenu(props.adminMenu ? "" : "left-open")
											}}>
											<MenuSVG />
										</a>
										{/* <!-- Left Menu Icon End --> */}

										{/* <!-- Logo Area  --> */}
										<div className="logo-area">
											<Link
												to="/admin"
												className="text-white">
												Party People
												{/* <span className="main-logo">Party People</span> */}
											</Link>
										</div>
									</div>

									{/* Top Nav Links Area */}
									<div className="menu-content-area d-flex align-items-center">
										<div className="d-flex align-items-center justify-content-between">
											{/* Admin */}
											<Link
												to="/"
												className="btn btn-outline-light rounded-pill text-uppercase mx-3">
												visit website
											</Link>
										</div>
										<div className="header-social-area d-flex align-items-center">
											<>
												{/* Avatar Dropdown */}
												<div className="dropdown-center">
													{/* Avatar */}
													<a
														href="#"
														role="button"
														className="hidden"
														data-bs-toggle="dropdown"
														aria-expanded="false">
														<Img
															src={props.auth?.avatar}
															className="rounded-circle bg-light p-1"
															width="40px"
															height="40px"
															alt="Avatar"
														/>
													</a>
													{/* For small screens */}
													<span
														className="anti-hidden me-2"
														onClick={() => {
															setBottomMenu(bottomMenu ? "" : "menu-open")
															setAvatarVisibility("block")
														}}>
														<Img
															src={props.auth?.avatar}
															className="rounded-circle anti-hidden"
															width="20px"
															height="20px"
															alt="Avatar"
														/>
													</span>
													{/* Avatar End */}
													<div className="dropdown-menu rounded-0 m-0 p-0 bg-white">
														<Link
															to={`/admin/staff/edit/${props.auth.id}`}
															className="p-2 px-3 pt-3 dropdown-item">
															<div className="d-flex">
																<div className="align-items-center">
																	<Img
																		src={props.auth?.avatar}
																		className="rounded-circle"
																		width="25px"
																		height="25px"
																		alt="Avatar"
																	/>
																</div>
																<div className="ps-2">
																	<h5 className="text-wrap">
																		{props.auth?.name}
																	</h5>
																</div>
															</div>
														</Link>
														<Link
															to="/download"
															className="p-2 px-3 dropdown-item"
															style={{
																display: props.downloadLink ? "block" : "none",
															}}>
															<h6>
																<span className="me-2">
																	<DownloadSVG />
																</span>
																Get App
															</h6>
														</Link>
														<Link
															to="#"
															className="p-2 px-3 dropdown-item"
															onClick={(e) => logout(e)}>
															<h6>
																<span className="me-2">
																	<LogoutSVG />
																</span>
																Logout
															</h6>
														</Link>
													</div>
												</div>
												{/* Avatar Dropdown End */}
											</>
										</div>
									</div>
									{/* Top Nav Links Area End */}
								</div>
							</div>
						</div>
					</div>
				</header>
				<br />
				<br />
				{/* Remove for profile page for better background image */}
				{location.pathname.match(/profile/) ? (
					<br className="hidden" />
				) : (
					<span>
						<br />
						<br className="hidden" />
					</span>
				)}

				{/* <!-- ***** Side Menu Area Start ***** --> */}
				<div className="leftMenu d-flex align-items-center justify-content-start bg-primary">
					<div
						className="sonarNav wow fadeInUp w-100 mt-4"
						data-wow-delay="1s">
						<nav>
							<ul className="m-0 p-0">
								{/* Dashboard Link */}
								<li className="nav-item">
									<Link
										to={`/admin`}
										className={`nav-link ${activeStrict("/admin")}`}>
										<div className="nav-link-icon">
											<HomeSVG />
										</div>
										<div className="nav-link-text">Dashboard</div>
									</Link>
								</li>
								{/* Dashboard Link End */}
								{/* Customers Link */}
								<li className="nav-item">
									<Link
										to={`/admin/user`}
										className={`nav-link ${activeStrict("/admin/user")}`}>
										<div className="nav-link-icon">
											<PeopleSVG />
										</div>
										<div className="nav-link-text">Customers</div>
									</Link>
								</li>
								{/* Customers Link End */}
								{/* Clubs Link */}
								<li className="nav-item">
									<Link
										to={`/admin/club`}
										className={`nav-link ${
											active("/admin/club") || active("/admin/good")
										}`}>
										<div className="nav-link-icon">
											<ClubSVG />
										</div>
										<div className="nav-link-text">Clubs</div>
									</Link>
								</li>
								{/* Clubs Link End */}
								{/* Orders Link */}
								<li className="nav-item">
									<Link
										to={`/admin/order`}
										className={`nav-link ${activeStrict("/admin/order")}`}>
										<div className="nav-link-icon">
											<BoxSVG />
										</div>
										<div className="nav-link-text">Orders</div>
									</Link>
								</li>
								{/* Club Links */}
								{/* Services Link */}
								<li className="nav-item">
									<Link
										to={`/admin/service`}
										className={`nav-link ${active("/admin/service")}`}>
										<div className="nav-link-icon">
											<ServiceSVG />
										</div>
										<div className="nav-link-text">Services</div>
									</Link>
								</li>
								{/* Services Links */}
								{/* Packages Link */}
								<li className="nav-item">
									<Link
										to={`/admin/club-package`}
										className={`nav-link ${active("/admin/package")}`}>
										<div className="nav-link-icon">
											<PackageSVG />
										</div>
										<div className="nav-link-text">Packages</div>
									</Link>
								</li>
								{/* Packages Links */}
								{/* <li className="nav-item">
								<a
									href="#"
									className={`nav-link accordion-button ${active(
										"/admin/club/"
									)}`}
									data-bs-toggle="collapse"
									data-bs-target="#collapseClub"
									aria-expanded="false"
									aria-controls="collapseClub">
									<span>
										<ClubSVG />
									</span>
									Clubs
									</a> */}

								{/* Collapse */}
								{/* <div
									className="collapse"
									id="collapseClub">
									<ol>
										<li className="nav-item">
											<Link
												to="/admin/club"
												className={`nav-link ${active("/admin/club")}`}>
												All Clubs
											</Link>
										</li>
									</ol>
								</div>
							</li> */}
								{/* Collapse End */}
								{/* Club Links End */}
								{/* Staff Links */}
								<li className="nav-item">
									<Link
										to={`/admin/staff`}
										className={`nav-link ${active("/admin/staff")}`}>
										<div className="nav-link-icon">
											<PersonSVG />
										</div>
										<div className="nav-link-text">Staff</div>
									</Link>
								</li>
								{/* Staff Link End */}
								{/* Role Links */}
								<li className="nav-item">
									<Link
										to={`/admin/role`}
										className={`nav-link ${active("/admin/role")}`}>
										<div className="nav-link-icon">
											<PersonGearSVG />
										</div>
										<div className="nav-link-text">Roles</div>
									</Link>
								</li>
								{/* Role Link End */}
							</ul>
						</nav>
					</div>

					<br />
				</div>
				{/* <!-- ***** Side Menu Area End ***** --> */}
				<div className="left-main">{props.children}</div>
			</div>

			{/* Sliding Bottom Nav */}
			<div className={bottomMenu}>
				<div className="bottomMenu">
					<div className="d-flex align-items-center justify-content-between">
						<div></div>
						{/* <!-- Close Icon --> */}
						<div
							className="closeIcon mt-2 me-2"
							style={{ fontSize: "0.8em" }}
							onClick={() => setBottomMenu("")}>
							<CloseSVG />
						</div>
					</div>

					{/* Avatar Bottom */}
					<div
						className="m-0 p-0"
						style={{ display: avatarVisibility }}>
						<Link
							to={`/admin/staff/edit/${props.auth.id}`}
							style={{ padding: "0px", margin: "0px" }}
							className="border-bottom text-start"
							onClick={() => setBottomMenu("")}>
							<div className="d-flex">
								<div className="ms-3 me-3">
									<Img
										src={props.auth?.avatar}
										className="rounded-circle"
										width="25px"
										height="25px"
										alt="Avatar"
									/>
								</div>
								<div>
									<h5>{props.auth?.name}</h5>
								</div>
							</div>
						</Link>
						<Link
							to="/download"
							className="p-2 text-start"
							style={{
								display: props.downloadLink ? "inline" : "none",
								textAlign: "left",
							}}
							onClick={() => setBottomMenu("")}>
							<h6>
								<span className="ms-3 me-4">
									<DownloadSVG />
								</span>
								Get App
							</h6>
						</Link>
						<Link
							to="#"
							className="p-2 text-start"
							onClick={(e) => {
								e.preventDefault()
								setBottomMenu("")
								logout()
							}}>
							<h6>
								<span className="ms-3 me-4">
									<LogoutSVG />
								</span>
								Logout
							</h6>
						</Link>
					</div>
					{/* Avatar Bottom End */}
				</div>
			</div>
			{/* Sliding Bottom Nav End */}
		</React.Fragment>
	)
}

export default withRouter(AdminMenu)
