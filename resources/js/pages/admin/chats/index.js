import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min"
import Img from "@/components/Core/Img"

import NewChatSVG from "@/svgs/NewChatSVG"

const Chat = (props) => {
	const location = useLocation()

	const [tab, setTab] = useState("mine")
	const [admin, setAdmin] = useState({})
	const [chatThreads, setChatThreads] = useState(props.getLocalStorage("chatThreads"))
	const [allChatThreads, setAllChatThreads] = useState([])

	const getChatThreads = () => {
		props.get("chats", setChatThreads, "chatThreads")
		props.get("chats/all-threads", setAllChatThreads)
	}

	useEffect(() => {
		// Set page
		props.setPage({ name: "Chats", path: ["chats"] })
		props.get("staff/1", setAdmin)

		// Fetch Chats
		const chatInterval = setInterval(() => getChatThreads(), 5000)

		// Cleanup function to clear the interval on component unmount
		return () => clearInterval(chatInterval)
	}, [])

	const active = (activeTab) => {
		return activeTab == tab ? "bg-light" : "bg-secondary-subtle"
	}

	const activeTab = (activeTab) => {
		return activeTab == tab ? "d-block" : "d-none"
	}

	return (
		<div className="row">
			<div className="col-sm-2"></div>
			<div className="col-sm-8">
				{/* Chat button */}
				<Link
					to="chats/new"
					id="chatFloatBtn"
					className={
						location.pathname.match("admin")
							? "text-primary"
							: location.pathname.match("instructor")
							? "text-danger"
							: "text-success"
					}>
					<NewChatSVG />
				</Link>

				{/* Tabs */}
				{location.pathname.match("/admin/") && (
					<div className="d-flex justify-content-between flex-wrap mb-2">
						<div
							className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
								"mine"
							)}`}
							style={{ cursor: "pointer" }}
							onClick={() => setTab("mine")}>
							My Chats
						</div>
						<div
							className={`card shadow-sm flex-grow-1 text-center mb-2 py-2 px-4 ${active(
								"all"
							)}`}
							style={{ cursor: "pointer" }}
							onClick={() => setTab("all")}>
							All Chats
						</div>
					</div>
				)}
				{/* Tabs End */}

				{/* Default Thread */}
				{chatThreads.length == 0 && (
					<div className="my-card d-flex">
						<div className="p-2">
							<Link to={`chats/view/${admin.id}`}>
								<Img
									src={admin.avatar || "/storage/avatars/male-avatar.png"}
									className="rounded-circle border border-primary p-1"
									width="50px"
									height="50px"
								/>
							</Link>
						</div>
						<div className="p-2 flex-grow-1">
							<Link to={`chats/view/${admin.id}`}>
								<h6
									className="m-0"
									style={{
										width: "100%",
										whiteSpace: "nowrap",
										overflow: "hidden",
										textOverflow: "clip",
									}}>
									<b>{admin.name}</b>
								</h6>
								<p className="mb-0">Need help? Start a conversation.</p>
							</Link>
						</div>
					</div>
				)}
				{/* Start Thread End */}

				{/* Threads Start */}
				<div className={activeTab("mine")}>
					{chatThreads.map((chatThread, key) => (
						<div
							key={key}
							className="my-card d-flex m-2">
							<div className="pt-2">
								<Link to={`chats/view/${chatThread.userId}`}>
									<Img
										src={chatThread.avatar}
										className={`rounded-circle border p-1 ${
											chatThread.accountType == "staff"
												? "border-primary"
												: chatThread.accountType == "instructor"
												? "border-danger"
												: "border-success"
										}`}
										width="50px"
										height="50px"
									/>
								</Link>
							</div>
							<div
								className="p-2"
								style={{
									minWidth: "75%",
									maxWidth: "75%",
									wordWrap: "break-word",
								}}>
								<Link to={`chats/view/${chatThread.userId}`}>
									<h6
										className="m-0"
										style={{
											width: "100%",
											whiteSpace: "nowrap",
											overflow: "hidden",
											textOverflow: "clip",
										}}>
										<b>{chatThread.name}</b>
										<small>{chatThread.email}</small>
									</h6>
									<p
										className="m-0"
										style={{
											width: "100%",
											whiteSpace: "nowrap",
											overflow: "hidden",
											textOverflow: "clip",
										}}>
										{chatThread.text}
									</p>
								</Link>
							</div>
							<div className="py-2 flex-grow-1">
								<small>
									<i
										style={{
											whiteSpace: "nowrap",
											fontSize: "0.8em",
										}}
										className="float-end mr-1 text-secondary">
										{chatThread.createdAt}
									</i>
								</small>
							</div>
						</div>
					))}
				</div>
				{/* Threads End */}

				{/* All Threads Start */}
				<div className={activeTab("all")}>
					{allChatThreads.map((chatThread, key) => (
						<div
							key={key}
							className="my-card d-flex m-2">
							<div className="pt-2">
								<Link to={`chats/view/${chatThread.userId}/${chatThread.to}`}>
									<Img
										src={chatThread.avatar}
										className={`rounded-circle border p-1 ${
											chatThread.accountType == "staff"
												? "border-primary"
												: chatThread.accountType == "instructor"
												? "border-danger"
												: "border-success"
										}`}
										width="50px"
										height="50px"
									/>
								</Link>
							</div>
							<div
								className="p-2"
								style={{
									minWidth: "75%",
									maxWidth: "75%",
									wordWrap: "break-word",
								}}>
								<Link to={`chats/view/${chatThread.userId}/${chatThread.to}`}>
									<h6
										className="m-0"
										style={{
											width: "100%",
											whiteSpace: "nowrap",
											overflow: "hidden",
											textOverflow: "clip",
										}}>
										<b>{chatThread.name}</b>
										<small>{chatThread.email}</small>
									</h6>
									<p
										className="m-0"
										style={{
											width: "100%",
											whiteSpace: "nowrap",
											overflow: "hidden",
											textOverflow: "clip",
										}}>
										{chatThread.text}
									</p>
								</Link>
							</div>
							<div className="py-2 flex-grow-1">
								<small>
									<i
										style={{
											whiteSpace: "nowrap",
											fontSize: "0.8em",
										}}
										className="float-end mr-1 text-secondary">
										{chatThread.createdAt}
									</i>
								</small>
							</div>
						</div>
					))}
				</div>
				{/* All Threads End */}
			</div>
			<div className="col-sm-2"></div>
		</div>
	)
}

export default Chat
