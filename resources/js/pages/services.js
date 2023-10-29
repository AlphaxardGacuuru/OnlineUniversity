import { Link } from "react-router-dom"

const Services = () => {
	return (
		<div>
			{/* <!-- ***** Hero Area Start ***** --> */}
			<div className="row">
				<div className="col-sm-6 p-0">
					<img src="img/bg-img/blog.jpg" alt="creator" />
				</div>
				<div className="col-sm-6" style={{ backgroundColor: "#232323" }}>
					<div className="mt-5 mb-5 hidden"></div>
					<center>
						<br />
						<br />
						<div className="d-flex justify-content-center mb-3">
							<div className="p-2 ml-5 mr-5 hidden">Flex item 1</div>
							<div className="p-5">
								<div className="m-3" style={{ backgroundColor: "white", height: "1px" }}></div>
								<h2 style={{ color: "white" }}>I provide top quality services</h2>
								<p style={{ color: "white" }}>
									I use proven principles of photography and cinematography and
									add my personal touch to give you an experience like never
									before, using new technology to enhance your event
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

			{/* <!-- ***** Services Area Start ***** --> */}
			<div className="sonar-services-area section-padding-100-50">
				<div className="container">
					<div className="row">
						{/* <!-- Wedding Photography Plus Area --> */}
						<div className="col-12 col-md-6 col-lg-4">
							<div
								className="single-services-area wow fadeInUp card py-5 px-2"
								style={{ backgroundColor: "#FFC862" }}
								data-wow-delay="300ms">
								<center>
									<span>
										<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"
											className="bi bi-camera-reels" viewBox="0 0 16 16">
											<path fill-rule="evenodd"
												d="M0 8a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 7.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 16H2a2 2 0 0 1-2-2V8zm11.5 5.175l3.5 1.556V7.269l-3.5 1.556v4.35zM2 7a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H2z" />
											<path fill-rule="evenodd"
												d="M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
											<path fill-rule="evenodd"
												d="M9 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
										</svg>
									</span>
									<h4>Wedding Photography <br />Plus</h4>
									<span>2 Photographers</span><br />
									<span>2 Cinematographers</span><br />
									<span>3 A3 Mounts</span><br />
									<span>1 Photo Magazine</span><br />
									<span>250 Photos</span><br />
									<span>Video (40mns-1.5hrs)</span><br />
									<span>Trailer (6 - 12mns)</span><br />
									<span>Free Engagement Shoot</span><br />
									<br />
									<h5>Ksh 50,000</h5>
									<br />
									<p>
										“What i like about photographs is that they capture a moment
										that’s gone forever, impossible to reproduce.” ― Karl Lagerfeld.
									</p>
								</center>
							</div>
						</div>
						{/* <!-- Wedding Photography Standard Area --> */}
						<div className="col-12 col-md-6 col-lg-4">
							<div
								className="single-services-area wow fadeInUp card py-5 px-2"
								style={{ backgroundColor: "#102336", color: "white" }}
								data-wow-delay="600ms">
								<center>
									<span>
										<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"
											className="bi bi-camera-video" viewBox="0 0 16 16">
											<path fill-rule="evenodd"
												d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175l3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z" />
										</svg>
									</span>
									<h4 style={{ color: "white" }}>Wedding Photography <br />Standard</h4>
									<span>2 Photographers</span><br />
									<span>1 Cinematographer</span><br />
									<span>1 A3 Mount</span><br />
									<span>150 Photos</span><br />
									<span>Video (40mns-1.5hrs)</span><br />
									<span>Trailer (6 - 12mns)</span><br />
									<span>Free Engagement Shoot</span><br />
									<br />
									<h5 style={{ color: "white" }}>Ksh 30,000</h5>
									<br />
									<p style={{ color: "white" }}>
										“If your pictures are not good enough you are not close enough.”
										― Robert Capa
									</p>
								</center>
							</div>
						</div>
						{/* <!-- Wedding Photography Budget Area --> */}
						<div className="col-12 col-md-6 col-lg-4">
							<div
								className="single-services-area wow fadeInUp card py-5 px-2"
								style={{ backgroundColor: "#232323", color: "white" }}
								data-wow-delay="300ms">
								<center>
									<span>
										<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"
											className="bi bi-camera" viewBox="0 0 16 16">
											<path fill-rule="evenodd"
												d="M15 12V6a1 1 0 0 0-1-1h-1.172a3 3 0 0 1-2.12-.879l-.83-.828A1 1 0 0 0 9.173 3H6.828a1 1 0 0 0-.707.293l-.828.828A3 3 0 0 1 3.172 5H2a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z" />
											<path fill-rule="evenodd"
												d="M8 11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
											<path d="M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
										</svg>
									</span>
									<h4 style={{ color: "white" }}>Wedding Photography <br />Budget</h4>
									<span>1 Photographer</span><br />
									<span>1 Cinematographer</span><br />
									<span>100 Photos</span><br />
									<span>Video (40mns-1.5hrs)</span><br />
									<span>Trailer (6 - 12mns)</span><br />
									<br />
									<h5 style={{ color: "white" }}>Ksh 20,000</h5>
									<br />
									<p style={{ color: "white" }}>
										A story should have a beginning, a middle and an end… but not
										necessarily in that order. – Jean-Luc Godard.
									</p>
								</center>
							</div>
						</div>
						{/* <!-- Engagement Shoot Area --> */}
						<div className="col-12 col-md-6 col-lg-4">
							<div
								className="single-services-area wow fadeInUp card py-5 px-2"
								style={{ backgroundColor: "#fb3958" }}
								data-wow-delay="900ms">
								<center>
									<span>
										<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"
											className="bi bi-gem" viewBox="0 0 16 16">
											<path fill-rule="evenodd"
												d="M3.1.7a.5.5 0 0 1 .4-.2h9a.5.5 0 0 1 .4.2l2.976 3.974c.149.185.156.45.01.644L8.4 15.3a.5.5 0 0 1-.8 0L.1 5.3a.5.5 0 0 1 0-.6l3-4zm11.386 3.785l-1.806-2.41-.776 2.413 2.582-.003zm-3.633.004l.961-2.989H4.186l.963 2.995 5.704-.006zM5.47 5.495l5.062-.005L8 13.366 5.47 5.495zm-1.371-.999l-.78-2.422-1.818 2.425 2.598-.003zM1.499 5.5l2.92-.003 2.193 6.82L1.5 5.5zm7.889 6.817l2.194-6.828 2.929-.003-5.123 6.831z" />
										</svg>
									</span>
									<h4>Engagement Shoot</h4>
									<span>1 A3 Mount</span><br />
									<span>30 Edited, Retouched (with skin smoothening) Photos</span>
									<br />
									<br />
									<h5>Ksh 5,000</h5>
									<br />
								</center>
							</div>
						</div>
						{/* <!-- Family Area --> */}
						<div className="col-12 col-md-6 col-lg-4">
							<div
								className="single-services-area wow fadeInUp card py-5 px-2"
								style={{ backgroundColor: "#81D9DD" }}
								data-wow-delay="300ms">
								<center>
									<span>
										<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"
											className="bi bi-people" viewBox="0 0 16 16">
											<path fill-rule="evenodd"
												d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1h7.956a.274.274 0 0 0 .014-.002l.008-.002c-.002-.264-.167-1.03-.76-1.72C13.688 10.629 12.718 10 11 10c-1.717 0-2.687.63-3.24 1.276-.593.69-.759 1.457-.76 1.72a1.05 1.05 0 0 0 .022.004zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10c-1.668.02-2.615.64-3.16 1.276C1.163 11.97 1 12.739 1 13h3c0-1.045.323-2.086.92-3zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
										</svg>
									</span>
									<h4>Family Shoot</h4>
									<span>1 A3 Mount</span><br />
									<span>30 Edited, Retouched (with skin smoothening) Photos</span>
									<br />
									<br />
									<h5>Ksh 5,000</h5>
									<br />
								</center>
							</div>
						</div>
						{/* <!-- Baby Bump Area --> */}
						<div className="col-12 col-md-6 col-lg-4">
							<div
								className="single-services-area wow fadeInUp card py-5 px-2"
								style={{ backgroundColor: "#FF0080" }}
								data-wow-delay="600ms">
								<center>
									<span>
										<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"
											className="bi bi-person" viewBox="0 0 16 16">
											<path fill-rule="evenodd"
												d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
										</svg>
									</span>
									<h4>Baby Bump Shoot</h4>
									<span>1 A3 Mount</span><br />
									<span>30 Edited Photos</span><br />
									<br />
									<h5>Ksh 5,000</h5>
									<br />
								</center>
							</div>
						</div>
						{/* <!-- Products Area --> */}
						<div className="col-12 col-md-6 col-lg-4">
							<div
								className="single-services-area wow fadeInUp card py-5 px-2"
								style={{ backgroundColor: "#914E3B" }}
								data-wow-delay="600ms">
								<center>
									<span>
										<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"
											className="bi bi-bag" viewBox="0 0 16 16">
											<path fill-rule="evenodd"
												d="M8 1a2.5 2.5 0 0 0-2.5 2.5V4h5v-.5A2.5 2.5 0 0 0 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5H2z" />
										</svg>
									</span>
									<h4>Products</h4>
									<span>A3 Mount - Ksh 2500</span><br />
									<span>A2 Mount - Ksh 4500</span><br />
									<span>Photo Magazine (40 pgs) - Ksh 10,000</span><br />
									<span>Photo Magazine (20 pgs) - Ksh 8,000</span><br />
									<br />
								</center>
							</div>
						</div>
						{/* <!-- Add-ons Area --> */}
						<div className="col-12 col-md-6 col-lg-4">
							<div
								className="single-services-area wow fadeInUp card py-5 px-2"
								style={{ backgroundColor: "#CFF56A" }}
								data-wow-delay="600ms">
								<center>
									<h4>Wedding Package <br />Add-ons</h4>
									<h5>Drone - Ksh 25,000</h5>
									<h5>Live Streaming - Ksh 15,000</h5>
									<br />
								</center>
							</div>
						</div>
						{/* <!-- Terms and Details Area --> */}
						<div className="col-12 col-md-6 col-lg-4">
							<div className="single-services-area wow fadeInUp card py-5 px-2" data-wow-delay="600ms">
								<center><h4>Terms and Details</h4></center>
								<h6>Early booking of 2 weeks is recommended to secure the day.</h6>
								<h6>Booking is done by paying 80% of the total package cost and the remaining 20% on D-day.</h6>
								<h6>Content will be delivered via a Flash Disk provided by me.</h6>
								<h6>Wedding package add-ons are an extra cost.</h6>
								<h6>Delivery:</h6>
								<h6 className="ml-3">Photos - 48hrs.</h6>
								<h6 className="ml-3">Videos - 2 weeks.</h6>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <!-- ***** Services Area End ***** --> */}

			<div className="sonar-testimonials-area bg-img" style={{ backgroundImage: "url(img/bg-img/tes.jpg)" }}>
				<div className="container-fluid">
					<div className="row">
						<div className="col-12 col-md-10 col-lg-7">
							<div className="testimonial-content bg-white">
								<div className="section-heading text-left">
									<div className="line"></div>
									{/* <h2>Testimonials</h2>
								</div>

								<div className="testimonial-slides owl-carousel">

									<div className="single-tes-slide">
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel tortor facilisis, volutpat nulla placerat, tincidunt mi. Nullam vel orci dui. Suspendisse sit amet laoreet neque. Fusce sagittis suscipit sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel tortor facilisis, volutpat nulla placerat, tincidunt mi. Nullam vel orci dui. Suspendisse sit amet laoreet neque.</p>
										<h6>Maria Smith, Bride</h6>
									</div>

									<div className="single-tes-slide">
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel tortor facilisis, volutpat nulla placerat, tincidunt mi. Nullam vel orci dui. Suspendisse sit amet laoreet neque. Fusce sagittis suscipit sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel tortor facilisis, volutpat nulla placerat, tincidunt mi. Nullam vel orci dui. Suspendisse sit amet laoreet neque.</p>
										<h6>Maria Smith, Bride</h6>
									</div>

									<div className="single-tes-slide">
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel tortor facilisis, volutpat nulla placerat, tincidunt mi. Nullam vel orci dui. Suspendisse sit amet laoreet neque. Fusce sagittis suscipit sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel tortor facilisis, volutpat nulla placerat, tincidunt mi. Nullam vel orci dui. Suspendisse sit amet laoreet neque.</p>
										<h6>Maria Smith, Bride</h6>
									</div>

									<div className="single-tes-slide">
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel tortor facilisis, volutpat nulla placerat, tincidunt mi. Nullam vel orci dui. Suspendisse sit amet laoreet neque. Fusce sagittis suscipit sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel tortor facilisis, volutpat nulla placerat, tincidunt mi. Nullam vel orci dui. Suspendisse sit amet laoreet neque.</p>
										<h6>Maria Smith, Bride</h6>
									</div>

									<div className="single-tes-slide">
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel tortor facilisis, volutpat nulla placerat, tincidunt mi. Nullam vel orci dui. Suspendisse sit amet laoreet neque. Fusce sagittis suscipit sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel tortor facilisis, volutpat nulla placerat, tincidunt mi. Nullam vel orci dui. Suspendisse sit amet laoreet neque.</p>
										<h6>Maria Smith, Bride</h6>
									</div>

									<div className="single-tes-slide">
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel tortor facilisis, volutpat nulla placerat, tincidunt mi. Nullam vel orci dui. Suspendisse sit amet laoreet neque. Fusce sagittis suscipit sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel tortor facilisis, volutpat nulla placerat, tincidunt mi. Nullam vel orci dui. Suspendisse sit amet laoreet neque.</p>
										<h6>Maria Smith, Bride</h6>
									</div>

									<div className="single-tes-slide">
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel tortor facilisis, volutpat nulla placerat, tincidunt mi. Nullam vel orci dui. Suspendisse sit amet laoreet neque. Fusce sagittis suscipit sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel tortor facilisis, volutpat nulla placerat, tincidunt mi. Nullam vel orci dui. Suspendisse sit amet laoreet neque.</p>
										<h6>Maria Smith, Bride</h6>
									</div>

									<div className="single-tes-slide">
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel tortor facilisis, volutpat nulla placerat, tincidunt mi. Nullam vel orci dui. Suspendisse sit amet laoreet neque. Fusce sagittis suscipit sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel tortor facilisis, volutpat nulla placerat, tincidunt mi. Nullam vel orci dui. Suspendisse sit amet laoreet neque.</p>
										<h6>Maria Smith, Bride</h6>
									</div> */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="cool-facts-area section-padding-100-0">
				<div className="container">
					<div className="row align-items-center">
						{/* <!-- Single Cool Fact--> */}
						<div className="col-12 col-sm-6 col-lg-3">
							<div className="single-cool-fact-area text-center mb-100 wow fadeInUpBig" data-wow-delay="250ms">
								<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor"
									className="bi bi-person" viewBox="0 0 16 16">
									<path
										d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
								</svg>
								<h2><span className="counter">61</span></h2>
								<h6>Happy Brides</h6>
							</div>
						</div>
						{/* <!-- Single Cool Fact--> */}
						<div className="col-12 col-sm-6 col-lg-3">
							<div className="single-cool-fact-area text-center mb-100 wow fadeInUpBig" data-wow-delay="500ms">
								<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor"
									className="bi bi-laptop" viewBox="0 0 16 16">
									<path
										d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5h11zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2h-11zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5z" />
								</svg>
								<h2><span className="counter">100</span></h2>
								<h6>Hours of video editing</h6>
							</div>
						</div>
						{/* <!-- Single Cool Fact--> */}
						<div className="col-12 col-sm-6 col-lg-3">
							<div className="single-cool-fact-area text-center mb-100 wow fadeInUpBig" data-wow-delay="750ms">
								<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor"
									className="bi bi-images" viewBox="0 0 16 16">
									<path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
									<path
										d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z" />
								</svg>
								<h2><span className="counter">1400</span></h2>
								<h6>Edited Photos</h6>
							</div>
						</div>
						{/* <!-- Single Cool Fact--> */}
						<div className="col-12 col-sm-6 col-lg-3">
							<div className="single-cool-fact-area text-center mb-100 wow fadeInUpBig" data-wow-delay="1000ms">
								<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor"
									className="bi bi-cup" viewBox="0 0 16 16">
									<path
										d="M1 2a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v1h.5A1.5 1.5 0 0 1 16 4.5v7a1.5 1.5 0 0 1-1.5 1.5h-.55a2.5 2.5 0 0 1-2.45 2h-8A2.5 2.5 0 0 1 1 12.5V2zm13 10h.5a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5H14v8zM13 2H2v10.5A1.5 1.5 0 0 0 3.5 14h8a1.5 1.5 0 0 0 1.5-1.5V2z" />
								</svg>
								<h2><span className="counter">120</span></h2>
								<h6>Teas a month</h6>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* <!-- ***** Call to Action Area Start ***** --> */}
			<div className="sonar-call-to-action-area bg-gray section-padding-100">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="call-to-action-content">
								<h2>I'm an experienced photographer and videographer</h2>
								<h5>Let’s talk</h5>
								<Link to="/contact" className="btn sonar-btn mt-100">contact me</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <!-- ***** Call to Action Area End ***** --></br> */}
		</div>
	)
}

export default Services
