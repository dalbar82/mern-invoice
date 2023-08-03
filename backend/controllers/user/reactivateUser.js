import asyncHandler from 'express-async-handler'
import User from '../../models/userModel.js'

// $-title   reactivate User Account
// $-path    patch /api/v1/user/:id/reactivated
// $-auth    Private/Admin

const reactivateUserAccount = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id)

	if (user) {
		user.active = true
		const updated = await user.save()

		res.json({
			success: true,
			message: `User ${updated.firstName} has been deactivated successfully.`,
		})
	} else {
		res.status(404)
		throw new Error('user not found')
	}
})

export default reactivateUserAccount
