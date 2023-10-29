const Footer = () => {
	return (
		<div>
			{/* <!-- ***** Footer Area Start ***** --> */}
			<footer className="footer-area">
				{/* <!-- back end content --> */}
				<div className="backEnd-content">
					<img className="dots" src="img/core-img/dots.png" alt="" />
					<h2>Dream</h2>
				</div>

				<div className="container">
					<div className="row">
						<div className="col-12">
							{/* <!-- Copywrite Text --> */}
							<div className="copywrite-text">
								<p>
									{/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
									Copyright &copy;
									<script>
										document.write(new Date().getFullYear());
									</script>
									All rights reserved | This template is made with
									<i className="fa fa-heart-o mx-1" aria-hidden="true"></i>by
									<a href="https://colorlib.com" target="_blank"rel="noreferrer" className="mx-1">Colorlib</a>
									{/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
								</p>
							</div>
						</div>
					</div>
				</div>
			</footer>
			{/* <!-- ***** Footer Area End ***** --> */}
		</div>
	)
}

export default Footer
