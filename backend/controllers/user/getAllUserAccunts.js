import asyncHandler from 'express-async-handler'
import User from '../../models/userModel.js'

// $-title   Update User Profile
// $-path    get /api/v1/user/all
// $-auth    Private/Admin

const getAllUsers = asyncHandler(async (req, res) => {
	const pageSize = 10

	const page = Number(req.query.pageNumber) || 1

	const count = await User.countDocuments({})

	const users = await User.find()
		.sort({ createdAt: -1 })
		.select('-refreshToken')
		.limit(pageSize)
		.skip(pageSize * (page - 1))
		.lean()

	res.json({
		success: true,
		count,
		numberOfPages: Math.ceil(count / pageSize),
		users,
	})
})

export default getAllUsers
