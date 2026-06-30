// routes/bookingRoutes.js
const express = require('express')
const router = express.Router()

const {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
} = require('../controllers/booking.controller')

const { protect } = require('../middlewares/auth.middleware')

// All booking routes need user to be logged in
// protect runs before every route handler below

// POST /api/bookings
router.post('/', protect, createBooking)

// GET /api/bookings/my
router.get('/my', protect, getMyBookings)

// GET /api/bookings/:id
router.get('/:id', protect, getBookingById)

// PATCH /api/bookings/:id/cancel
router.patch('/:id/cancel', protect, cancelBooking)

module.exports = router
