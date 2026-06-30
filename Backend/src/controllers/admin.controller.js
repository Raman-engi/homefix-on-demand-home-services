const Booking = require("../models/booking.model");
const Provider = require("../models/provider.model");

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email mobile")
      .populate("provider", "trade city")
      .populate("assignedProfessional");

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const assignBooking = async (req, res) => {
  try {
    const { providerId } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    const provider = await Provider.findById(providerId);

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider not found",
      });
    }

    // Prevent assigning again
    if (booking.status !== "new") {
      return res.status(400).json({
        success: false,
        message: "Booking is already assigned or completed",
      });
    }

    booking.assignedProfessional = provider._id;

    // Ye fields tumne model me add kiye hain
    booking.assignedBy = req.user._id;
    booking.assignedAt = new Date();

    booking.status = "assigned";

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Professional assigned successfully",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllBookings,
  assignBooking,
};