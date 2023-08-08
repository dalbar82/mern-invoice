export const docInitialState = {
	status: 'Not Paid',
	additionalInfo: '',
	termsConditions: '',
	total: 0,
	salesTax: 0,
	rates: '',
	currency: '',
	customer: '',
	documentType: '',
}

export const itemsInitialState = [
	{
		name: '',
		unitPrice: '',
		quantity: '',
		discount: '',
		productionStatus: 'Pre Production',
	},
]

export const paymentInitialState = [
	{
		paymentDate: new Date(),
		paidBy: '',
		amountPaid: 0,
		paymentMethod: '',
		additionalInfo: '',
	},
]
