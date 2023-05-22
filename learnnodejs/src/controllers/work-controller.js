import { StatusCodes } from 'http-status-codes'
import Work from '../models/work.js'

const createWork = async (req, res, next) => {
	const { title, describe } = req.body

	try {
		const work = await Work.create({
			title,
			describe,
		})

		await res.status(StatusCodes.OK).json({
			status: StatusCodes.OK,
			msg: 'Success!',
			data: work,
		})
	} catch (error) {
		next(error)
	}
}

const updateWork = async (req, res, next) => {
	const { id, title, describe } = req.body

	await Work.updateOne({ _id: id }, { title: title, describe: describe })

	const data = await Work.findOne({ _id: id })
	await res.status(StatusCodes.OK).json({
		status: StatusCodes.OK,
		msg: 'Success!',
		data: data,
	})
	try {
	} catch (error) {
		next(error)
	}
}

const deleteWork = async (req, res, next) => {
	const { id } = req.params

	await Work.deleteOne({ _id: id })
	await res.status(StatusCodes.OK).json({
		status: StatusCodes.OK,
		msg: 'Success!',
		data: id,
	})
	try {
	} catch (error) {
		next(error)
	}
}

const getWorks = async (req, res, next) => {
	try {
		const works = await Work.find()
		const sortedWorks = works.sort(function (a, b) {
			return new Date(b.updatedAt) - new Date(a.updatedAt)
		})
		await res.status(StatusCodes.OK).json({
			status: StatusCodes.OK,
			msg: 'Success!',
			data: sortedWorks,
		})
	} catch (error) {
		next(error)
	}
}

export { createWork, updateWork, deleteWork, getWorks }
