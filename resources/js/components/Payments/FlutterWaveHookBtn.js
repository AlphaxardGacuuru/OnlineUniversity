import React, { useState } from "react"

import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3"

import Btn3 from "@/components/Core/Btn3"
import Img from "@/components/Core/Img"

const FlutterWaveHookBtn = (props) => {
	const [loading, setLoading] = useState()

	const config = {
		public_key: process.env.MIX_FW_PUBLIC_KEY_SANDBOX,
		payment_options: "card",
		currency: "KES",
		// amount: props.paymentAmount,
		amount: 100,
		card_number: "5531886652142950",
		cvv: "564",
		expiry_month: "09",
		expiry_year: "32",
		tx_ref: Date.now(),
		customer: {
			name: "Alphaxard Gacuuru",
			email: "alphaxardgacuuru47@gmail.com",
			phone_number: "0700364446",
		},
		customizations: {
			title: props.paymentTitle,
			description: props.paymentDescription,
			logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
		},
	}

	const handleFlutterPayment = useFlutterwave(config)

	const onSuccess = (transaction) => {
		Axios.post("/api/card-transactions", transaction)
			.then((res) => {
				props.setMessages([res.data.message])
				// Close the modal programmatically
				closePaymentModal()
			})
			.catch((err) => {
				// Close the modal programmatically
				closePaymentModal()
			})
	}

	return (
		<Btn3
			btnText={
				<div>
					<Img
						src="/storage/img/mastercard-logo.jpg"
						className="me-1"
						style={{ width: "44px", height: "auto" }}
					/>
					<Img
						src="/storage/img/visa-logo.jpg"
						className="me-1"
						style={{ width: "50px", height: "auto" }}
					/>
					{props.text}
				</div>
			}
			onClick={() => {
				setLoading(true)
				handleFlutterPayment({
					callback: (res) => {
						setLoading(false)
						console.log(res)
						// Save response
						onSuccess(res)
					},
					onClose: () => setLoading(false),
				})
			}}
			loading={loading}
		/>
	)
}

export default FlutterWaveHookBtn
