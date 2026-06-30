// controllers/authController.js
// Handles login and signup logic

const asyncHandler = require('express-async-handler')
const User = require('../models/user.model')
const generateToken = require('../utils/generateToken')
const { sendSuccess, sendError } = require('../utils/apiResponse')

const OTP = require("../models/otp.model");
const sendEmail = require("../utils/sendEmail");

// ── SIGNUP ───────────────────────────────────────────
// POST /api/auth/signup
const signup = asyncHandler(async (req, res) => {
  console.log('Signup attempt:', req.body.email)

  const {
    name,
    email,
    password,
  } = req.body;

  // Check all fields are provided
  if (!name || !email || !password) {
    return sendError(res, 400, "Please fill in all fields");
  }

  // Check if email already registered
  const emailExists = await User.findOne({ email })
  if (emailExists) {
    return sendError(res, 400, 'Email already registered')
  }

  // Create new user in database
  // Password gets hashed automatically (see User model)
  const otpData = await OTP.findOne({
    email,
    verified: true,
  });

  if (!otpData) {
    return sendError(res, 400, "Please verify your email first");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  await OTP.deleteMany({ email });

  console.log('New user created:', user._id)

  // Send back user data + token
  sendSuccess(res, 201, 'Account created successfully!', {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  })
})

// ── LOGIN ────────────────────────────────────────────
// POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  console.log('Login attempt:', req.body.email)

  const { email, password } = req.body

  if (!email || !password) {
    return sendError(res, 400, 'Please enter email and password')
  }

  // Find user by email, include password for comparison
  const user = await User.findOne({ email }).select('+password')

  // Check user exists AND password matches
  if (!user || !(await user.matchPassword(password))) {
    return sendError(res, 401, 'Invalid email or password')
  }

  // Check account is active
  if (!user.isActive) {
    return sendError(res, 403, 'Your account has been deactivated')
  }

  console.log('Login successful:', user._id)

  sendSuccess(res, 200, 'Login successful!', {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  })
})

// ── GET CURRENT USER ─────────────────────────────────
// GET /api/auth/me (protected route)
const getMe = asyncHandler(async (req, res) => {
  // req.user is set by authMiddleware
  const user = await User.findById(req.user._id)

  sendSuccess(res, 200, 'User fetched', {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    walletBalance: user.walletBalance,
    addresses: user.addresses,
  })
})

// ── SEND EMAIL OTP ────────────────────────────

// POST /api/auth/send-otp
const sendOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return sendError(res, 400, "Email is required");
  }

  // Generate 6 digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // OTP expires in 5 minutes
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  // Delete previous OTP for this email
  await OTP.deleteMany({ email });

  // Save new OTP
  await OTP.create({
    email,
    otp,
    expiresAt,
  });

  // Send Email
  await sendEmail(
    email,
    "HomeFix Email Verification",
    `
      <h2>HomeFix Verification</h2>
      <p>Your OTP is:</p>

      <h1 style="letter-spacing:5px;">
        ${otp}
      </h1>

      <p>This OTP is valid for 5 minutes.</p>

      <br/>

      <p>Do not share this OTP with anyone.</p>
    `
  );

  sendSuccess(res, 200, "OTP sent successfully");
});

  // ── VERIFY EMAIL OTP ───────────────────────────────
const verifyOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return sendError(res, 400, "Email and OTP are required");
  }

  const otpData = await OTP.findOne({ email });

  if (!otpData) {
    return sendError(res, 404, "OTP not found");
  }

  if (otpData.expiresAt < new Date()) {
    await OTP.deleteOne({ _id: otpData._id });
    return sendError(res, 400, "OTP has expired");
  }

  if (otpData.otp !== otp) {
    return sendError(res, 400, "Invalid OTP");
  }

  otpData.verified = true;
  await otpData.save();

  sendSuccess(res, 200, "OTP verified successfully");
});

module.exports = {
  signup,
  login,
  getMe,
  sendOTP,
  verifyOTP,
};