import 'dotenv/config'
import mongoose from 'mongoose'
import validator from 'validator'
const { randomBytes } = await import('crypto')

const { Schema } = mongoose

const contactsSchema = new Schema({
	contactEmail: {
		type: String,
		lowercase: true,
		required: true,
		validate: [validator.isEmail, 'Please provide a valid email'],
	},
	contactName: {
		type: String,
		required: true,
	},
	contactPhoneNumber: {
		type: String,
		default: '+254123456789',
		validate: [
			validator.isMobilePhone,
			"Your mobile phone number must begin with a '+', followed by your  country code then actual number e.g +254123456789",
		],
	},
})
const appointmentSchema = new Schema(
	{
		createdBy: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		appointmentNumber: String,
		subject: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
		},
		contacts: [contactsSchema],

		location: String,
		startTime: Date,
		endTime: Date,
		organisation: { type: String, required: true },
		jobId: String,
		assignedUsers: Array,
	},
	{
		timestamps: true,
	}
)

appointmentSchema.pre('save', async function (next) {
	this.appointmentNumber = `${randomBytes(3).toString('hex').toUpperCase()}`
	next()
})

const Appointment = mongoose.model('Appointment', appointmentSchema)

export default Appointment
