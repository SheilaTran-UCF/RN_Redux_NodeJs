import bcryptjs from 'bcryptjs'
import { StatusCodes } from 'http-status-codes'
import { createError } from '../exception/index.js'
import User from '../models/user.js'
import { uploadFile } from '../service/index.js'

export const MeService = {
	getProfile: async (params) => {
		const { userId } = params

		const user = await User.findOne({ _id: userId })

		if (!user) throw createError(StatusCodes.NOT_FOUND, 'User not found!')

		return user
	},
	changeProfile: async (params) => {
		const { userId, name, gender, dateOfBirth, describe, address, phoneNumber } = params
		if (!name || !gender || !dateOfBirth || !describe || !address || !phoneNumber)
			throw createError(StatusCodes.BAD_REQUEST, 'Data invalid')

		if (name.length < 3 || name.length > 50)
			throw createError(StatusCodes.BAD_REQUEST, 'Name invalid')

		if (phoneNumber.length !== 10)
			throw createError(StatusCodes.BAD_REQUEST, 'Phone number invalid')

		const user = await User.findOne({ _id: userId })

		if (!user) throw createError(StatusCodes.NOT_FOUND, 'User not found')

		await User.updateOne(
			{ _id: userId },
			{ name, gender, dateOfBirth, describe, address, phoneNumber }
		)
	},
	changePassword: async (params) => {
		const { userId, currentPassword, newPassword } = params

		if (!currentPassword || !newPassword) throw createError(StatusCodes.BAD_REQUEST, 'Data invalid')

		const user = await User.findOne({ _id: userId })

		if (!user) throw createError(StatusCodes.NOT_FOUND, 'User not found')

		const isCurrentPasswordMatch = await bcryptjs.compare(currentPassword, user.password)
		if (!isCurrentPasswordMatch)
			throw createError(StatusCodes.BAD_REQUEST, 'Wrong current password')

		if (currentPassword === newPassword) throw createError(StatusCodes.BAD_REQUEST, 'Same password')

		user.password = newPassword
		await user.save()
	},
	changeAvatar: async (params) => {
		const { file, userId } = params

		if (!file) throw createError(StatusCodes.BAD_REQUEST, 'Data invalid')

		const user = await User.findOne({ _id: userId })

		if (!user) throw createError(StatusCodes.NOT_FOUND, 'User not found')

		const content = await uploadFile(file)

		user.avatar = content
		await user.save()

		return content
	},
	changeCoverAvatar: async (params) => {
		const { file, userId } = params

		if (!file) throw createError(StatusCodes.BAD_REQUEST, 'Data invalid')

		const user = await User.findOne({ _id: userId })

		if (!user) throw createError(StatusCodes.NOT_FOUND, 'User not found')

		const content = await uploadFile(file)

		user.coverAvatar = content
		await user.save()

		return content
	},
}
