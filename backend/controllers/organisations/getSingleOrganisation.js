import asyncHandler from 'express-async-handler'
import Organisation from '../../models/organisationModel.js'

// $-title   Get a Single organisation belonging to a User
// $-path    GET /api/v1/organisation/:id
// $-auth    Private

const getSingleUserOrganisation = asyncHandler(async (req, res) => {
	const organisation = await Organisation.findById(req.params.id)

	const user = req.user._id

	if (!organisation) {
		res.status(204)
		throw new Error('Organisation not found')
	}

	if (organisation.id !== user) {
		res.status(200).json({
			success: true,
			organisation,
		})
	} else {
		res.status(401)
		throw new Error(
			"You are not authorized to view this organisation's information."
		)
	}
})

export default getSingleUserOrganisation
