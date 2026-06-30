// routes/authRoutes.js
// URL paths for authentication

const express = require('express')
console.log("✅ AUTH ROUTES LOADED");
const router = express.Router()

const {
  signup,
  login,
  getMe,
  sendOTP,
  verifyOTP,
} = require('../controllers/auth.controller')
const { protect } = require('../middlewares/auth.middleware')

// POST /api/auth/signup
router.post('/signup', signup)

// POST /api/auth/login
// POST /api/auth/send-otp
router.post('/send-otp', sendOTP)

router.post('/verify-otp', verifyOTP)

router.post('/login', login)

// GET /api/auth/me (must be logged in)
router.get('/me', protect, getMe)

module.exports = router

router.get("/send-otp", (req, res) => {
  res.json({ message: "Send OTP route is working" });
});
