import 'dotenv/config'
import mongoose from 'mongoose'
import validator from 'validator'

const { Schema } = mongoose

const appointmentSchema = new Schema(
	{
		subject: {
			type: String,
			required: true,
			trim: true,
			validate: [
				validator.isAlphanumeric,
				'Name can only have Alphanumeric values. No special characters allowed',
			],
		},
		description: {
			type: String,
		},
		contactEmail: {
			type: String,
			lowercase: true,
			unique: true,
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
		streetAddress: String,
		city: String,
		country: String,
		postcode: {
			type: String,
			validate: [validator.isNumeric],
		},
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

const Appointment = mongoose.model('Appointment', appointmentSchema)

export default Appointment
