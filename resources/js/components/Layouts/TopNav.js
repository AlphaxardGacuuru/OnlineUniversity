import React from "react"
import { Link, useLocation } from "react-router-dom"

const open = () => document.getElementById("MyElement").className = "menu-open"
const close = () => document.getElementById("MyElement").classList.remove("menu-open")

window.onscroll = () => {
	if (window.pageYOffset > 0) {
		document.getElementById("header-area").classList.add("sticky")
	} else {
		document.getElementById("header-area").classList.remove("sticky")
	}
}

const TopNav = () => {

	const location = useLocation()

	return (
		<div id="MyElement">
			{/* Preloader Start */}
			{/* <div id="preloader">
				<div className="preload-content">
					<div id="sonar-load"></div>
				</div>
			</div> */}
			{/* Preloader End */}

			{/* <!-- Grids --> */}
			<div className="grids d-flex justify-content-between">
				<div className="grid1"></div>
				<div className="grid2"></div>
				<div className="grid3"></div>
				<div className="grid4"></div>
				<div className="grid5"></div>
				<div className="grid6"></div>
				<div className="grid7"></div>
				<div className="grid8"></div>
				<div className="grid9"></div>
			</div>

			{/* <!-- ***** Main Menu Area Start ***** --> */}
			<div className="mainMenu d-flex align-items-center justify-content-between">
				{/* <!-- Close Icon --> */}
				<div className="closeIcon" onClick={close}>
					<i className="ti-close" aria-hidden="true"></i>
				</div>
				{/* <!-- Logo Area --> */}
				<div className="logo-area">
					<Link to="/">HAVI Lenses</Link>
				</div>
				{/* <!-- Nav --> */}
				<div className="sonarNav wow fadeInUp" data-wow-delay="1s">
					<nav>
						<ul>
							<li className="nav-item active">
								<Link
									className="nav-link"
									to="/"
									style={{ opacity: location.pathname == "/" ? 1 : 0.4 }}
									onClick={close}>Home</Link>
							</li>
							<li className="nav-item">
								<Link
									className="nav-link"
									to="/about"
									style={{ opacity: location.pathname == "/about" ? 1 : 0.4 }}
									onClick={close}>About Me</Link>
							</li>
							<li className="nav-item">
								<Link
									className="nav-link"
									to="/services"
									style={{ opacity: location.pathname == "/services" ? 1 : 0.4 }}
									onClick={close}>Services</Link>
							</li>
							<li className="nav-item">
								<Link
									className="nav-link"
									to="/portfolio"
									style={{ opacity: location.pathname == "/portfolio" ? 1 : 0.4 }}
									onClick={close}>Portfolio</Link>
							</li>
							<li className="nav-item">
								<Link
									className="nav-link"
									to="/contact"
									style={{ opacity: location.pathname == "/contact" ? 1 : 0.4 }}
									onClick={close}>Contact</Link>
							</li>
							<li className="nav-item">
								<Link
									className="nav-link"
									to="/contract"
									style={{ opacity: location.pathname == "/contract" ? 1 : 0.4 }}
									onClick={close}>Contract</Link>
							</li>
						</ul>
					</nav>
				</div>
				{/* <!-- Copwrite Text --> */}
				<div className="copywrite-text">
					<p>
						{/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
						Copyright &copy;
						<script>
							document.write(new Date().getFullYear());
						</script> All rights reserved | This template is made
						with <i className="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com"
							target="_blank">Colorlib</a>
						{/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
					</p>
				</div>
			</div>
			{/* <!-- ***** Main Menu Area End ***** --> */}

			{/* <!-- ***** Header Area Start ***** --> */}
			<header id="header-area" className="header-area">
				<div className="container-fluid">
					<div className="row">
						<div className="col-12">
							<div className="menu-area d-flex justify-content-between">
								{/* <!-- Logo Area  --> */}
								<div className="logo-area">
									<Link to="/">HAVI Lenses</Link>
								</div>

								<div className="menu-content-area d-flex align-items-center">
									{/* <!-- Header Social Area --> */}
									<div className="header-social-area d-flex align-items-center">
										<a href="tel:0700364446" data-toggle="tooltip" data-placement="bottom" title="Phone">
											<i className="fa fa-phone" aria-hidden="true"></i>
										</a>
										<a href="sms:0700364446" data-toggle="tooltip" data-placement="bottom" title="SMS">
											<i className="fa fa-comment-o" aria-hidden="true"></i>
										</a>
										<a href="https://wa.me/+2540700364446" data-toggle="tooltip" data-placement="bottom" title="WhatsApp">
											<i className="fa fa-whatsapp" aria-hidden="true"></i>
										</a>
										<a href="mailto:alphaxardgacuuru47@gmail.com?subject = Photography&body = Enquiry" data-toggle="tooltip" data-placement="bottom" title="Email">
											<i className="fa fa-envelope-o" aria-hidden="true"></i>
										</a>
										<a href="https://www.instagram.com/alphaxard_gacuuru" data-toggle="tooltip"
											data-placement="bottom" title="Instagram">
											<i className="fa fa-instagram" aria-hidden="true"></i>
										</a>
										<a href="https://www.facebook.com/alphaxard.gacuuru" data-toggle="tooltip"
											data-placement="bottom" title="Facebook">
											<i className="fa fa-facebook" aria-hidden="true"></i>
										</a>
									</div>
									{/* <!-- Menu Icon --> */}
									<span className="navbar-toggler-icon" id="menuIcon" onClick={open}></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
			{/* <!-- ***** Header Area End ***** --> */}

		</div>
	)
}

export default TopNav