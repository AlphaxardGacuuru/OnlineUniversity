import React, { useState, useEffect, useRef } from "react"
import ReactDOM from "react-dom"
import { HashRouter } from "react-router-dom"

import TopNav from "@/components/Layouts/TopNav"
import Footer from "@/components/Layouts/Footer"
import Messages from "@/components/Core/Messages"

import RouteList from "./Core/RouteList"
import { random } from "lodash"

function App() {
	// Function for checking local storage
	const getLocalStorage = (state) => {
		if (typeof window !== "undefined" && localStorage.getItem(state)) {
			return JSON.parse(localStorage.getItem(state))
		} else {
			return []
		}
	}

	// Function for checking local storage
	const getLocalStorageAuth = (state) => {
		if (typeof window !== "undefined" && localStorage.getItem(state)) {
			return JSON.parse(localStorage.getItem(state))
		} else {
			return {
				name: "Guest",
				username: "@guest",
				avatar: "/storage/avatars/male-avatar.png",
				accountType: "normal",
				decos: 0,
				posts: 0,
				fans: 0,
			}
		}
	}

	// Function to set local storage
	const setLocalStorage = (state, data) => {
		localStorage.setItem(state, JSON.stringify(data))
	}

	const url = process.env.MIX_FRONTEND_URL

	// Declare states
	const [messages, setMessages] = useState([])
	const [errors, setErrors] = useState([])
	const [login, setLogin] = useState()
	const [auth, setAuth] = useState(getLocalStorageAuth("auth"))
	const [adminMenu, setAdminMenu] = useState("left-open")
	const [instructorMenu, setInstructorMenu] = useState("left-open")
	const [page, setPage] = useState({ name: "/", path: [] })

	// Function for fetching data from API
	const get = (endpoint, setState, storage = null, errors = true) => {
		Axios.get(`/api/${endpoint}`)
			.then((res) => {
				var data = res.data ? res.data.data : []
				setState(data)
				storage && setLocalStorage(storage, data)
			})
			.catch(() => errors && setErrors([`Failed to fetch ${endpoint}`]))
	}

	// Function for getting errors from responses
	const getErrors = (err, message = false) => {
		const resErrors = err.response.data.errors
		var newError = []
		for (var resError in resErrors) {
			newError.push(resErrors[resError])
		}
		// Get other errors
		message && newError.push(err.response.data.message)
		setErrors(newError)
	}

	// Fetch data on page load
	useEffect(() => {
		get("auth", setAuth, "auth", false)
	}, [])

	const GLOBAL_STATE = {
		getLocalStorage,
		setLocalStorage,
		url,
		messages,
		setMessages,
		errors,
		setErrors,
		get,
		getErrors,
		login,
		setLogin,
		auth,
		setAuth,
		adminMenu,
		setAdminMenu,
		instructorMenu,
		setInstructorMenu,
		page,
		setPage,
	}

	return (
		<HashRouter>
			<TopNav {...GLOBAL_STATE} />
			<RouteList GLOBAL_STATE={GLOBAL_STATE} />
			<Footer {...GLOBAL_STATE} />
			<Messages {...GLOBAL_STATE} />
		</HashRouter>
	)
}

export default App

if (document.getElementById("app")) {
	ReactDOM.render(<App />, document.getElementById("app"))
}
