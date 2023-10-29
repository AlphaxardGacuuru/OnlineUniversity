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
	const router = useHistory()
	const location = useLocation()

	// const { logout } = useAuth({ setLogin: props.setLogin })
	const [menu, setMenu] = useState("")
	const [bottomMenu, setBottomMenu] = useState("")
	const [notificationMenu, setNotificationMenu] = useState("")
	const [avatarVisibility, setAvatarVisibility] = useState("none")
	const [notifications, setNotifications] = useState([])

	var cartItems =
		props.cartClubs.length +
		props.cartEvents.length +
		props.cartServices.length +
		props.cartGoods.length

	cartItems = cartItems > 0 && cartItems

	const unReadNotifications = notifications.filter(
		(notification) => !notification.isRead
	).length

	var totalNotifications = unReadNotifications > 0 && unReadNotifications

	useEffect(() => {
		// Fetch Auth
		!location.pathname.match("admin") &&
			!location.pathname.match("service-provider") &&
			Axios.get("/api/auth")
				.then((res) => {
					props.setAuth(res.data.data)
					// Set LocalStorage
					props.setLocalStorage("auth", res.data.data)
				})
				.catch((err) => {
					props.getErrors(err, false)

					// Redirect Unauthorized users
					if (
						props.auth.name == "Guest" &&
						!location.pathname.match("/socialite/") &&
						!location.pathname.match("/register/")
					) {
						router.push("/")
					}
				})

		// Fetch Cart Items
		props.get("cart-clubs", props.setCartClubs)
		props.get("cart-events", props.setCartEvents)
		props.get("cart-services", props.setCartServices)
		props.get("cart-goods", props.setCartGoods)

		// Listen to Notifications
		Echo.private(`App.Models.User.${props.auth.id}`).notification(
			(notification) => props.get("notifications", setNotifications)
		)

		// Fetch Notifications
		props.auth.name != "Guest" && props.get("notifications", setNotifications)

		return () => {
			Echo.leaveChannel(`App.Models.User.${props.auth.id}`)
		}
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

	const profileUrl = () => {
		if (props.auth.accountType == "normal") {
			return `/profile/show/${props.auth.id}`
		} else if (props.accountType == "service-provider") {
			return `/service-provider/show/${props.auth.id}`
		} else {
			return `/admin/staff/edit/${props.auth.id}`
		}
	}

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
		location.pathname.match("/service-provider") ||
		location.pathname.match("/admin") ||
		location.pathname.match("/verify-email/") ||
		location.pathname.match("/chat/show") ||
		location.pathname.match("/404") ||
		location.pathname.match("/privacy") ||
		location.pathname.match("/download") ||
		location.pathname.match("/login") ||
		location.pathname.match("/register")
			? "d-none"
			: ""

	return (
		<>
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
									<div className="d-flex align-items-center">
										{/* <!-- Left Menu Icon --> */}
										<a
											href="#"
											id="menuIcon"
											className={`me-3 ${
												location.pathname.match("/profile/") ||
												location.pathname.match("/service-provider/") ||
												location.pathname.match("/admin")
													? "d-block"
													: "d-none"
											}`}
											onClick={(e) => {
												e.preventDefault()
												// Check location and open respective menu
												if (location.pathname.match("/profile/")) {
													// Open Profile Menu
													props.setLeftMenu(props.leftMenu ? "" : "left-open")
												} else if (
													location.pathname.match("/service-provider/")
												) {
													// Open Service Provider Menu
													props.setServiceProviderMenu(
														props.serviceProviderMenu ? "" : "left-open"
													)
												} else {
													// Open Admin Menu
													props.setAdminMenu(props.adminMenu ? "" : "left-open")
												}
											}}>
											<MenuSVG />
										</a>
										{/* <!-- Left Menu Icon End --> */}

										{/* <!-- Logo Area  --> */}
										<div className="logo-area">
											<Link to="/">Party People</Link>
										</div>
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
										<div className="hidden">
											<Link
												to="/club"
												className={`nav-link mx-4 ${active("/club")}`}
												onClick={() => setMenu("")}>
												Clubs
											</Link>
										</div>
										<div className="hidden">
											<Link
												to="/party"
												className={`nav-link mx-4 ${active("/party")}`}
												onClick={() => setMenu("")}>
												Parties
											</Link>
										</div>
										<div className="hidden">
											<Link
												to="/event"
												className={`nav-link mx-4 ${active("/event")}`}
												onClick={() => setMenu("")}>
												Events
											</Link>
										</div>
									</div>
									{/* Nav Links End */}

									{/* Top Nav Links Area */}
									<div className="menu-content-area d-flex align-items-center">
										<div className="d-flex align-items-center justify-content-between">
											{/* Admin */}
											{props.auth.accountType == "admin" && (
												<MyLink
													linkTo="/admin"
													className="mx-3 hidden"
													text="go to admin"
												/>
											)}
										</div>
										<div className="header-social-area d-flex align-items-center">
											<>
												{/* Cart */}
												<div className="dropdown mx-3">
													<Link
														to="/cart"
														role="button"
														id="dropdownMenua"
														// data-toggle="dropdown"
														aria-haspopup="true"
														aria-expanded="false"
														style={{
															textAlign: "center",
															fontWeight: "100",
														}}
														className="position-relative">
														<CartSVG />
														<span
															className="position-absolute start-200 translate-middle badge rounded-circle bg-danger fw-lighter py-1"
															style={{ fontSize: "0.6em", top: "0.2em" }}>
															{cartItems}
														</span>
													</Link>
												</div>
												{/* Cart End */}

												{/* Notification Dropdown */}
												<div className="dropdown-center me-3">
													<Link
														to="#"
														role="button"
														id="dropdownMenua"
														className="hidden"
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
															{totalNotifications}
														</span>
													</Link>
													{/* For smaller screens */}
													<span
														className="anti-hidden m-2"
														style={{
															textAlign: "center",
															fontWeight: "100",
															position: "relative",
														}}
														onClick={() => {
															setNotificationMenu(
																notificationMenu ? "" : "menu-open-comment"
															)
															setBottomMenu("")
															setAvatarVisibility("none")
															onNotification()
														}}>
														<BellSVG />
														<span
															className="position-absolute start-200 translate-middle badge rounded-circle bg-danger fw-lighter py-1"
															style={{ fontSize: "0.6em", top: "0.2em" }}>
															{totalNotifications}
														</span>
													</span>
													<div
														style={{
															borderRadius: "0",
															minWidth: "20em",
															maxWidth: "40em",
														}}
														className="dropdown-menu m-0 p-0"
														aria-labelledby="dropdownMenuButton">
														<div className="dropdown-header border-bottom bg-white">
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
																	className="p-2 dropdown-item border-bottom text-dark text-wrap"
																	onClick={() =>
																		onDeleteNotifications(notification.id)
																	}>
																	<small>{notification.message}</small>
																</Link>
															))}
														</div>
														{totalNotifications > 0 && (
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
												<div className="dropdown-center pb-2">
													{/* Avatar */}
													<a
														href="#"
														role="button"
														className="hidden"
														data-bs-toggle="dropdown"
														aria-expanded="false">
														<Img
															src={props.auth?.avatar}
															className="rounded-circle"
															width="20px"
															height="20px"
															alt="Avatar"
														/>
													</a>
													{/* For small screens */}
													<span
														className="anti-hidden me-2"
														onClick={() => {
															setNotificationMenu("")
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
															to={profileUrl}
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
										{/* <!-- Menu Icon --> */}
										<a
											href="#"
											id="menuIcon"
											className="anti-hidden"
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
				<div className="mainMenu d-flex align-items-center justify-content-between">
					{/* <!-- Close Icon --> */}
					<div
						className="closeIcon"
						onClick={() => setMenu("")}>
						<CloseSVG />
					</div>
					{/* <!-- Logo Area --> */}
					<div className="logo-area">
						<Link to="/">Party People</Link>
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
							to={profileUrl}
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

			{/* Sliding Notifications Nav */}
			<div className={notificationMenu}>
				<div className="commentMenu">
					<div className="d-flex align-items-center justify-content-between">
						<div
							className="ms-2 fw-lighter"
							onClick={() => {
								setNotificationMenu("")
								onDeleteNotifications(0)
							}}>
							Clear
						</div>
						<div className="dropdown-header pt-2">
							<h5>Notifications</h5>
						</div>
						{/* <!-- Close Icon --> */}
						<div
							className="closeIcon float-end me-2"
							style={{ fontSize: "0.8em" }}
							onClick={() => setNotificationMenu("")}>
							<CloseSVG />
						</div>
					</div>

					{/* Notifications Bottom */}
					<div className="m-0 p-0">
						<div style={{ maxHeight: "500px", overflowY: "scroll" }}>
							{/* Get Notifications */}
							{notifications.map((notification, key) => (
								<Link
									key={key}
									to={notification.url}
									className="p-2"
									style={{
										display: "block",
										textAlign: "left",
									}}
									onClick={() => {
										setNotificationMenu("")
										onDeleteNotifications(notification.id)
									}}>
									<small>{notification.message}</small>
								</Link>
							))}
						</div>
					</div>
					{/* Notifications Bottom End */}
				</div>
			</div>
			{/* Sliding Notifications Nav End */}
		</>
	)
}

export default TopNav
