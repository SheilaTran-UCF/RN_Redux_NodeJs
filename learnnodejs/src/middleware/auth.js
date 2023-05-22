import { StatusCodes } from 'http-status-codes'
import { createError } from '../exception/error.js'
import Token from '../models/token.js'
import { tokenUtils } from '../utils/index.js'

export const auth = async (req, res, next) => {
	const { refreshToken, accessToken } = req.signedCookies

	try {
		if (accessToken) {
			const payload = tokenUtils.isTokenValid(accessToken)
			req.userId = payload.userId
			return next()
		}
		const payload = tokenUtils.isTokenValid(refreshToken)

		const existingToken = await Token.findOne({
			user: payload.userId,
			refreshToken: payload.refreshToken,
		})

		if (!existingToken || !existingToken?.isValid)
			throw createError(StatusCodes.NOT_FOUND, 'User not found')

		tokenUtils.attachCookiesToResponse({
			res,
			userId: payload.userId,
			refreshToken: existingToken.refreshToken,
		})

		req.userId = payload.userId
		next()
	} catch (error) {
		res.status(StatusCodes.UNAUTHORIZED).json({
			status: StatusCodes.UNAUTHORIZED,
			msg: 'Token expires',
			keyError: 'expired',
		})
	}
}
