import express from 'express'

const router = express.Router()

// add contact
router.post('/add', () => {})

// cancel request add contact
router.patch('/cancel', () => {})

// accept request add contact
router.patch('/accept', () => {})

// refuse request add contact
router.patch('/refuse', () => {})

// remove contact 
router.patch('/remove', () => {})

// searcher user
router.get('/search', () => {})

export default router
