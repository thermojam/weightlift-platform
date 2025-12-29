const express = require('express')
const { getAiResponse } = require('../controllers/aiController');


const router = express.Router({ mergeParams: true })

router.use('/auth', require('./auth'))
router.use('/posts', require('./post'))
router.use('/users', require('./user'))
router.use('/feedback', require('./feedback'))
router.use('/tonnage', require('./tonnage'))
router.post('/ai', getAiResponse)

module.exports = router
