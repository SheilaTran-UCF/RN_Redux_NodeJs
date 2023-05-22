import CryptoJS from 'crypto-js'
import { StatusCodes } from 'http-status-codes'
import { createError } from '../exception/error.js'
import Token from '../models/token.js'
import User from '../models/user.js'
import { AuthService } from '../service/index.js'
import { tokenUtils } from '../utils/index.js'

const register = async (req, res, next) => {
	try {
		await AuthService.register(req.body)
		await res.status(StatusCodes.OK).json({
			status: StatusCodes.OK,
			msg: 'Success! Please check your email to verify account',
		})
	} catch (error) {
		next(error)
	}
}

const verifyEmail = async (req, res, next) => {
	const { token, email } = req.query

	try {
		const user = await User.findOne({
			email,
			isVerified: false,
			verificationToken: token,
		})

		if (!user) return res.send('Verify failed')

		user.isVerified = true
		user.verified = Date.now()
		user.verificationToken = ''
		await user.save()

		res.send(`Email Verified. Go to <a href="/">LOGIN</a>`)
	} catch (error) {
		next(error)
	}
}

const login = async (req, res, next) => {
	const { user: userGoogle } = req

	try {
		// login google account
		if (userGoogle) {
			let refreshToken = ''
			const existingToken = await Token.findOne({ user: userGoogle._id })

			if (existingToken) {
				const { isValid } = existingToken
				if (!isValid) throw createError(StatusCodes.UNAUTHORIZED, 'This token is inactive')

				refreshToken = existingToken.refreshToken
				tokenUtils.attachCookiesToResponse({ res, userId: userGoogle._id, refreshToken })
			}

			refreshToken = CryptoJS.SHA256(userGoogle._id)
			tokenUtils.attachCookiesToResponse({ res, userId: userGoogle._id, refreshToken })
			
			const userAgent = req.headers['user-agent']
			const ip = req.ip
			const userToken = { refreshToken, ip, userAgent, user: userGoogle._id }

			await Token.create(userToken)

			return res.status(StatusCodes.OK).json({
				status: StatusCodes.OK,
				msg: 'Login successful',
				userId: userGoogle._id,
			})
		}

		const user = await AuthService.login(req.body)

		// create refresh token
		let refreshToken = ''
		// check for existing token
		const existingToken = await Token.findOne({ user: user._id })

		if (existingToken) {
			const { isValid } = existingToken
			if (!isValid) throw createError(StatusCodes.UNAUTHORIZED, 'This token is inactive')

			refreshToken = existingToken.refreshToken
			tokenUtils.attachCookiesToResponse({ res, userId: user._id, refreshToken })
		}

		refreshToken = CryptoJS.SHA256(user._id)
		tokenUtils.attachCookiesToResponse({ res, userId: user._id, refreshToken })

		const userAgent = req.headers['user-agent']
		const ip = req.ip
		const userToken = { refreshToken, ip, userAgent, user: user._id }

		await Token.create(userToken)


		res.status(StatusCodes.OK).json({
			status: StatusCodes.OK,
			msg: 'Login successful',
			userId: user._id,
		})
	} catch (error) {
		next(error)
	}
}

const logout = async (req, res, next) => {
	try {
		await AuthService.logout(req)
		res.cookie('accessToken', 'logout', {
			httpOnly: true,
			expires: new Date(Date.now()),
		})
		res.cookie('refreshToken', 'logout', {
			httpOnly: true,
			expires: new Date(Date.now()),
		})
		res.status(StatusCodes.OK).json({ status: StatusCodes.OK, msg: 'User logged out!' })
	} catch (error) {
		next(error)
	}
}

const forgotPassword = async (req, res, next) => {
	try {
		await AuthService.forgotPassword(req.body)
		res.status(StatusCodes.OK).json({
			status: StatusCodes.OK,
			msg: 'Success! Please check your email to reset password',
		})
	} catch (error) {
		next(error)
	}
}

const resetPassword = async (req, res, next) => {
	try {
		await AuthService.resetPassword(req.body)
		res.status(StatusCodes.OK).json({
			status: StatusCodes.OK,
			msg: 'Reset password successful',
		})
	} catch (error) {
		next(error)
	}
}

export { register, verifyEmail, login, logout, forgotPassword, resetPassword }
