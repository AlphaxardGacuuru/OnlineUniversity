import React, { useEffect, useState } from "react"

import StudentList from "@/components/Students/StudentList"

const index = (props) => {
	// Get Students
	const [students, setStudents] = useState([])
	const [loading, setLoading] = useState()

	const [nameQuery, setNameQuery] = useState("")
	const [genderQuery, setGenderQuery] = useState("")
	const [facultyQuery, setFacultyQuery] = useState("")
	const [departmentQuery, setDepartmentQuery] = useState("")

	useEffect(() => {
		// Set page
		props.setPage({ name: "Students", path: ["students"] })
	}, [])

	useEffect(() => {
		props.getPaginated(
			`students?
			name=${nameQuery}&
			gender=${genderQuery}&
			facultyId=${facultyQuery}&
			departmentId=${departmentQuery}`,
			setStudents
		)
	}, [nameQuery, genderQuery, facultyQuery, departmentQuery])

	return (
		<div className="row">
			<div className="col-sm-12">
				{/* Students Tab */}
				<StudentList
					{...props}
					students={students}
					setStudents={setStudents}
					activeTab={"menu-open"}
					setNameQuery={setNameQuery}
					setGenderQuery={setGenderQuery}
					setFacultyQuery={setFacultyQuery}
					setDepartmentQuery={setDepartmentQuery}
				/>
				{/* Students Tab End */}
			</div>
		</div>
	)
}

export default index
