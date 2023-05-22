import { google } from 'googleapis'
import nodemailer from 'nodemailer'
import { env, logger } from '../config/index.js'

const GOOGLE_NODEMAILER_CLIENT_ID = env.GOOGLE_NODEMAILER_CLIENT_ID
const GOOGLE_NODEMAILER_CLIENT_SECRET = env.GOOGLE_NODEMAILER_CLIENT_SECRET
const GOOGLE_NODEMAILER_REDIRECT_ID = env.GOOGLE_NODEMAILER_REDIRECT_ID
const GOOGLE_NODEMAILER_REFRESH_TOKEN = env.GOOGLE_NODEMAILER_REFRESH_TOKEN
const GOOGLE_NODEMAILER_GOOGLE_USER = env.GOOGLE_NODEMAILER_GOOGLE_USER

const oAuth2Client = new google.auth.OAuth2(
	GOOGLE_NODEMAILER_CLIENT_ID,
	GOOGLE_NODEMAILER_CLIENT_SECRET,
	GOOGLE_NODEMAILER_REDIRECT_ID
)
oAuth2Client.setCredentials({ refresh_token: GOOGLE_NODEMAILER_REFRESH_TOKEN })

export const sendEmail = async ({ to, subject, html }) => {
	try {
		const accessToken = await oAuth2Client.getAccessToken()
		
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				type: 'OAUTH2',
				user: GOOGLE_NODEMAILER_GOOGLE_USER,
				clientId: GOOGLE_NODEMAILER_CLIENT_ID,
				clientSecret: GOOGLE_NODEMAILER_CLIENT_SECRET,
				refreshToken: GOOGLE_NODEMAILER_REFRESH_TOKEN,
				accessToken: accessToken,
			},
		})

		return await transporter.sendMail({
			from: '"VHaLo_020_08_" <lvh082000@gmail.com>', // sender address
			to,
			subject,
			html,
		})
	} catch (error) {
		logger.error('Send mail failed', error)
	}
}
