import asyncHandler from 'express-async-handler'
import User from '../../models/userModel.js'
import VerificationToken from '../../models/verifyResetTokenModel.js'
import sendEmail from '../../utils/sendEmail.js'
const domainUrl = process.env.DOMAIN

const { randomBytes } = await import('crypto')

// $-title   Send password reset email link
// $-path    POST /api/v1/auth/reset_password_request
// $-auth    Public

const resetPasswordRequest = asyncHandler(async (req, res) => {
	const { email } = req.body
	const existingUser = await User.findOne({ email }).select('-passwordConfirm')

	if (!email) {
		res.status(400)
		throw new Error('An email must be provided')
	}

	if (!existingUser) {
		res.status(400)
		throw new Error('We were unable to find a user with that email address')
	}

	let verificationToken = await VerificationToken.findOne({
		_userId: existingUser._id,
	})

	if (verificationToken) {
		await verificationToken.deleteOne()
	}

	const resetToken = randomBytes(32).toString('hex')

	let newVerificationToken = await new VerificationToken({
		_userId: existingUser._id,
		token: resetToken,
		createdAt: Date.now(),
	}).save()

	if (existingUser && existingUser.isEmailVerified) {
		const emailLink = `${domainUrl}/auth/reset_password?emailToken=${newVerificationToken.token}&userId=${existingUser._id}`

		const payload = {
			name: existingUser.firstName,
			link: emailLink,
		}

		await sendEmail(
			existingUser.email,
			'Password Reset Request',
			payload,
			'.emails/template/requestResetPassword.handlebars'
		)
		res.json({
			success: true,
			message: `${existingUser.firstName}, an email has been sent to your account with a password reset link`,
		})
	}
})
export default resetPasswordRequest

// $-title   Reset password
// $-path    POST /api/v1/auth/reset_password
// $-auth    Public

const resetPassword = asyncHandler(async (req, res) => {
	const { password, passwordConfirm, userId, emailToken } = req.body

	if (!password) {
		res.status(400)
		throw new Error('A password is required')
	}
	if (password !== password) {
		res.status(400)
		throw new Error('Passwords do not match')
	}
	if (password.length < 8) {
		res.status(400)
		throw new Error('Passwords must be at least 8 characters long')
	}
	const passwordResetToken = await VerificationToken.findOne({ userId })

	if (!passwordResetToken) {
		res.status(400)
		throw new Error(
			'Your reset token is either invalid or expired. Try resetting your password again.'
		)
	}

	const user = await User.findById({
		_id: passwordResetToken._userId,
	}).select('-passwordConfirm')

	if (user && passwordResetToken) {
		user.password = password
		await user.save()
	}

	const payload = {
		name: user.firstName,
	}
	await sendEmail(
		user.email,
		'Password Reset Success',
		payload,
		'./emails/template/resetPassword.handlebars'
	)
})
