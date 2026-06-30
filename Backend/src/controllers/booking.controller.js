// controllers/bookingController.js
// Create and manage bookings

const asyncHandler = require('express-async-handler')
const Booking = require('../models/booking.model')
const { sendSuccess, sendError } = require('../utils/apiResponse')

// POST /api/bookings
// Create a new booking
const createBooking = asyncHandler(async (req, res) => {
  const {
    provider,
    serviceName,
    bookingDate,
    timeSlot,
    issueDescription,
    address,
    payment,
  } = req.body

  // Basic validation
  if (
    !provider ||
    !serviceName ||
    !bookingDate ||
    !timeSlot ||
    !address ||
    !payment
  ) {
    return sendError(res, 400, "Please fill in all required fields");
  }

  // Create the booking
  const booking = await Booking.create({
    user: req.user._id,

    provider,

    serviceName,

    bookingDate,

    timeSlot,

    issueDescription,

    address,

    payment,

    status: "new",
  });

  console.log('New booking created:', booking.bookingId)

  sendSuccess(res, 201, 'Booking confirmed!', { booking })
})

// GET /api/bookings/my
// Get all bookings for logged in user
const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate('provider', 'trade pricePerHour')
    .sort({ createdAt: -1 })  // newest first

  sendSuccess(res, 200, 'Bookings fetched', { bookings })
})

// GET /api/bookings/:id
// Get one booking by ID
const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate('user', 'name mobile')
    .populate('provider', 'trade city pricePerHour')

  if (!booking) {
    return sendError(res, 404, 'Booking not found')
  }

  // Make sure user can only see their own booking
  if (booking.user._id.toString() !== req.user._id.toString() 
      && req.user.role !== 'admin') {
    return sendError(res, 403, 'Not authorized to view this booking')
  }

  sendSuccess(res, 200, 'Booking fetched', { booking })
})

// PATCH /api/bookings/:id/cancel
// Cancel a booking
const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)

  if (!booking) {
    return sendError(res, 404, 'Booking not found')
  }

  // Only the user who made the booking can cancel it
  if (booking.user.toString() !== req.user._id.toString()) {
    return sendError(res, 403, 'Not authorized to cancel this booking')
  }

  // Can't cancel if already completed
  if (booking.status === 'completed') {
    return sendError(res, 400, 'Cannot cancel a completed booking')
  }

  booking.status = 'cancelled'
  await booking.save()

  sendSuccess(res, 200, 'Booking cancelled', { booking })
})

module.exports = {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
}
