import React, { useState } from "react"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"

import MyLink from "@/components/Core/MyLink"
import Btn from "@/components/Core/Btn"
import HeroIcon from "@/components/Core/HeroIcon"
import DeleteModal from "@/components/Core/DeleteModal"

import ResourceSVG from "@/svgs/ResourceSVG"

import PaginationLinks from "@/components/Core/PaginationLinks"

const ResourceList = (props) => {
	const location = useLocation()

	/*
	 * View Resource
	 */
	var onView = (link) => {
		window.open(link, "_blank")
	}

	/*
	 * Delete Resource
	 */
	const onDeleteResource = (resourceId) => {
		Axios.delete(`/api/resources/${resourceId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove row
				props.setResources({
					meta: props.resources.meta,
					links: props.resources.links,
					data: props.resources.data.filter(
						(resource) => resource.id != resourceId
					),
				})
			})
			.catch((err) => props.getErrors(err))
	}

	return (
		<div className={props.activeTab}>
			{/* Data */}
			<div className="card shadow-sm mb-2 p-2">
				<div className="d-flex justify-content-between">
					{/* Total */}
					<div className="d-flex justify-content-between w-100 align-items-center mx-4">
						<div>
							<span className="fs-4">{props.resources.meta?.total}</span>
							<h4>Total Resources</h4>
						</div>
						<HeroIcon>
							<ResourceSVG />
						</HeroIcon>
					</div>
					{/* Total End */}
				</div>
			</div>
			{/* Data End */}

			<br />

			{/* Filters */}
			<div className="card shadow-sm p-4">
				<div className="d-flex flex-wrap">
					{/* Name */}
					<div className="flex-grow-1 me-2 mb-2">
						<input
							id=""
							type="text"
							name="name"
							placeholder="Search by Name"
							className="form-control"
							onChange={(e) => props.setNameQuery(e.target.value)}
						/>
					</div>
					{/* Name End */}
				</div>
			</div>
			{/* Filters End */}

			<br />

			{/* Table */}
			<div className="table-responsive mb-5 pb-2">
				<table className="table table-hover">
					<thead>
						{location.pathname.match("/admin") && (
							<tr>
								<th colSpan="2"></th>
								<th className="text-end">
									<MyLink
										linkTo={`/resources/create`}
										text="add resource"
									/>
								</th>
							</tr>
						)}
						<tr>
							<th>#</th>
							<th>Name</th>
							<th className="text-center">Action</th>
						</tr>
						{props.resources.data?.map((resource, key) => (
							<tr
								key={key}
								className={`
									${
										resource.year == 1
											? "table-primary"
											: resource.year == 2
											? "table-warning"
											: resource.year == 3
											? "table-success"
											: "table-secondary"
									}
									${key == 0 && props.auth.id == props.userId ? "table-danger" : ""}
								`}>
								<td>{key + 1}</td>
								<td>{resource.name}</td>
								<td>
									<div className="d-flex justify-content-center">
										<div className="d-flex justify-content-center">
											<Btn
												text="view"
												className="btn-sm me-1"
												onClick={() => onView(resource.link)}
											/>
										</div>

										{location.pathname.match("/admin/") && (
											<React.Fragment>
												<MyLink
													linkTo={`/resources/${resource.id}/edit`}
													text="edit"
													className="btn-sm"
												/>

												<div className="mx-1">
													<DeleteModal
														index={`resource${key}`}
														model={resource}
														modelName="Resource"
														message={`Are you sure you want to delete ${resource.name}.`}
														onDelete={onDeleteResource}
													/>
												</div>
											</React.Fragment>
										)}
									</div>
								</td>
							</tr>
						))}
					</thead>
				</table>
				{/* Pagination Links */}
				<PaginationLinks
					list={props.resources}
					getPaginated={props.getPaginated}
					setState={props.setResources}
				/>
				{/* Pagination Links End */}
			</div>
			{/* Table End */}
		</div>
	)
}

export default ResourceList
