import express from 'express'
import { createWork, deleteWork, getWorks, updateWork } from '../controllers/work-controller.js'

const router = express.Router()

router.post('/create', createWork)
router.delete('/delete/:id', deleteWork)
router.patch('/update', updateWork)
router.get('/list', getWorks)

export default router
