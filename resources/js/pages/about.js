import { Link } from "react-router-dom"

const About = () => {
	return (
		<div>
			{/* <!-- ***** Hero Area Start ***** --> */}
			<div className="row">
				<div className="col-sm-6 p-0">
					<img src="img/bg-img/Me-3.jpg" loading="lazy" alt="creator" />
				</div>
				<div className="col-sm-6" style={{ backgroundColor: "#232323" }}>
					<div className="mt-5 mb-5 hidden"></div>
					<center>
						<br />
						<br />
						<div className="d-flex justify-content-center mb-3">
							<div className="p-2 ml-5 mr-5 hidden">Flex item 1</div>
							<div className="px-3">
								<div className="m-3" style={{ backgroundColor: "white", height: "1px" }}></div>
								<h2 style={{ color: "white" }}>Hi, I'm Al</h2>
								<p style={{ color: "white" }}>
									I'm an experienced photographer and videographer and I know that
									wedding ceremonies ought to be memorable, thus HAVI Lenses offers
									customized wedding coverage to immortalize your day.
								</p>
							</div>
							<div className="p-2 ml-5 mr-5 hidden">Flex item 3</div>
						</div>
						<Link to="/contact" className="btn sonar-btn white-btn">contact me</Link>
						<br />
						<br />
						<br />
					</center>
				</div>
			</div>
			{/* <!-- ***** Hero Area End ***** --> */}

			<div className="sonar-about-us-area bg-img" style={{ backgroundImage: "url(img/bg-img/about2.jpg)" }}>
				{/* <!-- Back End Content --> */}
				<div className="backEnd-content">
					<h2>Dream</h2>
				</div>

				<div className="container-fluid">
					<div className="row">
						<div className="col-12 col-md-10 col-lg-7">
							<div className="about-us-content bg-white">
								<div className="section-heading text-left wow fadeInUp" data-wow-delay="300ms">
									<div className="line"></div>
									<h2>Look at my qualities</h2>
								</div>
								<h6 className="wow fadeInUp" data-wow-delay="600ms">
									I understand that patience is a virtue and how valuable you are
									to me as a customer, thus I combine my creativity and commitment
									to offer you the best services imaginable.
								</h6>
								{/* <!-- Progress Bar Content Area --> */}
								<div className="services-progress-bar mt-50 wow fadeInUp" data-wow-delay="900ms">
									<div className="progress rounded-0" style={{ height: "20px" }}>
										<div className="progress-bar" style={{ backgroundColor: "#232323", width: "90%" }}>
											<span className="p-2" style={{ textAlign: "right" }}> 90%</span>
										</div>
									</div>
									<h6>Patience</h6>
									<br />
									<div className="progress rounded-0" style={{ height: "20px" }}>
										<div className="progress-bar" style={{ backgroundColor: "#232323", width: "95%" }}>
											<span className="p-2" style={{ textAlign: "right" }}> 95%</span>
										</div>
									</div>
									<h6>Creativity</h6>
									<br />
									<div className="progress rounded-0" style={{ height: "20px" }}>
										<div className="progress-bar" style={{ backgroundColor: "#232323", width: "100%" }}>
											<span className="p-2" style={{ textAlign: "right" }}> 100%</span>
										</div>
									</div>
									<h6>Commited</h6>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="sonar-about-us-area second-part bg-img" style={{ backgroundImage: "url(img/bg-img/about3.jpg)" }}>
				{/* <!-- Back End Content --> */}
				<div className="backEnd-content">
					<h2>Really</h2>
				</div>

				<div className="container-fluid">
					<div className="row justify-content-end">
						<div className="col-12 col-md-10 col-lg-7">
							<div className="about-us-content bg-white">
								<div className="section-heading text-left wow fadeInUp" data-wow-delay="300ms">
									<div className="line"></div>
									<h3 className="wow fadeInUp" data-wow-delay="600ms">I am diverse</h3>
								</div>
								{/* <!-- Progress Bar Content Area --> */}
								<div className="services-progress-bar mt-50 wow fadeInUp" data-wow-delay="900ms">
									<div className="progress rounded-0" style={{ height: "30px" }}>
										<div className="progress-bar" style={{ backgroundColor: "#232323", width: "100%" }}>
											<span className="p-2" style={{ textAlign: "right" }}> 100%</span>
										</div>
									</div>
									<h6>Photography</h6>
									<br />
									<div className="progress rounded-0" style={{ height: "30px" }}>
										<div className="progress-bar" style={{ backgroundColor: "#232323", width: "100%" }}>
											<span className="p-2" style={{ textAlign: "right" }}> 100%</span>
										</div>
									</div>
									<h6>Video</h6>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div >
	)
}

export default About
