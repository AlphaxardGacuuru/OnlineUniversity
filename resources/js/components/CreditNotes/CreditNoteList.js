import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min"

import MyLink from "@/components/Core/MyLink"
import Img from "@/components/Core/Img"
import DeleteModal from "@/components/Core/DeleteModal"

import HeroIcon from "@/components/Core/HeroIcon"

import PaginationLinks from "@/components/Core/PaginationLinks"
import CreditNoteSVG from "@/svgs/CreditNoteSVG"

const CreditNoteList = (props) => {
	const location = useLocation()

	const [faculties, setFaculties] = useState([])
	const [departments, setDepartments] = useState([])

	useEffect(() => {
		props.get("faculties?idAndName=true", setFaculties)
		props.get("departments?idAndName=true", setDepartments)
	}, [])

	/*
	 * Delete Credit Note
	 */
	const onDeleteCreditNote = (creditNoteId) => {
		Axios.delete(`/api/credit-notes/${creditNoteId}`)
			.then((res) => {
				props.setMessages([res.data.message])
				// Remove row
				props.setCreditNotes({
					meta: props.creditNotes.meta,
					links: props.creditNotes.links,
					data: props.creditNotes.data.filter(
						(unit) => unit.id != creditNoteId
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
							<span className="fs-4">{props.creditNotes.meta?.total}</span>
							<h4>Total Credit Notes</h4>
						</div>
						<HeroIcon>
							<CreditNoteSVG />
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

			<div className="table-responsive mb-5 pb-2">
				<table className="table table-hover">
					<thead>
						<tr>
							<th>#</th>
							<th></th>
							<th>Name</th>
							<th>Email</th>
							<th>Description</th>
							<th>Amount</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{props.creditNotes.data?.map((creditNote, key) => (
							<tr key={key}>
								<td>{props.iterator(key, props.creditNotes)}</td>
								<td>
									<Img
										src={creditNote.avatar}
										className="rounded-circle"
										style={{ minWidth: "3em", height: "3em" }}
										alt="Avatar"
									/>
								</td>
								<td>{creditNote.userName}</td>
								<td>{creditNote.userEmail}</td>
								<td>{creditNote.description}</td>
								<td>KES {creditNote.amount}</td>
								<td className="text-end">
									<div className="d-flex">
										{location.pathname.match("/admin/") && (
											<React.Fragment>
												<MyLink
													linkTo={`/finance/credit-notes/${creditNote.id}/edit`}
													text="edit"
													className="btn-sm"
												/>

												<div className="mx-1">
													<DeleteModal
														index={`creditNote${key}`}
														model={creditNote}
														modelName="Credit Note"
														message={`Are you sure you want to delete this Credit Note?`}
														onDelete={onDeleteCreditNote}
													/>
												</div>
											</React.Fragment>
										)}
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{/* Pagination Links */}
				<PaginationLinks
					list={props.creditNotes}
					getPaginated={props.getPaginated}
					setState={props.setCreditNotes}
				/>
				{/* Pagination Links End */}
			</div>
		</div>
	)
}

export default CreditNoteList
