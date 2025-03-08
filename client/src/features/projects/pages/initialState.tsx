import { BillingItem } from "../../../types/JobDocument"

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

export const itemsInitialState: BillingItem[] = [
	{
		name: '',
		unitPrice: 0,
		quantity: 0,
		discount: 0,
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
