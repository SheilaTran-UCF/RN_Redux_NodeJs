import bcryptjs from 'bcryptjs'
import mongoose from 'mongoose'

const { Schema } = mongoose

const WorkSchema = new Schema(
	{
		title: {
			type: String,
		},
		describe: {
			type: String,
		},
	},
	{ timestamps: true }
)

const WorkModel = mongoose.model('works', WorkSchema)

export default WorkModel
