import React, { useEffect, useState } from "react"

import Img from "@/components/Core/Img"

import CourseList from "@/components/Courses/CourseList"
import UnitList from "@/components/Units/UnitList"
import FeeStatementList from "@/components/FeeStatement/FeeStatementList"

const show = (props) => {
	const [tab, setTab] = useState("courses")
	const [courses, setCourses] = useState([])
	const [units, setUnits] = useState([])
	const [fees, setFees] = useState({})

	useEffect(() => {
		// Set page
		props.setPage({ name: "Student", path: ["student"] })
		props.get(`courses/by-user-id/${props.auth.id}`, setCourses, null, false)
		props.get(`units/by-user-id/${props.auth.id}`, setUnits, null, false)
		props.get(`fee-statements/${props.auth.id}`, setFees, null, false)
	}, [])

	const active = (activeTab) => {
		return activeTab == tab ? "bg-light" : "bg-secondary-subtle"
	}

	const activeTab = (activeTab) => {
		return activeTab == tab ? "d-block" : "d-none"
	}

	return (
		<div className="row">
			<div className="col-sm-4">
				<div className="card shadow mb-2 p-4 text-center">
					<div className="m-3">
						<Img
							src={props.auth.avatar}
							className="rounded-circle"
							width="100px"
							height="100px"
							alt="Avatar"
						/>
					</div>
					<h4>{props.auth.name}</h4>
					<h6>{props.auth.email}</h6>
					<h6>{props.auth.phone}</h6>
					<h6>{props.auth.gender}</h6>
					<h6 className="text-capitalize">{props.auth.accountType}</h6>
					<h6>{props.auth.facultyName}</h6>
					<h6>{props.auth.departmentName}</h6>
				</div>
			</div>
			<div className="col-sm-8">
				{/* Tabs */}
				<div className="d-flex justify-content-between flex-wrap mb-2">
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"courses"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("courses")}>
						Courses
					</div>
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"units"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("units")}>
						Units
					</div>
					<div
						className={`card shadow-sm flex-grow-1 text-center me-1 mb-2 py-2 px-4 ${active(
							"fee-statements"
						)}`}
						style={{ cursor: "pointer" }}
						onClick={() => setTab("fee-statements")}>
						Fee Statements
					</div>
				</div>
				{/* Tabs End */}

				{/* Courses Tab */}
				<CourseList
					{...props}
					courses={courses}
					activeTab={activeTab("courses")}
				/>
				{/* Courses Tab End */}

				{/* Units Tab */}
				<UnitList
					{...props}
					units={units}
					activeTab={activeTab("units")}
				/>
				{/* Units Tab End */}

				{/* Fee Statements Tab */}
				<FeeStatementList
					{...props}
					fees={fees}
					activeTab={activeTab("fee-statements")}
				/>
				{/* Fee Statements Tab End */}
			</div>
		</div>
	)
}

export default show
