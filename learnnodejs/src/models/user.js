import bcryptjs from 'bcryptjs'
import mongoose from 'mongoose'

const { Schema } = mongoose

const UserSchema = new Schema(
	{
		email: {
			type: String,
			required: [true, 'Please provide email'],
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		verified: Date,
		password: String,
		name: {
			type: String,
			required: [true, 'Please provide name'],
			minlength: 3,
			maxlength: 50,
		},
		gender: {
			type: Number,
			default: 0,
		},
		dateOfBirth: {
			type: Date,
			default: new Date('2000-08-20'),
		},
		avatar: {
			type: String,
			default: '',
		},
		coverAvatar: {
			type: String,
			default: '',
		},
		describe: {
			type: String,
			default: '',
		},
		address: {
			type: String,
			default: '',
		},
		phoneNumber: {
			type: String,
			default: '',
			length: 10,
		},
		contacts: {
			type: [Schema.Types.ObjectId],
			default: [],
		},
		contactWaitings: {
			type: [Schema.Types.ObjectId],
			default: [],
		},
		verificationToken: String,
		passwordToken: String,
		passwordTokenExpirationDate: Date,
	},
	{ timestamps: true }
)

UserSchema.pre('save', async function (next) {
	const User = this
	if (User.isModified('password')) {
		User.password = await bcryptjs.hash(User.password, 6)
	}
	next()
})

const UserModel = mongoose.model('users', UserSchema)

export default UserModel
