import React, { useEffect, useState } from "react"

import Btn from "@/components/Core/Btn"
import Img from "@/components/Core/Img"
import MyLink from "@/components/Core/MyLink"
import PaginationLinks from "@/components/Core/PaginationLinks"

import PersonSVG from "@/svgs/PersonSVG"
import WalletSVG from "@/svgs/WalletSVG"

const wallet = (props) => {
	// Get Wallet Transactions
	const [wallets, setWallets] = useState([])
	const [walletTransactions, setWalletTransactions] = useState([])
	const [amount, setAmount] = useState()
	const [loading, setLoading] = useState()

	useEffect(() => {
		// Set page
		props.setPage({ name: "Finance Wallet", path: ["finance"] })
		props.get(`kopokopo-recipients/${props.auth.id}`, setWallets)
		// props.get(`kopokopo-recipients/${props.authid}`, setWalletTransactions)
	}, [])

	/*
	 * Submit Transfer
	 */
	const onSubmit = (e) => {
		e.preventDefault()
		// Show Loader
		setLoading(true)

		Axios.post(`api/kopokopo-transfer`, {
			recipientId: recipientId,
			amount: amount,
		})
			.then((res) => {
				setLoading(false)
				props.setMessages([res.data.data])
			})
			.catch((err) => props.getErrors(err))
	}

	return (
		<div className="row">
			<div className="col-sm-12">
				{/* Wallets Data */}
				<div className="card shadow-sm p-2">
					<div className="d-flex justify-content-between">
						<div className="d-flex justify-content-between w-100 align-items-center mx-4">
							<div className="pe-">
								<span className="fs-4">{wallets.length}</span>
								<h4>Total Wallets</h4>
							</div>
							<div className="border-start border-end border-2 px-5">
								<span className="fs-4 px-5">
									{walletTransactions.meta?.total}3,000,000
								</span>
								<h4 className="px-5">Total Wallet Transactions</h4>
							</div>
							<div className="fs-1 py-3 px-4 bg-primary-subtle text-primary rounded-circle">
								<WalletSVG />
							</div>
						</div>
					</div>
				</div>
				{/* Wallets Data End */}

				{/* Accordion Button */}
				{wallets.map((wallet, key) => (
					<div
						id={`accordionMenu${key}`}
						className="accordion">
						<div
							key={key}
							className="card shadow-sm w-100 p-2">
							<button
								className={`accordion-button collapsed bg-white p-1`}
								type="button"
								data-bs-toggle="collapse"
								data-bs-target={`#collapseMenu${key}`}
								aria-expanded="true"
								aria-controls={`collapseMenu${key}`}>
								<div className="d-flex justify-content-between w-100 align-items-center ms-4 me-1">
									<div>
										{/* Mobile Wallet */}
										<h5>
											{wallet.firstName} {wallet.lastName}
										</h5>
										<h6>{wallet.phoneNumber}</h6>
										{/* Mobile Wallet End */}
										{/* Back Account */}
										<h5>{wallet.accountName}</h5>
										<h6>{wallet.accountNumber}</h6>
										{/* Back Account End */}
										{/* Till */}
										<h5>{wallet.tillName}</h5>
										<h6>{wallet.tillNumber}</h6>
										{/* Till End */}
										{/* Paybill */}
										<h5>{wallet.paybillName}</h5>
										<h6>{wallet.paybillNumber}</h6>
										<h6>{wallet.paybillAccountNumber}</h6>
										{/* Paybill End */}
									</div>
									<div className="py-3 px-4 bg-primary-subtle border border-primary-subtle rounded-pill text-primary">
										{wallet.type.split("_").map((word, key) => (
											<span
												key={key}
												className="text-capitalize me-1">
												{word}
											</span>
										))}
									</div>
								</div>
							</button>
							<div
								className="accordion"
								id={`accordionMenu${key}`}>
								<div
									id={`collapseMenu${key}`}
									className={`accordion-collapse collapse`}
									data-bs-parent={`#accordionMenu${key}`}>
									<div className="accordion-body pt-3 py-2">
										<form onSubmit={onSubmit}>
											<div className="d-flex">
												<input
													type="number"
													name="amount"
													placeholder="Enter amount to transfer"
													className="form-control rounded-pill me-2"
													onChange={(e) => setAmount(e.target.value)}
												/>

												<Btn btnText="transfer" />
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				))}
				{/* Accordion Button End */}

				{/* Add Wallet Card */}
				<div className="card shadow-sm p-2 align-items-end">
					<MyLink
						linkTo="/admin/finance/wallet/create"
						text="add wallet"
						className="btn-sm w-25"
					/>
				</div>
				{/* Add Wallet Card End */}

				<br />

				<div className="table-responsive mb-5 pb-2">
					<table className="table table-hover">
						<thead>
							<tr>
								<th>#</th>
								<th></th>
								<th>Name</th>
								<th>Email</th>
								<th>Phone</th>
								<th>Gender</th>
								<th>Faculty</th>
								<th>Department</th>
								<th>Date Joined</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{walletTransactions.data?.map((walletTransaction, key) => (
								<tr key={key}>
									<td>{props.iterator(key, walletTransactions)}</td>
									<td>
										<Img
											src={walletTransaction.avatar}
											className="rounded-circle"
											style={{ width: "7em" }}
											alt="Avatar"
										/>
									</td>
									<td>{walletTransaction.name}</td>
									<td>{walletTransaction.email}</td>
									<td>{walletTransaction.phone}</td>
									<td className="text-capitalize">
										{walletTransaction.gender}
									</td>
									<td>{walletTransaction.facultyName}</td>
									<td>{walletTransaction.departmentName}</td>
									<td>{walletTransaction.createdAt}</td>
								</tr>
							))}
						</tbody>
					</table>
					{/* Pagination Links */}
					<PaginationLinks
						list={walletTransactions}
						getPaginated={props.getPaginated}
						setState={setWalletTransactions}
					/>
					{/* Pagination Links End */}
				</div>
			</div>
		</div>
	)
}

export default wallet
