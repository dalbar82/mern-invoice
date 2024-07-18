import express from 'express'

import createAppointment from '../controllers/scheduling/createAppointment.js'
import getAllAppointments from '../controllers/scheduling/getAllAppointments.js'
import checkAuth from '../middleware/checkAuthMiddleware.js'

const router = express.Router()

// create a new appointment at /api/v1/appointment/create
router.route('/create').post(checkAuth, createAppointment)

// get appointments at /api/v1/appointment/all
router.route('/all').get(checkAuth, getAllAppointments)

export default router
