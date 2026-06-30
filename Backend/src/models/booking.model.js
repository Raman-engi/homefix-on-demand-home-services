// models/Booking.js
// A booking record when user books a provider

const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema(
  {
    // Who made the booking
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // Which provider was booked
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Provider',
      required: true,
    },

    // What service was booked
    serviceName: {
      type: String,
      required: true,
    },

    // Booking date (just the date, not time)
    bookingDate: {
      type: Date,
      required: true,
    },

    // Time slot e.g. "10:00 AM"
    timeSlot: {
      type: String,
      required: true,
    },

    // What problem the user described
    issueDescription: {
      type: String,
      default: '',
    },

    // Address where service will happen
    address: {
      flat: String,
      area: String,
      city: String,
      pincode: String,
    },

    // Payment info
    payment: {
      method: {
        type: String,
        enum: ['UPI', 'Card', 'Cash'],
        default: 'Cash',
      },
      status: {
        type: String,
        enum: ['pending', 'paid', 'refunded'],
        default: 'pending',
      },
      amount: {
        type: Number,
        required: true,
      },

      platformFee: {
        type: Number,
        default: 29,
      },
    },

    // Current status of booking
    status: {
      type: String,
      enum: [
        'new',
        'assigned',
        'accepted',
        'in_progress',
        'completed',
        'cancelled',
      ],
      default: 'new',
    },

    assignedProfessional: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Provider',
      default: null,
    },

    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    assignedAt: {
      type: Date,
      default: null,
    },

    acceptedAt: {
      type: Date,
      default: null,
    },

    completedAt: {
      type: Date,
      default: null,
    },

    // Review after job is done
    review: {
      rating: { type: Number, min: 1, max: 5 },
      comment: String,
      createdAt: Date,
    },

    // Unique booking ID shown to user
    bookingId: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
)

// Before saving, generate a booking ID
// Format: HF-2024-XXXXX (random 5 digit number)
bookingSchema.pre('save', function (next) {
  if (!this.bookingId) {
    const year = new Date().getFullYear()
    const random = Math.floor(10000 + Math.random() * 90000)
    this.bookingId = `HF-${year}-${random}`
  }
  next()
})

const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking
