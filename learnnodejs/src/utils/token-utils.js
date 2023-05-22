import jwt from 'jsonwebtoken'
import { env } from '../config/index.js'

export const tokenUtils = {
	isTokenValid: (token) => jwt.verify(token, env.JWT_SECRET),
	attachCookiesToResponse: ({ res, userId, refreshToken }) => {
		const accessTokenJWT = jwt.sign({ userId }, env.JWT_SECRET)
		const refreshTokenJWT = jwt.sign({ userId, refreshToken }, env.JWT_SECRET)

		const oneDay = Number(env.JWT_LIFE_ACCESS_TOKEN)
		const longerExp = Number(env.JWT_LIFE_REFRESH_TOKEN)

		res.cookie('accessToken', accessTokenJWT, {
			httpOnly: true,
			secure: false,
			signed: true,
			expires: new Date(Date.now() + oneDay),
		})

		res.cookie('refreshToken', refreshTokenJWT, {
			httpOnly: true,
			secure: false,
			signed: true,
			expires: new Date(Date.now() + longerExp),
		})
	},
}
