import express from 'express'
import getUserProfile from '../controllers/user/getUserProfileController.js'
import checkAuth from '../middleware/checkAuthMiddleware.js'
import updateUserProfile from '../controllers/user/updateProfileController.js'
import deleteMyAccount from '../controllers/user/deleteUserAccount.js'
import getAllUsers from '../controllers/user/getAllUserAccunts.js'
import role from '../middleware/roleMiddleware.js'

const router = express.Router()

router
	.route('/profile')
	.get(checkAuth, getUserProfile)
	.patch(checkAuth, updateUserProfile)
	.delete(checkAuth, deleteMyAccount)

router
	.route('/all')
	.get(checkAuth, role.checkRole(role.ROLES.Admin), getAllUsers)
export default router
