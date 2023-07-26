export const DocumentTypeStyling = (documentType) => {
	return documentType === 'Order'
		? {
				border: 'solid 1px black',
				backgroundColor: '#76ff03',
				padding: '8px 18px',
				borderRadius: '20px',
		  }
		: {
				border: 'solid 1px black',
				backgroundColor: '#2196f3',
				color: '#FFFFFF',
				padding: '8px 18px',
				borderRadius: '20px',
		  }
}

export const statusColor = (totalAmountReceived, status) => {
	return totalAmountReceived >= document?.total
		? '#ff9100'
		: status === 'Paid'
		? 'green'
		: status === 'Not Paid'
		? 'red'
		: 'red'
}
