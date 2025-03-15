import asyncHandler from 'express-async-handler'
import Organisation from '../../models/organisationModel.js'

// $-title   Get all organisations belonging to a specific User
// $-path    GET /api/v1/organisation/all
// $-auth    Private

const getOrganisations = asyncHandler(async (req, res) => {
	const pageSize = 10
	const page = Number(req.query.page) || 1

	if (!req.user.roles.includes('Admin')) {
		res.status(400)
		throw new Error('You are not authorised to complete this action')
	}

	const count = await Organisation.countDocuments({ createdBy: req.user._id })

	const organisations = await Organisation.find({ createdBy: req.user._id })
		.sort({
			createdAt: -1,
		})
		.limit(pageSize)
		.skip(pageSize * (page - 1))
		.lean()

	res.json({
		success: true,
		totalOrganisations: count,
		numberOfPages: Math.ceil(count / pageSize),
		myOrganisations: organisations,
	})
})

export default getOrganisations
