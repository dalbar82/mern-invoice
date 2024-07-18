import express from 'express'
import getUserProfile from '../controllers/user/getUserProfileController.js'
import checkAuth from '../middleware/checkAuthMiddleware.js'
import updateUserProfile from '../controllers/user/updateProfileController.js'
import deleteMyAccount from '../controllers/user/deleteMyAccount.js'
import getAllUsers from '../controllers/user/getAllUserAccounts.js'
import role from '../middleware/roleMiddleware.js'
import deleteUserAccount from '../controllers/user/deleteUserAccount.js'
import deactivateUserAccount from '../controllers/user/deactivateUser.js'
import reactivateUserAccount from '../controllers/user/reactivateUser.js'

const router = express.Router()

router
	.route('/profile')
	.get(checkAuth, getUserProfile)
	.patch(checkAuth, updateUserProfile)
	.delete(checkAuth, deleteMyAccount)

router
	.route('/all')
	.get(checkAuth, role.checkRole(role.ROLES.Admin), getAllUsers)

router
	.route('/:id')
	.delete(checkAuth, role.checkRole(role.ROLES.Admin), deleteUserAccount)

router
	.route('/:id/deactivate')
	.patch(checkAuth, role.checkRole(role.ROLES.Admin), deactivateUserAccount)
router
	.route('/:id/reactivate')
	.patch(checkAuth, role.checkRole(role.ROLES.Admin), reactivateUserAccount)

export default router
