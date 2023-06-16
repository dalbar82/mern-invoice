import express from 'express'
import getUserProfile from '../controllers/user/getUserProfileController.js'
import checkAuth from '../middleware/checkAuthMiddleware.js'
import updateUserProfile from '../controllers/user/updateProfileController.js'
import deleteMyAccount from '../controllers/user/deleteUserAccount.js'

const router = express.Router()

router
	.route('/profile')
	.get(checkAuth, getUserProfile)
	.patch(checkAuth, updateUserProfile)
	.delete(checkAuth, deleteMyAccount)

export default router