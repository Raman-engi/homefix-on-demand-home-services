const express = require("express");

const router = express.Router();

const {
  getMyJobs,
  acceptJob,
  startJob,
  completeJob,
} = require("../controllers/professional.controller");

const { protect } = require("../middlewares/auth.middleware");

// Get all assigned jobs
router.get(
  "/jobs",
  protect,
  getMyJobs
);

// Accept Job
router.patch(
  "/jobs/:id/accept",
  protect,
  acceptJob
);

// Start Work
router.patch(
  "/jobs/:id/start",
  protect,
  startJob
);

// Complete Work
router.patch(
  "/jobs/:id/complete",
  protect,
  completeJob
);

module.exports = router;