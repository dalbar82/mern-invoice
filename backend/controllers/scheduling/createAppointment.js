import asyncHandler from 'express-async-handler'
import Appointment from '../../models/appointmentModel.js'

// $-title   Create Appointment
// $-path    POST /api/v1/appointment/create
// $-auth    Private

const createAppointment = asyncHandler(async (req, res) => {
	const {
		subject,
		description,
		contacts,
		location,
		startTime,
		endTime,
		assignedUsers,
		jobId,
	} = req.body

	const organisation = req.user.organisation

	if (!organisation) {
		res.status(400)
		throw new Error('An appointment must belong to an organisation')
	}

	if (!subject || !startTime || !endTime) {
		res.status(400)
		throw new Error(
			'An appointment must have at least a subject, start time and end time'
		)
	}

	const newAppointment = new Appointment({
		createdBy: req.user._id,
		subject,
		description,
		contacts,
		location,
		startTime,
		endTime,
		assignedUsers,
		organisation,
		jobId,
	})

	const createdAppointment = await newAppointment.save()

	if (!createdAppointment) {
		res.status(400)
		throw new Error('Appointment could not be created')
	}

	res.status(200).json({
		success: true,
		message: `New appointment created successfully`,
		createdAppointment,
	})
})

export default createAppointment
