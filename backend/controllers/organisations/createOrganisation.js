import asyncHandler from 'express-async-handler'
import Organisation from '../../models/organisationModel.js'

// $-title   Create Organisation
// $-path    POST /api/v1/organisation/create
// $-auth    Private

const createOrganisation = asyncHandler(async (req, res) => {
	const {
		email,
		name,
		phoneNumber,
		tax,
		abn,
		address,
		city,
		users,
		country,
		state,
		postcode,
		logo
	} = req.body

	if (
		!email ||
		!name ||
		!phoneNumber ||
		!address ||
		!city ||
		!country ||
		!state ||
		!postcode
	) {
		res.status(400)
		throw new Error(
			'An Organisation must have at least a name, address, email and phone number'
		)
	}

	if (!req.user.roles.includes('Internal_admin')) {
		res.status(400)
		throw new Error('You are not authorised to complete this action')
	}

	const organisationExists = await Organisation.findOne({ name })

	if (organisationExists) {
		res.status(400)
		throw new Error('That Organisation already exists')
	}

	const newOrganisation = new Organisation({
		createdBy: req.user._id,
		name,
		email,
		phoneNumber,
		abn,
		users,
		tax,
		address,
		city,
		country,
		state,
		postcode,
		logo
	})

	const createdOrganisation = await newOrganisation.save()

	if (!createdOrganisation) {
		res.status(400)
		throw new Error('Organisation could not be created')
	}

	res.status(200).json({
		success: true,
		message: `Your organisation named: ${createdOrganisation.name}, was created successfully`,
		createdOrganisation,
	})
})

export default createOrganisation
