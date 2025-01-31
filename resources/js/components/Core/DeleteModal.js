import React from "react"

const DeleteModal = ({ index, model, modelName, message, onDelete }) => {
	return (
		<React.Fragment>
			{/* Confirm Delete Modal End */}
			<div
				className="modal fade"
				id={`deleteModal${index}`}
				tabIndex="-1"
				aria-labelledby="deleteModalLabel"
				aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content rounded-0">
						<div className="modal-header">
							<h1
								id="deleteModalLabel"
								className="modal-title fs-5">
								Delete {modelName}
							</h1>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"></button>
						</div>
						<div className="modal-body text-start text-wrap">
							{message}
						</div>
						<div className="modal-footer justify-content-between">
							<button
								type="button"
								className="btn btn-light rounded-pill"
								data-bs-dismiss="modal">
								Close
							</button>
							<button
								type="button"
								className="btn btn-danger rounded-pill"
								data-bs-dismiss="modal"
								onClick={() => onDelete(model.id)}>
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>
			{/* Confirm Delete Modal End */}

			{/* Button trigger modal */}
			<button
				type="button"
				className="btn btn-sm btn-danger rounded-pill"
				data-bs-toggle="modal"
				data-bs-target={`#deleteModal${index}`}>
				Delete
			</button>
		</React.Fragment>
	)
}

export default DeleteModal
