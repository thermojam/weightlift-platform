const express = require('express')

const router = express.Router({ mergeParams: true })

router.use('/auth', require('./auth'))
router.use('/posts', require('./post'))
router.use('/users', require('./user'))
router.use('/feedback', require('./feedback'))

module.exports = router
