import asyncHandler from 'express-async-handler'
import Organisation from '../../models/organisationModel.js'

// $-title   Update Organisation
// $-path    PATCH /api/v1/organisation/:id
// $-auth    Private

const updateOrganisation = asyncHandler(async (req, res) => {
	const organisation = await Organisation.findById(req.params.id)

	if (!req.user.roles.includes('Internal_admin')) {
		res.status(400)
		throw new Error('You are not authorised to complete this action')
	}
	if (!organisation) {
		res.status(404)
		throw new Error('That Organisation does not exist')
	}

	if (organisation.createdBy.toString() !== req.user.id) {
		res.status(401)
		throw new Error(
			"You are not authorized to update this organisation's information. He/She is not your organisation"
		)
	}

	const { id: _id } = req.params
	const fieldsToUpdate = req.body

	const updatedOrganisationInfo = await Organisation.findByIdAndUpdate(
		_id,
		{ ...fieldsToUpdate, _id },
		{ new: true, runValidators: true }
	)

	res.status(200).json({
		success: true,
		message: `${organisation.name}'s info was successfully updated`,
		updatedOrganisationInfo,
	})
})

export default updateOrganisation
