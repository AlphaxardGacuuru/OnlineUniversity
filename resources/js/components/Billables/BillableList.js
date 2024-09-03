import React from "react"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"

import MyLink from "@/components/Core/MyLink"
import HeroIcon from "@/components/Core/HeroIcon"

import PaginationLinks from "@/components/Core/PaginationLinks"
import DeleteModal from "@/components/Core/DeleteModal"

import BillableSVG from "@/svgs/BillableSVG"

const BillableList = (props) => {
	const location = useLocation()

	/*
	 * Delete Billable
	 */
	const onDeleteBillable = (billableId) => {
		Axios.delete(`/api/billables/${billableId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove row
				props.setBillables({
					meta: props.billables.meta,
					links: props.billables.links,
					data: props.billables.data.filter(
						(billables) => billables.id != billableId
					),
				})
			})
			.catch((err) => props.getErrors(err))
	}

	return (
		<div className={props.activeTab}>
			{/* Data */}
			<div className="card shadow-sm p-2">
				<div className="d-flex justify-content-between">
					{/* Total */}
					<div className="d-flex justify-content-between w-100 align-items-center mx-4">
						<div>
							<span className="fs-4">{props.billables.meta?.total}</span>
							<h4>Total Billables</h4>
						</div>
						<HeroIcon>
							<BillableSVG />
						</HeroIcon>
					</div>
					{/* Total End */}
				</div>
			</div>
			{/* Data End */}

			<br />

			<div className="table-responsive mb-5 pb-2">
				<table className="table table-hover">
					<thead>
						{location.pathname.match("/admin/") && (
							<tr>
								<th colSpan="6"></th>
								<th className="text-end">
									<MyLink
										linkTo={`/billables/${props.courseId}/create`}
										text="add billable"
									/>
								</th>
							</tr>
						)}
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Description</th>
							<th>Price</th>
							<th>Year</th>
							<th>Semester</th>
							{location.pathname.match("/admin/") && <th>Action</th>}
						</tr>
					</thead>
					<tbody>
						{props.billables.data?.map((billable, key) => (
							<tr
								key={key}
								className={
									billable.year == 1
										? "table-primary"
										: billable.year == 2
										? "table-warning"
										: billable.year == 3
										? "table-success"
										: "table-secondary"
								}>
								<td>{key + 1}</td>
								<td>{billable.name}</td>
								<td>{billable.description}</td>
								<td>{billable.price}</td>
								<td>{billable.year}</td>
								<td>{billable.semester}</td>
								{location.pathname.match("/admin/") && (
									<td>
										<div className="d-flex justify-content-end">
											<MyLink
												linkTo={`/billables/${billable.id}/edit`}
												text="edit"
												className="btn-sm"
											/>

											<div className="mx-1">
												<DeleteModal
													index={`billable${key}`}
													model={billable}
													modelName="Billable"
													message={`Are you sure you want to delete ${billable.name}.`}
													onDelete={onDeleteBillable}
												/>
											</div>
										</div>
									</td>
								)}
							</tr>
						))}
					</tbody>
				</table>
				{/* Pagination Links */}
				<PaginationLinks
					list={props.billables}
					getPaginated={props.getPaginated}
					setState={props.setBillables}
				/>
				{/* Pagination Links End */}
			</div>
		</div>
	)
}

export default BillableList
