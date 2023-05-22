import { sendEmail } from './send-email.js'

export const sendResetPasswordEmail = async ({ name, email, token, origin }) => {
	const message = `<p>Token to reset password: <h3>${token}</h3>. 
	Expiration time is 5 minutes</p>`

	return sendEmail({
		to: email,
		subject: 'Reset Password',
		html: `<h4>Hello, ${name}</h4>
     ${message}
     `,
	})
}
