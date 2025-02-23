export const DocumentTypeStyling = (documentType: string): React.CSSProperties => {
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

export const statusColor = (totalAmountReceived: number, status: string, documentTotal?: number): string => {
	return totalAmountReceived >= (documentTotal ?? 0)
		? '#ff9100'
		: status === 'Paid'
		? 'green'
		: status === 'Not Paid'
		? 'red'
		: 'red'
}

