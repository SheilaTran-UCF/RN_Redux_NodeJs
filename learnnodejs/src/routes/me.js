import express from 'express'
import {
	changeAvatar,
	changePassword,
	changeProfile,
	getProfile,
	changeCoverAvatar,
} from '../controllers/me-controller.js'
import { auth, singleUploadMiddleware } from '../middleware/index.js'

const router = express.Router()

router.get('/profile', auth, getProfile)
router.patch('/change-profile', auth, changeProfile)
router.patch('/change-password', auth, changePassword)
router.patch('/avatar', auth, singleUploadMiddleware, changeAvatar)
router.patch('/cover-avatar', auth, singleUploadMiddleware, changeCoverAvatar)

export default router
