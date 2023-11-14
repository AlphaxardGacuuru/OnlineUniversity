import React from "react"
import Img from "@/components/Core/Img"

const index = () => {
	return (
		<div className="row">
			<div className="col-sm-12">
				<div className="d-flex justiy-content-start mt-5 p-5">
					<div className="my-auto">
						<h1>Student Experience</h1>
						<p>
							Learn from the most prestigious academic minds in the world and
							join a university that believes high-quality education should be
							affordable and attainable for all.
						</p>
					</div>
					<div>
						<Img
							src="storage/img/2.png"
							style={{
								width: "100%",
								height: "auto",
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default index
