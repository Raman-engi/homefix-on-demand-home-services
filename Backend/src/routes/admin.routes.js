const express = require("express");

const router = express.Router();

const {
  getAllBookings,
  assignBooking,
} = require("../controllers/admin.controller");

const { protect } = require("../middlewares/auth.middleware");
const { adminOnly } = require("../middlewares/admin.middleware");

// Get all bookings (Admin only)
router.get(
  "/bookings",
  protect,
  adminOnly,
  getAllBookings
);

// Assign Professional
router.patch(
  "/bookings/:id/assign",
  protect,
  adminOnly,
  assignBooking
);

module.exports = router;