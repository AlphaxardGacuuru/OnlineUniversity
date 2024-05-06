import React, { useEffect, useState } from "react"

import InstructorList from "@/components/Instructors/InstructorList"

const index = (props) => {
	// Get Instructors
	const [instructors, setInstructors] = useState(
		props.getLocalStorage("instructors")
	)
	const [loading, setLoading] = useState()

	const [nameQuery, setNameQuery] = useState("")
	const [genderQuery, setGenderQuery] = useState("")
	const [facultyQuery, setFacultyQuery] = useState("")
	const [departmentQuery, setDepartmentQuery] = useState("")

	useEffect(() => {
		// Set page
		props.setPage({ name: "Instructors", path: ["instructors"] })
	}, [])

	useEffect(() => {
		props.getPaginated(
			`instructors?
			name=${nameQuery}&
			gender=${genderQuery}&
			facultyId=${facultyQuery}&
			departmentId=${departmentQuery}`,
			setInstructors,
			"instructors"
		)
	}, [nameQuery, genderQuery, facultyQuery, departmentQuery])

	return (
		<div className="row">
			<div className="col-sm-12">
				{/* Instructors Tab */}
				<InstructorList
					{...props}
					instructors={instructors}
					setInstructors={setInstructors}
					activeTab={"menu-open"}
					setNameQuery={setNameQuery}
					setGenderQuery={setGenderQuery}
					setFacultyQuery={setFacultyQuery}
					setDepartmentQuery={setDepartmentQuery}
				/>
				{/* Instructors Tab End */}
			</div>
		</div>
	)
}

export default index
