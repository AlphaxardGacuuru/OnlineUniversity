import React, { useState } from "react"
import { Link, useLocation, useHistory } from "react-router-dom"

import CloseSVG from "@/svgs/CloseSVG"
import CupSVG from "@/svgs/CupSVG"
import MenuSVG from "@/svgs/MenuSVG"
import PersonSVG from "@/svgs/PersonSVG"
import HomeSVG from "@/svgs/HomeSVG"
import ClubSVG from "@/svgs/ClubSVG"
import ServiceSVG from "@/svgs/ServiceSVG"
import EventSVG from "@/svgs/EventSVG"
import LoyaltySVG from "@/svgs/LoyaltySVG"
import TransactionSVG from "@/svgs/TransactionSVG"

const ServiceProviderNav = (props) => {
	const location = useLocation()

	// Location
	const show = location.pathname.match("service-provider")
		? "d-block"
		: "d-none"

	// Function for showing active color
	const active = (check) => {
		return (
			location.pathname.match(check) &&
			"border-start border-end border-3 border-primary text-primary bg-light"
		)
	}

	return (
		<React.Fragment>
			<div
				id="MyElement"
				className={`${props.serviceProviderMenu} ${show}`}>
				{/* <!-- ***** Side Menu Area Start ***** --> */}
				<div className="leftMenu d-flex align-items-center justify-content-start">
					<div
						className="sonarNav wow fadeInUp w-100 mt-4"
						data-wow-delay="1s">
						<nav>
							<ul className="m-0 p-0">
								{/* Profile Links */}
								<li className="nav-item active">
									<a
										href="#"
										className={`nav-link accordion-button ${
											active("/service-provider/show") ||
											active("/service-provider/edit")
										}`}
										data-bs-toggle="collapse"
										data-bs-target="#collapseProfile"
										aria-expanded="false"
										aria-controls="collapseProfile">
										<span>
											<PersonSVG />
										</span>
										Profile
									</a>

									{/* Collapse */}
									<div
										className="collapse"
										id="collapseProfile">
										<ol>
											<li className="nav-item">
												<Link
													to={`/service-provider/show/${props.auth.id}`}
													className={`nav-link ${active(
														"/service-provider/show/"
													)}`}>
													View Profile
												</Link>
											</li>
											<li className="nav-item">
												<Link
													to="/service-provider/edit"
													className={`nav-link ${active(
														"/service-provider/edit"
													)}`}>
													Edit Profile
												</Link>
											</li>
										</ol>
									</div>
									{/* Collapse End */}
								</li>
								{/* Profile Links End */}
								{/* Club Links */}
								<li className="nav-item active">
									<a
										href="#"
										className={`nav-link accordion-button ${active(
											"/service-provider/club/"
										)}`}
										data-bs-toggle="collapse"
										data-bs-target="#collapseClub"
										aria-expanded="false"
										aria-controls="collapseClub">
										<span>
											<ClubSVG />
										</span>
										Club
									</a>

									{/* Collapse */}
									<div
										className="collapse"
										id="collapseClub">
										<ol>
											<li className="nav-item">
												<Link
													to="/service-provider/club/show"
													className={`nav-link ${active(
														"/service-provider/club/show"
													)}`}>
													My Clubs
												</Link>
											</li>
											<li className="nav-item">
												<Link
													to="/service-provider/club/create"
													className={`nav-link ${active(
														"/service-provider/club/create"
													)}`}>
													Create Club
												</Link>
											</li>
											<li className="nav-item">
												<Link
													to="/service-provider/club/booking"
													className={`nav-link ${active(
														"/service-provider/club/booking"
													)}`}>
													Club Orders
												</Link>
											</li>
										</ol>
									</div>
									{/* Collapse End */}
								</li>
								{/* Club Links End */}
								{/* Event Links */}
								<li className="nav-item active">
									<a
										href="#"
										className={`nav-link accordion-button ${active(
											"/service-provider/event/"
										)}`}
										data-bs-toggle="collapse"
										data-bs-target="#collapseEvent"
										aria-expanded="false"
										aria-controls="collapseEvent">
										<span>
											<EventSVG />
										</span>
										Event
									</a>

									{/* Collapse */}
									<div
										className="collapse"
										id="collapseEvent">
										<ol>
											<li className="nav-item">
												<Link
													to={`/service-provider/event/show`}
													className={`nav-link ${active(
														"/service-provider/event/show"
													)}`}>
													My Events
												</Link>
											</li>
											<li className="nav-item">
												<Link
													to="/service-provider/event/create"
													className={`nav-link ${active(
														"/service-provider/event/create"
													)}`}>
													Create Event
												</Link>
											</li>
										</ol>
									</div>
									{/* Collapse End */}
								</li>
								{/* Event Links End */}
								{/* Service Links */}
								<li className="nav-item active">
									<a
										href="#"
										className={`nav-link accordion-button ${active(
											"/service-provider/service/"
										)}`}
										data-bs-toggle="collapse"
										data-bs-target="#collapseService"
										aria-expanded="false"
										aria-controls="collapseService">
										<span>
											<ServiceSVG />
										</span>
										Service
									</a>

									{/* Collapse */}
									<div
										className="collapse"
										id="collapseService">
										<ol>
											<li className="nav-item">
												<Link
													to={`/service-provider/service/show`}
													className={`nav-link ${active(
														"/service-provider/service/show"
													)}`}>
													My Services
												</Link>
											</li>
											<li className="nav-item">
												<Link
													to="/service-provider/service/create"
													className={`nav-link ${active(
														"/service-provider/service/create"
													)}`}>
													Create Service
												</Link>
											</li>
										</ol>
									</div>
									{/* Collapse End */}
								</li>
								{/* Service Links End */}
							</ul>
						</nav>
					</div>

					<br />
				</div>
				{/* <!-- ***** Side Menu Area End ***** --> */}
			</div>
			{props.children}
		</React.Fragment>
	)
}

export default ServiceProviderNav
