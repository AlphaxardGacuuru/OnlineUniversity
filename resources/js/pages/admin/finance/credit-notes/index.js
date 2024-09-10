import React, { useEffect, useState } from "react"

import CreditNoteList from "@/components/CreditNotes/CreditNoteList"

const index = (props) => {
	// Get Credit Notes
	const [creditNotes, setCreditNotes] = useState(
		props.getLocalStorage("creditNotes")
	)

	const [nameQuery, setNameQuery] = useState("")
	
	useEffect(() => {
		// Set page
		props.setPage({ name: "Credit Notes", path: ["credit-notes"] })
	}, [])

	useEffect(() => {
		props.getPaginated(
			`credit-notes?name=${nameQuery}`,
			setCreditNotes,
			"creditNotes"
		)
	}, [nameQuery])

	return (
		<div className="row">
			<div className="col-sm-12">
				{/* Credit Notes Tab */}
				<CreditNoteList
					{...props}
					creditNotes={creditNotes}
					setCreditNotes={setCreditNotes}
					activeTab={"menu-open"}
					setNameQuery={setNameQuery}
				/>
				{/* Credit Notes Tab End */}
			</div>
		</div>
	)
}

export default index
