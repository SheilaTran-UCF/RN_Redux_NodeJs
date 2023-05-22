import mongoose from 'mongoose'

const { Schema } = mongoose

const TokenSchema = new Schema(
	{
		refreshToken: { type: String, required: true },
		ip: { type: String, required: true },
		userAgent: { type: String, required: true },
		isValid: { type: Boolean, default: true },
		user: {
			type: mongoose.Types.ObjectId,
			ref: 'users',
			required: true,
		},
	},
	{ timestamps: true }
)

const TokenModel = mongoose.model('tokens', TokenSchema)

export default TokenModel
