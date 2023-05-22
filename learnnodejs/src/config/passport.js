import { Strategy } from 'passport-google-oauth20'
import User from '../models/user.js'
import { env } from './env.js'

export const passportConfig = (passport) => {
	passport.use(
		new Strategy(
			{
				clientID: env.GOOGLE_AUTH_CLIENT_ID,
				clientSecret: env.GOOGLE_AUTH_CLIENT_SECRET,
				callbackURL: env.GOOGLE_AUTH_CALLBACK_URL,
			},
			async (accessToken, refreshToken, profile, done) => {
				const newUser = {
					email: profile.emails[0].value,
					isVerified: true,
					verified: new Date(),
					name: profile.displayName,
					avatar: profile.photos[0].value,
					verificationToken: '',
					password: '123123',
				}

				try {
					let user = await User.findOne({ email: profile.emails[0].value })

					if (user) {
						// case: tai khoan da duoc tao bang email adress nhung chua xac thuc
						// viec oauth google login <=> tai khoan da duoc xac thuc khong can thiet gui mail 
						if (!user.isVerified)
							user = await User.findOneAndUpdate(
								{ _id: user._id },
								{
									avatar: profile.photos[0].value,
									isVerified: true,
									verified: new Date(),
									verificationToken: '',
								}
							)
						// case: tai khoan da duoc tao bang email adress da xac thuc va chua co avatar
						if (!user.avatar)
							user = await User.findOneAndUpdate(
								{ _id: user._id },
								{
									avatar: profile.photos[0].value,
								}
							)
						done(null, user)
					} else {
						user = await User.create(newUser)
						done(null, user)
					}
				} catch (err) {
					console.error(err)
				}
			}
		)
	)
	passport.serializeUser((user, done) => {
		done(null, user._id)
	})

	passport.deserializeUser((_id, done) => {
		User.findById(_id, (err, user) => done(err, user))
	})
}
