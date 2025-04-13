import React from "react"
import { ToastContainer, toast, Bounce } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Messages = ({ messages, setMessages, errors, setErrors }) => {
	// Display messages and errors as toasts
	if (messages.length > 0) {
		messages.forEach((message) => toast.messages(message))
		setTimeout(() => setMessages([]), 2900)
	}

	if (errors.length > 0) {
		console.info("Errors: ", errors)
		errors.forEach((validationErrors) => {
			// Check if validationErrors is an array
			if (Array.isArray(validationErrors)) {
				validationErrors.forEach((error) => toast.error(error))
			} else {
				toast.warning(validationErrors)
			}
		})
		setTimeout(() => setErrors([]), 2900)
	}

	return (
		<ToastContainer
			position="top-right"
			autoClose={10000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
			theme="colored"
			transition={Bounce}
		/>
	)
}

export default Messages
