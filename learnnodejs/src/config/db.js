import mongoose from 'mongoose'
import { env } from './env.js'
import { logger } from './winston.js'

export const connectionMongodb = () => {
	return mongoose
		.connect(env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			logger.info('Connected to vhalo_db')
		})
		.catch((err) => {
			logger.error('Failed to connect to vhalo_db', err)
		})
}
