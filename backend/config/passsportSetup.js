import 'dotenv/config'
import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import User from '../models/userModel.js'

const domainURL = process.env.DOMAIN

const googleCallbackURL = process.env.GOOGLE_CALLBACK_URL

const googleAuth = () => {
	passport.use(
		new GoogleStrategy.Strategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: `${domainURL}/api/v1/${googleCallbackURL}`,
			},
			(accessToken, refreshToken, profile, done) => {

				User.findOne({ googleID: profile.id }).then((user) => {
					if (!user) {
						const name = profile.displayName.split(' ')

						User.create({
							username: profile._json.given_name,
							firstName: name[0],
							lastName: name[1],
							avatar: profile._json.picture,
							email: profile._json.email,
							googleID: profile.id,
							organisation: profile._json.organisation,
							isEmailVerified: profile._json.email_verified,
							provider: 'google',
						})
							.then((user) => {
								done(null, user)
							})
							.catch((err) => {
								return done(err, false)
							})
					} else {
						done(null, user)
					}
				})
			}
		)
	)
}

export default googleAuth
