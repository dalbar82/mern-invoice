import mongoose from 'mongoose'
import validator from 'validator'

const { randomBytes } = await import('crypto')

const { Schema } = mongoose

const customerSchema = new Schema(
	{
		createdBy: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			lowercase: true,
			unique: true,
		},
		organisation: {
			type: String,
			required: true,
		},
		accountNo: String,
		vatTinNo: {
			type: Number,
			default: 0,
		},
		abn: Number,
		address: String,
		city: String,
		country: String,
		phoneNumber: {
			type: String,
			required: true,	
		},
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
)

customerSchema.pre('save', async function (next) {
	this.accountNo = `CUS-${randomBytes(3).toString('hex').toUpperCase()}`

	next()
})

const Customer = mongoose.model('Customer', customerSchema)

export default Customer
