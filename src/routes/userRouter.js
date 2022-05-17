const router = require('express').Router()
const userController = require('../controllers/userController')
const logicSignKeysController = require('../controllers/logicSignKeysController')


router.post('/user', userController.login)
router.post('/users/refreshToken', userController.refreshTokens)
router.post('/createUser', userController.register)

module.exports = router
