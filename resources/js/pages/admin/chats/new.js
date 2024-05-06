import React, { useState, useRef, useEffect } from "react"
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min"

import Img from "@/components/Core/Img"
import BackSVG from "@/svgs/BackSVG"

export default function NewChat(props) {
	const location = useLocation()

	const [search, setSearch] = useState("")
	const [users, setUsers] = useState([])
	const [searching, setSearching] = useState()

	const searchInput = useRef(null)

	setTimeout(() => searchInput.current.focus(), 100)

	useEffect(() => {
		// Set page
		props.setPage({ name: "New Chat", path: ["chats", "new"] })
	}, [])

	useEffect(() => {
		if (search) {
			props.getPaginated(
				`users?search=${search}`,
				setUsers,
				null,
				true,
				setSearching
			)
		}
	}, [search])

	return (
		<div className="row">
			<div className="col-sm-2"></div>
			<div className="col-sm-8">
				<div className="my-card shadow mb-4 p-4">
					<div className="d-flex flex-wrap">
						{/* Name */}
						<div className="flex-grow-1 me-2 mb-2">
							<input
								ref={searchInput}
								type="text"
								name="name"
								placeholder="Search by Name or Email"
								className="form-control"
								onChange={(e) => setSearch(e.target.value)}
							/>
						</div>
						{/* Name End */}
					</div>
				</div>

				{/* <!-- ****** Users Area Start ****** --> */}
				<div className="hidden-scroll">
					{/* Search Loader */}
					{searching && (
						<div className="d-flex justify-content-center">
							<div className="text-muted spinner-border spinner-border-sm border-2 my-auto mx-2"></div>
						</div>
					)}
					{/* Search Loader End */}

					{users.data?.map((user, key) => (
						<div
							key={key}
							className="my-card d-flex m-2 p-2">
							<div className="p-1">
								<Link
									to={
										location.pathname.match("admin")
											? `/admin/chats/view/${user.id}`
											: location.pathname.match("instructor")
											? `/instructor/chats/view/${user.id}`
											: `/student/chats/view/${user.id}`
									}>
									<Img
										src={user.avatar}
										className={`rounded-circle border p-1 ${
											user.accountType == "staff"
												? "border-primary"
												: user.accountType == "instructor"
												? "border-danger"
												: "border-success"
										}`}
										width="50px"
										height="50px"
									/>
								</Link>
							</div>
							<div
								className="p-2 flex-grow-1"
								style={{ width: "65%" }}>
								<Link
									to={
										location.pathname.match("admin")
											? `/admin/chats/view/${user.id}`
											: location.pathname.match("instructor")
											? `/instructor/chats/view/${user.id}`
											: `/student/chats/view/${user.id}`
									}>
									<h6
										className="m-0"
										style={{
											width: "100%",
											whiteSpace: "nowrap",
											overflow: "hidden",
											textOverflow: "clip",
										}}>
										<b>{user.name}</b> -
										<small
											className={`fw-medium text-capitalize rounded-pill ms-1 p-1 px-2 ${
												user.accountType == "staff"
													? "bg-primary-subtle"
													: user.accountType == "instructor"
													? "bg-danger-subtle"
													: "bg-success-subtle"
											}`}>
											{user.accountType}
										</small>
										<p className="mb-0">{user.email}</p>
									</h6>
								</Link>
							</div>
						</div>
					))}
				</div>
				{/* <!-- ****** Users Area End ****** - */}
			</div>

			<div className="col-sm-2"></div>
		</div>
	)
}
