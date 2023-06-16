import express from 'express'
import getUserProfile from '../controllers/user/getUserProfileController.js'
import checkAuth from '../middleware/checkAuthMiddleware.js'

const router = express.Router()

router.route('/profile').get(checkAuth, getUserProfile)

export default router