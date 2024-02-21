import mongoose from 'mongoose'

const { randomBytes } = await import('crypto')

const { Schema } = mongoose

const paymentSchema = new Schema(
	{
		paidBy: String,
		datePaid: String,
		amountPaid: Number,
		paymentMethod: {
			type: String,
			default: 'Cash',
			enum: [
				'Cash',
				'Mobile Money',
				'PayPal',
				'Credit Card',
				'Bank Transfer',
				'Others',
			],
		},
		additionalInfo: String,
	},
	{
		timestamps: true,
	}
)

const documentSchema = new Schema(
	{
		createdBy: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		customer: {
			name: String,
			email: String,
			accountNo: String,
			vatTinNo: String,
			address: String,
			city: String,
			country: String,
			phoneNumber: String,
		},
		documentType: {
			type: String,
			default: 'Invoice',
			enum: ['Invoice', 'Order', 'Quotation', 'Archived'],
		},
		name: String,
		documentNumber: String,
		dueDate: Date,
		additionalInfo: String,
		termsConditions: String,
		status: {
			type: String,
			default: 'Not Paid',
			enum: ['Paid', 'Not Fully Paid', 'Not Paid'],
		},
		organisation: String,
		subTotal: Number,
		salesTax: Number,
		rates: String,
		total: Number,
		currency: String,
		totalAmountReceived: Number,
		deliveryAddress: String,
		deliveryCity: String,
		deliveryState: String,
		deliveryPostcode: String,
		deliveryCountry: String,
		deliveryNotes: String,
		billingItems: [
			{
				itemName: String,
				unitPrice: Number,
				quantity: Number,
				discount: String,
				productionStatus: {
					type: String,
					default: 'Pre Production',
					enum: ['Pre Production', 'Production', 'Complete'],
				},
			},
		],
		paymentRecords: [paymentSchema],
	},
	{
		timestamps: true,
	}
)

documentSchema.pre('save', async function (next) {
	this.documentNumber = `${randomBytes(3).toString('hex').toUpperCase()}`
	next()
})

const Document = mongoose.model('Document', documentSchema)

export default Document
