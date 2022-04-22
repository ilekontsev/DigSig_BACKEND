const router = require('express').Router()
const bookingController = require('../controllers/bookingController')



router.post('/booking/add', bookingController.create)
router.get('/booking/active', bookingController.getAllActiveBookings)
router.post('/booking/delete', bookingController.deleteBooking)
router.post('/booking/edit', bookingController.editBooking)

module.exports = router
