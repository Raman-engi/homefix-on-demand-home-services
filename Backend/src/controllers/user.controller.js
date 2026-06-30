const User = require('../models/user.model')
const { sendSuccess, sendError } = require('../utils/apiResponse')
const asyncHandler = require('express-async-handler')

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  sendSuccess(res, 200, 'Profile fetched', { user })
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (!user) {
    return sendError(res, 404, 'User not found')
  }

  // Update only provided fields
  user.name = req.body.name || user.name
  user.mobile = req.body.mobile || user.mobile
  if (req.body.password) {
    user.password = req.body.password
  }

  const updatedUser = await user.save()
  sendSuccess(res, 200, 'Profile updated', { user: updatedUser })
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  sendSuccess(res, 200, 'Users fetched', { users })
})

module.exports = {
  getUserProfile,
  updateUserProfile,
  getUsers,
}
