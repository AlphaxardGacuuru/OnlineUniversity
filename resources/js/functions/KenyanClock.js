import React, { useEffect, useState } from "react"

import Btn from "@/components/Core/Btn"

const KenyanClock = (props) => {
	const [kenyanTime, setKenyanTime] = useState("")

	useEffect(() => {
		// Function for Kenyann Clock
		const getKenyanTime = () => {
			const kenyanOffset = 3 // Kenyan time zone offset from UTC (in hours)
			const now = new Date()
			const utc = now.getTime() + now.getTimezoneOffset() * 60000 // Convert to UTC
			const kenyan = new Date(utc + 3600000 * kenyanOffset) // Adjust for Kenyan time

			const formattedTime = kenyan.toLocaleTimeString("en-KE", {
				timeZone: "Africa/Nairobi",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
				hour12: true,
			})

			setKenyanTime(formattedTime)
		}

		// Update the time every second
		const interval = setInterval(getKenyanTime, 1000)

		// Clean up interval on component unmount
		return () => clearInterval(interval)
	}, [])

	return (
		<Btn
			btnClass={props.className}
			btnText={kenyanTime + " East African Time(EAT) GMT+3"}
		/>
	)
}

export default KenyanClock
