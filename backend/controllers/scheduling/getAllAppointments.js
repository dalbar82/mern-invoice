import asyncHandler from 'express-async-handler'
import Appointment from '../../models/appointmentModel.js'

// $-title   Get all appointments belonging to a specific Organisation
// $-path    GET /api/v1/appointment/all
// $-auth    Private

const getAllAppointments = asyncHandler(async (req, res) => {
	const appointments = await Appointment.find({
		organisation: req.user.organisation,
	})
  
	res.json({
		success: true,
		myAppointments: appointments,
	})
})

export default getAllAppointments
