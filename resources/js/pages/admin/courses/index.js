import React, { useEffect, useState } from "react"

import CourseList from "@/components/Courses/CourseList"

const index = (props) => {
	// Get Courses
	const [courses, setCourses] = useState([])

	const [nameQuery, setNameQuery] = useState("")
	const [facultyQuery, setFacultyQuery] = useState("")
	const [departmentQuery, setDepartmentQuery] = useState("")
	const [loading, setLoading] = useState()

	useEffect(() => {
		// Set page
		props.setPage({ name: "Courses", path: ["courses"] })
	}, [])

	useEffect(() => {
		props.getPaginated(
			`courses?
			name=${nameQuery}&
			facultyId=${facultyQuery}&
			departmentId=${departmentQuery}`,
			setCourses
		)
	}, [nameQuery, facultyQuery, departmentQuery])

	return (
		<div className="row">
			<div className="col-sm-12">
				{/* Courses Tab */}
				<CourseList
					{...props}
					courses={courses}
					setCourses={setCourses}
					activeTab={"menu-open"}
					setNameQuery={setNameQuery}
					setFacultyQuery={setFacultyQuery}
					setDepartmentQuery={setDepartmentQuery}
				/>
				{/* Courses Tab End */}
			</div>
		</div>
	)
}

export default index
