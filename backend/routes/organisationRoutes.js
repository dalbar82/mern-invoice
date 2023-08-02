import express from 'express'

import createOrganisation from '../controllers/organisations/createOrganisation.js'
// import deleteOrganisation from '../controllers/organisations/deleteOrganisation.js'
import getOrganisations from '../controllers/organisations/getOrganisations.js'
import getSingleOrganisation from '../controllers/organisations/getSingleOrganisation.js'
import updateOrganisation from '../controllers/organisations/updateOrganisation.js'
import checkAuth from '../middleware/checkAuthMiddleware.js'

const router = express.Router()

// create a new organisation at /api/v1/organisation/create
router.route('/create').post(checkAuth, createOrganisation)

// get all of a users organisations at /api/v1/organisation/all
router.route('/all').get(checkAuth, getOrganisations)

// get, update and delete a organisation
router
	.route('/:id')
	.get(checkAuth, getSingleOrganisation)
	.patch(checkAuth, updateOrganisation)
	// .delete(checkAuth, deleteOrganisation)

export default router
