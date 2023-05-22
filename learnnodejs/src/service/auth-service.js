import bcryptjs from 'bcryptjs'
import CryptoJS from 'crypto-js'
import { StatusCodes } from 'http-status-codes'
import { env } from '../config/index.js'
import { createError } from '../exception/index.js'
import Token from '../models/token.js'
import User from '../models/user.js'
import { generateString, sendResetPasswordEmail, sendVerificationEmail } from '../utils/index.js'

const NAME_REGEX = /\w{1,50}/
const EMAIL_REGEX =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const AuthService = {
	register: async (params) => {
		const { email, name, password } = params

		if (!email || !name || !password) throw createError(StatusCodes.BAD_REQUEST, 'Data invalid')

		if (!EMAIL_REGEX.test(String(email).toLowerCase()))
			throw createError(StatusCodes.BAD_REQUEST, 'Wrong email format')

		if (password.length < 6 || password.length > 28)
			throw createError(StatusCodes.BAD_REQUEST, 'Password invalid')

		const emailAlreadyExists = await User.findOne({ email })
		if (emailAlreadyExists) throw createError(StatusCodes.BAD_REQUEST, 'Email already exists')

		if (!NAME_REGEX.test(name)) throw createError(StatusCodes.BAD_REQUEST, 'Name invalid')

		const verificationToken = CryptoJS.SHA256(name + email + password)

		const user = await User.create({
			name,
			email,
			password,
			verificationToken,
		})

		const origin = env.ORIGIN
		await sendVerificationEmail({
			name: user.name,
			email: user.email,
			verificationToken: user.verificationToken,
			origin,
		})
	},
	login: async (params) => {
		const { email, password } = params

		if (!email || !password) throw createError(StatusCodes.BAD_REQUEST, 'Data invalid')

		if (!EMAIL_REGEX.test(String(email).toLowerCase()))
			throw createError(StatusCodes.BAD_REQUEST, 'Wrong email format')

		if (password.length < 6 || password.length > 28)
			throw createError(StatusCodes.BAD_REQUEST, 'Password invalid')

		const user = await User.findOne({
			email,
		})
		if (!user) throw createError(StatusCodes.NOT_FOUND, 'User not found!')

		const isPasswordMatch = await bcryptjs.compare(password, user.password)
		if (!isPasswordMatch) throw createError(StatusCodes.BAD_REQUEST, 'Wrong password')

		if (!user.isVerified) throw createError(StatusCodes.UNAUTHORIZED, 'This account is inactive')

		return user
	},
	logout: async (params) => {
		const { userId } = params
		await Token.findOneAndDelete({ user: userId })
	},
	forgotPassword: async (params) => {
		const { email } = params

		if (!email) throw createError(StatusCodes.BAD_REQUEST, 'Please provide valid email')

		const user = await User.findOne({ email })

		if (!user) throw createError(StatusCodes.NOT_FOUND, 'User not found')

		const passwordToken = generateString(5).trim()
		const origin = env.ORIGIN
		await sendResetPasswordEmail({
			name: user.name,
			email: user.email,
			token: passwordToken,
			origin,
		})

		const tenMinutes = 1000 * 60 * 5
		const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes)

		user.passwordToken = CryptoJS.SHA256(passwordToken).toString()
		user.passwordTokenExpirationDate = passwordTokenExpirationDate
		await user.save()
	},
	resetPassword: async (params) => {
		const { token, email, password } = params
		if (!token || !email || !password) throw createError(StatusCodes.BAD_REQUEST, 'Data invalid')

		const user = await User.findOne({ email })

		if (!user) throw createError(StatusCodes.NOT_FOUND, 'User not found')

		const currentDate = new Date()

		if (
			user.passwordToken !== CryptoJS.SHA256(token).toString() &&
			user.passwordTokenExpirationDate < currentDate
		)
			throw createError(StatusCodes.BAD_REQUEST, 'Wrong or expired token')

		user.password = password
		user.passwordToken = null
		user.passwordTokenExpirationDate = null
		await user.save()
	},
}
