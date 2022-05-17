const router = require('express').Router()
const logicSignKeysController = require('../controllers/logicSignKeysController')



router.post('/saveKey', logicSignKeysController.saveKeys)


module.exports = router