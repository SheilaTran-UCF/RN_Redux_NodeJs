import express from 'express'
import passport from 'passport'
import {
	forgotPassword,
	login,
	logout,
	register,
	resetPassword,
	verifyEmail,
} from '../controllers/auth-controller.js'
import { auth } from '../middleware/index.js'

const router = express.Router()

router.post('/register', register)
router.get('/verify-email', verifyEmail)
router.post('/login', login)
router.delete('/logout', auth, logout)
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/google/callback', passport.authenticate('google'), login)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)

export default router
