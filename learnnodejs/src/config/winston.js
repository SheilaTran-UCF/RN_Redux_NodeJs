import winston, { format } from 'winston'
import { env } from './env.js'

const { combine, timestamp, printf, colorize, align } = format

export const logger = winston.createLogger({
	level: env.LOG_LEVEL,
	format: combine(
		colorize({ all: true }),
		timestamp({
			format: 'YYYY-MM-DD hh:mm:ss.SSS A',
		}),
		align(),
		printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
	),
	handleExceptions: true,
	json: false,
	colorize: false,
	transports: [
		new winston.transports.File({
			filename: './logs/app-error.log',
			level: 'error',
		}),
		new winston.transports.File({
			filename: './logs/app-info.log',
			level: 'info',
		}),
		new winston.transports.Console(),
	],
	exitOnError: false, // do not exit on handled exceptions
})

// example
// logger.info('Info message');
// logger.error('Error message');
// logger.warn('Warning message');
