import bcrypt from 'bcryptjs'
import 'dotenv/config'
import mongoose from 'mongoose'
import validator from 'validator'
import { USER } from '../constants/index.js'

const { Schema } = mongoose

const userSchema = new Schema(
	{
		email: {
			type: String,
			lowercase: true,
			unique: true,
			required: true,
			validate: [validator.isEmail, 'Please provide a valid email'],
		},
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			validate: {
				validator: function (value) {
					return /^[A-z][A-z0-9-_]{3,23}$/.test(value)
				},
				message:
					'Username must be contain letters and numbers. No special characters allowed. Hyphens and underscores are allowed',
			},
		},
		firstName: {
			type: String,
			required: true,
			trim: true,
			validate: [
				validator.isAlphanumeric,
				'First name con only have alphanumeric values. No special characters',
			],
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
			validate: [
				validator.isAlphanumeric,
				'Last name con only have alphanumeric values. No special characters',
			],
		},
		password: {
			type: String,
			select: false,
			validate: [
				validator.isStrongPassword,
				'Password must be at least 8 characters long, with at least 1 uppercase and lowercase letter and at least 1 symbol',
			],
		},
		passwordConfirm: {
			type: String,
			validate: {
				validator: function (value) {
					return value === this.password
				},
				message: 'Passwords do not match',
			},
		},
		isEmailVerified: {
			type: Boolean,
			required: true,
			default: false,
		},
		provider: {
			type: String,
			required: true,
			default: email,
		},
		googleId: String,
		avatar: String,
		businessName: String,
		phoneNumber: {
			type: String,
			default: '+610400111222',
			validate: [
				validator.isMobilePhone,
				'Your mobile phone must begin with "+" followed by your country code, then you full mobile number',
			],
		},
		address: String,
		city: String,
		country: String,
		passwordChangedAt: Date,

		roles: {
			type: [String],
			default: [USER],
		},
		active: {
			type: Boolean,
			default: true,
		},
		refreshToken: [String],
	},
	{
		timestamps: true,
	}
)

userSchema.pre('save', async function (next) {
	if (this.roles.length === 0) {
		this.roles.push(USER)
		next()
	}
})

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next()
	}

	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)

	this.passwordConfirm = undefined
	next()
})

userSchema.pre('save', async function (next) {
	if (!this.isModified('password') || this.isNew) {
		return next()
	}

	this.passwordChangedAt = Date.now()
	next()
})

userSchema.methods.comparePassword = async function (givenPassword) {
	return await bcrypt.compare(givenPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User
