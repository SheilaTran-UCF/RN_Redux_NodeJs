import { StatusCodes } from 'http-status-codes'
import { MeService } from '../service/me-service.js'

const getProfile = async (req, res, next) => {
	try {
		const user = await MeService.getProfile(req)

		return res.status(StatusCodes.OK).json({
			status: StatusCodes.OK,
			msg: 'Ger profile information successful',
			data: user,
		})
	} catch (error) {
		next(error)
	}
}

const changeProfile = async (req, res, next) => {
	const { userId } = req
	const { name, gender, dateOfBirth, describe, address, phoneNumber } = req.body

	try {
		await MeService.changeProfile({
			userId,
			name,
			gender,
			dateOfBirth,
			describe,
			address,
			phoneNumber,
		})

		res.status(StatusCodes.OK).json({
			status: StatusCodes.OK,
			msg: 'Change profile successfully',
		})
	} catch (error) {
		next(error)
	}
}

const changePassword = async (req, res, next) => {
	const { userId } = req
	const { currentPassword, newPassword } = req.body

	try {
		await MeService.changePassword({ userId, currentPassword, newPassword })

		res.status(StatusCodes.OK).json({
			status: StatusCodes.OK,
			msg: 'Change password successfully',
		})
	} catch (error) {
		next(error)
	}
}

const changeAvatar = async (req, res, next) => {
	try {
		const content = await MeService.changeAvatar(req)
		res.status(StatusCodes.OK).json({
			status: StatusCodes.OK,
			msg: 'Change avatar successfully',
			avatar: content,
		})
	} catch (error) {
		next(error)
	}
}

const changeCoverAvatar = async (req, res, next) => {
	try {
		const content = await MeService.changeCoverAvatar(req)
		res.status(StatusCodes.OK).json({
			status: StatusCodes.OK,
			msg: 'Change cover avatar successfully',
			avatar: content,
		})
	} catch (error) {
		next(error)
	}
}

export { getProfile, changeProfile, changePassword, changeAvatar, changeCoverAvatar }
