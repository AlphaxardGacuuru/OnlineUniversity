import React, { useState, useEffect, useRef } from "react"
import { Link, useParams } from "react-router-dom"
// import Axios from "axios"
// import Echo from "Echo"

import Img from "@/components/Core/Img"

import TrashSVG from "@/svgs/TrashSVG"
import SocialMediaInput from "@/components/Core/SocialMediaInput"
import AttachmentSVG from "@/svgs/AttachmentSVG"

const DiscussionForum = (props) => {
	let { id } = useParams()

	const [chats, setChats] = useState([])
	const [user, setUser] = useState({})
	const [attachment, setAttachment] = useState()
	const [newChat, setNewChat] = useState({})
	const [toDeleteIds, setToDeleteIds] = useState([])
	const [deletedIds, setDeletedIds] = useState([])

	var modalBtn = useRef()

	useEffect(() => {
		// Listen to New Chats
		Echo.private(`chat-created`).listen("NewChatEvent", (e) => {
			setNewChat({
				...e.chat,
				userId: e.chat.user_id,
				createdAt: e.chat.created_at,
			})
			console.log(e)
		})

		// Listen to Deleted Chats
		Echo.private(`chat-deleted`).listen("ChatDeletedEvent", (e) => {
			props.get(`chats/${id}`, setChats)
		})

		// Fetch Chats
		Axios.get(
			`api/discussion-forums/${props.unitId}?sessionId=${props.sessionId}`
		)
			.then((res) => {
				// Remove loader
				setChats(res.data.data)
			})
			.catch((err) => props.getErrors(err))
		// Fetch User
		props.get(`users/${id}`, setUser)

		return () => {
			Echo.leave("chat-created")
			Echo.leave("chat-deleted")
			Echo.leave("chat")
		}
	}, [])

	/*
	 * Show new chats */
	useEffect(() => {
		// Remove duplicate
		var cleanChats = chats.filter((chat) => chat.id != newChat.id)
		// Set new chats
		setChats([...cleanChats, newChat])
	}, [newChat])

	/*
	 * Handle Showing Attachment
	 */
	const handleShowAttachment = (item) => {
		// Set attachment
		setAttachment(item)
		// Click Modal button
		modalBtn.current.click()
	}

	/*
	 * Show Delete */
	const showDelete = (id) => {
		if (toDeleteIds.includes(id)) {
			var newToDeleteIds = toDeleteIds.filter((toDeleteId) => toDeleteId != id)
			setToDeleteIds(newToDeleteIds)
		} else {
			setToDeleteIds([...toDeleteIds, id])
		}
	}

	/*
	 * Function for deleting chat */
	const onDeleteChat = (id) => {
		// Remove item
		setDeletedIds([...deletedIds, id])

		Axios.delete(`/api/discussion-forums/${id}`)
			.then((res) => props.setMessages([res.data.message]))
			.catch((err) => props.getErrors(err))
	}

	// Ensure latest chat is always visible
	useEffect(() => {
		// Scroll to the bottom of the page
		window.scrollTo(0, document.body.scrollHeight)
	}, [chats])

	return (
		<div>
			{/* View Attachment Modal */}
			{/* Button */}
			<button
				ref={modalBtn}
				type="hidden"
				className="btn btn-sm rounded-pill text-white d-none"
				data-bs-toggle="modal"
				data-bs-target="#staticBackdrop"></button>

			{/* Modal */}
			<div
				className="modal fade"
				id="staticBackdrop"
				data-bs-backdrop="static"
				data-bs-keyboard="false"
				tabIndex="-1"
				aria-labelledby="staticBackdropLabel"
				aria-hidden="true">
				<div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg">
					<div className="modal-content">
						<div className="modal-header">
							<h1
								className="modal-title fs-5"
								id="staticBackdropLabel">
								Attachment
							</h1>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<iframe
								src={attachment}
								style={{ width: "100%", height: "30em" }}></iframe>
						</div>
					</div>
				</div>
			</div>
			{/* View Attachment Modal End */}

			{/* <!-- ***** Chats ***** --> */}
			<div className="sonar-call-to-action-area section-padding-0-100">
				{chats
					.filter((chat) => chat != {})
					.filter((chat) => !deletedIds.includes(chat.id))
					.map((chatItem, key) => (
						<div
							key={key}
							className={`d-flex chat
								${chatItem.userId == props.auth.id ? "flex-row-reverse" : "text-light"}`}>
							{/* Trash */}
							{chatItem.userId == props.auth.id &&
								toDeleteIds.includes(chatItem.id) && (
									<div
										className="chat-item-trash"
										onClick={() => onDeleteChat(chatItem.id)}>
										<span>
											<TrashSVG />
										</span>
									</div>
								)}
							{/* Trash End */}

							{/* Chat */}
							<div
								className={
									chatItem.userId == props.auth.id
										? "chat-item"
										: "chat-item-reverse"
								}
								onClick={() => {
									if (chatItem.userId == props.auth.id) {
										showDelete(chatItem.id)
									}
								}}>
								{chatItem.text}

								{/* Media */}
								<span className="d-block text-end mb-1">
									{chatItem.attachment && (
										<span className="d-flex justify-content-between border border-light rounded-pill">
											<button
												type="button"
												className="btn btn-sm rounded-pill text-white"
												onClick={() =>
													handleShowAttachment(chatItem.attachment)
												}>
												View
											</button>
											<span className="p-2">
												<AttachmentSVG />
											</span>
										</span>
									)}
								</span>
								{/* Media End */}

								{/* Created At */}
								<small
									className={
										chatItem.userId == props.auth.id
											? "text-light m-0 p-1"
											: "text-muted m-0 p-1"
									}>
									<i
										style={{ fontSize: "0.8em" }}
										className="float-end m-0 p-0">
										{chatItem.createdAt}
									</i>
								</small>
								{/* Created At End */}
							</div>
							{/* Chat End */}
						</div>
					))}
			</div>
			<br />
			<br className="hidden" />
			<br className="hidden" />
			{/* Social Media Input */}
			<div className="bottomNav mb-5">
				<SocialMediaInput
					{...props}
					id={props.sessionId}
					to={props.unitId}
					week={props.week}
					placeholder="Message"
					showImage={true}
					showPoll={false}
					urlTo="discussion-forums"
					editing={false}
				/>
			</div>
			{/* Social Media Input End */}
		</div>
	)
}

export default DiscussionForum
