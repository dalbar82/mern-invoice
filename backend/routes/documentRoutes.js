import express from 'express'
import createDocument from '../controllers/documents/createDocument.js'
import deleteDocument from '../controllers/documents/deleteDocument.js'
import getAllUserDocuments from '../controllers/documents/getAllUserDocuments.js'
import getSingleUserDocument from '../controllers/documents/getSingleUserDocument.js'
import updateDocument from '../controllers/documents/updateDocument.js'
import checkAuth from '../middleware/checkAuthMiddleware.js'
import createDocumentPayment from '../controllers/documents/createPayment.js'
import {
	generatePDF,
	getPDF,
	sendDocument,
} from '../controllers/documents/generatePDF.js'

const router = express.Router()

// create a new document at /api/v1/document/create
router.route('/create').post(checkAuth, createDocument)

// get all of a users documents at /api/v1/document/all
router.route('/all').get(checkAuth, getAllUserDocuments)

// create document payment
router.route('/:id/payment').post(checkAuth, createDocumentPayment)

// get,update and delete document at /api/v1/document/:id
router
	.route('/:id')
	.patch(checkAuth, updateDocument)
	.get(checkAuth, getSingleUserDocument)
	.delete(checkAuth, deleteDocument)

// generate PDF doc at /api/v1/document/generate-pdf
router.route('/generate-pdf').post(generatePDF)
// generate PDF doc at /api/v1/document/get-pdf
router.route('/get-pdf').get(getPDF)
// generate PDF doc at /api/v1/document/send-pdf
router.route('/send-pdf').post(sendDocument)

export default router
