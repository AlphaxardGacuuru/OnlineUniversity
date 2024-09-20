import React, { useEffect } from "react"
import { withRouter } from "react-router-dom"
import {
	useHistory,
	useLocation,
} from "react-router-dom/cjs/react-router-dom.min"

function RouterMiddleware(props) {
	const location = useLocation()
	const router = useHistory()

	var redirectToAppropriatePortal = () => {
		var isAdmin = props.auth.accountType == "staff"
		var isInstructor = props.auth.accountType == "instructor"
		var isStudent = props.auth.accountType == "student"

		var notInAdminPortal =
			location.pathname.match("/instructor/") ||
			location.pathname.match("/student/")
		var notInInstructorPortal =
			location.pathname.match("/admin/") || location.pathname.match("/student/")
		var notInStudentPortal =
			location.pathname.match("/admin/") ||
			location.pathname.match("/instructor/")

		// Redirect to Admin
		if (isAdmin && notInAdminPortal) {
			console.info("redirecting to admin")
			// router.push("/admin/dashboard")
		}

		// Redirect to Admin
		if (isInstructor && notInInstructorPortal) {
			console.info("redirecting to instructor")
			// router.push(`/instructor/${props.auth.id}/show`)
		}

		// Redirect to Admin
		if (isStudent && notInStudentPortal) {
			console.info("redirecting to student")
			// router.push(`/student/${props.auth.id}/show`)
		}
	}

	useEffect(() => {
		var unlisten = props.history.listen(() => {
			window.scrollTo(0, 0)
			redirectToAppropriatePortal()
		})

		return () => unlisten()
	}, [])

	return null
}

export default withRouter(RouterMiddleware)
