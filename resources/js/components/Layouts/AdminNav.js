import React, { useEffect, useState } from "react"
import { Link, useLocation, useHistory, withRouter } from "react-router-dom"

import AdminNavLinks from "@/components/Layouts/AdminNavLinks"
import InstructorNavLinks from "@/components/Layouts/InstructorNavLinks"
import StudentNavLinks from "@/components/Layouts/StudentNavLinks"

import Btn from "@/components/Core/Btn"
import Img from "@/components/Core/Img"
import MyLink from "@/components/Core/MyLink"

import KenyanClock from "@/functions/KenyanClock"

import CloseSVG from "@/svgs/CloseSVG"
import LogoutSVG from "@/svgs/LogoutSVG"
import DownloadSVG from "@/svgs/DownloadSVG"
import MenuSVG from "@/svgs/MenuSVG"
import ChevronRightSVG from "@/svgs/ChevronRightSVG"
import BellSVG from "@/svgs/BellSVG"
import LogoSVG from "@/svgs/LogoSVG"

const AdminMenu = (props) => {
	const location = useLocation()
	const router = useHistory()

	const [notifications, setNotifications] = useState([])

	const [bottomMenu, setBottomMenu] = useState()
	const [avatarVisibility, setAvatarVisibility] = useState("")

	useEffect(() => {
		var isInAdminPage =
			location.pathname.match("/admin/") ||
			location.pathname.match("/instructor/") ||
			location.pathname.match("/student/") ||
			(!location.pathname.match("/login") &&
				!location.pathname.match("/register"))

		// Handle Redirects for Admin
		if (isInAdminPage) {
			if (props.auth.name == "Guest") {
				setTimeout(() => router.push("/login"), 2000)
			}
		}
	}, [props.location])

	const getNotifications = () =>
		props.get("notifications", setNotifications, null, false)

	useEffect(() => {
		// Fetch Chats
		const notificationInterval = setInterval(() => getNotifications(), 5000)

		// Cleanup function to clear the interval on component unmount
		return () => clearInterval(notificationInterval)
	}, [])

	const onNotification = () => {
		Axios.put(`/api/notifications/update`).then((res) => {
			// Update notifications
			props.get("notifications", setNotifications)
		})
	}

	const onDeleteNotifications = (id) => {
		// Clear the notifications array
		setNotifications([])

		Axios.delete(`/api/notifications/${id}`).then((res) => {
			// Update Notifications
			props.get("notifications", setNotifications)
		})
	}

	const logout = () => {
		Axios.post(`/logout`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove phone from localStorage
				localStorage.clear()
				// Redirect
				// window.location.href = `/#/admin/login`
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
		location.pathname.match("/admin/") ||
		location.pathname.match("/instructor/") ||
		(location.pathname.match("/student/") &&
			!location.pathname.match("/admin/login") &&
			!location.pathname.match("/admin/register"))
			? "d-block"
			: "d-none"

	return (
		<React.Fragment>
			<div
				id="MyElement"
				className={props.adminMenu + " " + showAdminNav}>
				{/* <!-- ***** Header Area Start ***** --> */}
				<header
					className={`header-area shadow ${
						location.pathname.match("/admin/")
							? " bg-primary"
							: location.pathname.match("/instructor/")
							? "bg-danger"
							: "bg-success"
					}`}>
					<div className="container-fluid p-0">
						<div className="row">
							<div className="col-12">
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
										<div className="logo-area mb-1">
											<Link
												to="/admin"
												className="text-white fs-1">
												<Img
													src="/storage/img/android-chrome-512x512.png"
													className="me-2"
													style={{
														width: "50px",
														height: "auto",
													}}
												/>
												{/* <span className="hidden"><LogoSVG /></span> */}
											</Link>
										</div>
									</div>

									{/* Top Nav Links Area */}
									<div className="menu-content-area d-flex align-items-center">
										<div className="d-flex align-items-center justify-content-between">
											{/* Main Site Link */}
											<Link
												to="/"
												className="btn btn-outline-light rounded-pill mx-2 hidden">
												Visit Website
											</Link>
											{/* Main Site Link End */}
											{/* Kenyan Clock */}
											<KenyanClock className="btn btn-outline-light" />
											{/* Kenyan Clock End */}
										</div>
										<div className="header-social-area d-flex align-items-center">
											<>
												{/* Notification Dropdown */}
												<div className="dropdown-center">
													<Link
														to="#"
														role="button"
														id="dropdownMenua"
														className="text-white"
														data-bs-toggle="dropdown"
														aria-haspopup="true"
														aria-expanded="false"
														style={{
															textAlign: "center",
															fontWeight: "100",
															position: "relative",
														}}
														onClick={onNotification}>
														<BellSVG />
														<span
															className="position-absolute start-200 translate-middle badge rounded-circle bg-danger fw-lighter py-1"
															style={{ fontSize: "0.6em", top: "0.2em" }}>
															{notifications.filter(
																(notification) => !notification.readAt
															).length > 0 &&
																notifications.filter(
																	(notification) => !notification.readAt
																).length}
														</span>
													</Link>
													<div
														style={{
															borderRadius: "0",
															minWidth: "20em",
															maxWidth: "40em",
														}}
														className="dropdown-menu m-0 p-0"
														aria-labelledby="dropdownMenuButton">
														<div className="dropdown-header border border-secondary-subtle border-start-0 border-end-0">
															Notifications
														</div>
														<div
															style={{
																maxHeight: "500px",
																overflowY: "scroll",
															}}>
															{/* Get Notifications */}
															{notifications.map((notification, key) => (
																<Link
																	key={key}
																	to={notification.url}
																	className="p-2 dropdown-item text-dark text-wrap"
																	onClick={() =>
																		onDeleteNotifications(notification.id)
																	}>
																	<small>{notification.message}</small>
																</Link>
															))}
														</div>
														{notifications.length > 0 && (
															<div
																className="dropdown-header"
																style={{ cursor: "pointer" }}
																onClick={() => onDeleteNotifications(0)}>
																Clear notifications
															</div>
														)}
													</div>
												</div>
												{/* Notification Dropdown End */}
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
															className="rounded-circle bg-light p-1 anti-hidden"
															width="30px"
															height="30px"
															alt="Avatar"
														/>
													</span>
													{/* Avatar End */}
													<div className="dropdown-menu rounded-0 m-0 p-0 bg-white">
														<Link
															to={`/admin/staff/edit/${props.auth.id}`}
															className="p-2 dropdown-item">
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
																	<h6 className="text-wrap fs-6">
																		{props.auth?.name}
																	</h6>
																	<p
																		className={`${
																			props.auth?.accountType == "staff"
																				? "text-primary"
																				: props.auth?.accountType ==
																				  "instructor"
																				? "text-danger"
																				: "text-success"
																		} text-wrap text-capitalize mb-0`}>
																		{props.auth?.accountType}
																	</p>
																</div>
															</div>
														</Link>
														<Link
															to="/download"
															className="p-2 dropdown-item"
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
															className="p-2 dropdown-item"
															onClick={(e) => logout(e)}>
															<h6 className="fs-6">
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

				{/* <!-- ***** Side Menu Area Start ***** --> */}
				<div
					className={`leftMenu d-flex align-items-center justify-content-start  ${
						location.pathname.match("/admin/")
							? " bg-primary"
							: location.pathname.match("/instructor/")
							? "bg-danger"
							: "bg-success"
					}`}>
					<div
						className="sonarNav wow fadeInUp w-100 mt-4"
						data-wow-delay="1s">
						<nav>
							<ul className="m-0 p-0">
								{location.pathname.match("/admin/") && (
									<AdminNavLinks {...props} />
								)}

								{/* Instructor Routes */}
								{location.pathname.match("/instructor/") && (
									<InstructorNavLinks {...props} />
								)}
								{/* Instructor Routes End */}

								{/* Student Routes */}
								{location.pathname.match("/student/") && (
									<StudentNavLinks {...props} />
								)}
								{/* Student Routes End */}
							</ul>
						</nav>
					</div>

					<br />
				</div>
				{/* <!-- ***** Side Menu Area End ***** --> */}
				<div className="left-main mt-5 px-4">
					<h2>{props.page.name}</h2>

					<div className="d-flex justify-content-start">
						{props.page.path.map((path, key) => (
							<div key={key}>
								{key < props.page.path.length - 1 ? (
									<MyLink
										linkTo={`/${path}`}
										className="btn-sm my-2"
										text={path}
									/>
								) : (
									<Btn
										className="btn-sm my-2"
										text={path}
									/>
								)}

								{key < props.page.path.length - 1 && (
									<span
										className={`${
											location.pathname.match("/admin/")
												? "text-primary"
												: location.pathname.match("/instructor/")
												? "text-danger"
												: "text-success"
										} text-white`}>
										<ChevronRightSVG />
									</span>
								)}
							</div>
						))}
					</div>
					{props.children}
				</div>
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
