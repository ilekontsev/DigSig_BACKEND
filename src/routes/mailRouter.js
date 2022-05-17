const router = require('express').Router()
const sendMail = require('../controllers/sendMailController')

router.post('/sendMail', sendMail.sendMailCode)


module.exports = router