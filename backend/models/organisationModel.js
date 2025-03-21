import mongoose from 'mongoose'
import validator from 'validator'

const { randomBytes } = await import('crypto')

const { Schema } = mongoose

const organisationSchema = new Schema(
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
		logo: {
			type: String,
			required: false,
		},
		email: {
			type: String,
			required: true,
			lowercase: true,
			unique: true,
			validate: [
				validator.isEmail,
				'A organisation must have a valid billing email address',
			],
		},
		settings: {
			jobWorkflowTemplates: [
				{
					workflowTemplateName: { type: String, default: 'Standard' },
					workflowTemplateStagesList: {
						type: Array,
						default: ['Ready', 'In Production', 'Complete'],
					},
				},
			],
		},
		accountNo: String,
		tax: Number,
		abn: Number,
		users: [],
		address: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		state: {
			type: String,
			required: true,
		},
		postcode: {
			type: String,
			required: true,
		},
		country: {
			type: String,
			required: true,
		},
		phoneNumber: {
			type: String,
			required: true,
			validate: [
				validator.isMobilePhone,
				"Your mobile phone number must begin with a '+', followed by your country code then actual number e.g +254123456789",
			],
		},
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
)

organisationSchema.pre('save', async function (next) {
	this.accountNo = `${this.name}-${randomBytes(3).toString('hex').toUpperCase()}`

	next()
})

const Organisation = mongoose.model('Organisation', organisationSchema)

export default Organisation
