const router = require('express').Router()
const sendMailController = require('../controllers/sendMailController')

router.get('/sendMailCode/:email', sendMailController.sendMailCode)
router.post('/users/verify', sendMailController.verifyCode)


module.exports = router