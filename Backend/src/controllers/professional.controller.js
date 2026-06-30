const Booking = require("../models/booking.model");
const Provider = require("../models/provider.model");

// ===========================================
// Get all jobs assigned to logged in professional
// GET /api/professional/jobs
// ===========================================
const getMyJobs = async (req, res) => {
  try {
    // Find provider profile using logged in user
    const provider = await Provider.findOne({
      user: req.user._id,
    });

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Professional profile not found",
      });
    }

    const jobs = await Booking.find({
      assignedProfessional: provider._id,
    })
      .populate("user", "name mobile email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===========================================
// Accept Job
// PATCH /api/professional/jobs/:id/accept
// ===========================================
const acceptJob = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    booking.status = "accepted";
    booking.acceptedAt = new Date();

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Job accepted successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===========================================
// Start Job
// PATCH /api/professional/jobs/:id/start
// ===========================================
const startJob = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    booking.status = "in_progress";

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Work started",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===========================================
// Complete Job
// PATCH /api/professional/jobs/:id/complete
// ===========================================
const completeJob = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    booking.status = "completed";
    booking.completedAt = new Date();

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Job completed successfully",
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
  getMyJobs,
  acceptJob,
  startJob,
  completeJob,
};