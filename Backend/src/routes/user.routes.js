const express = require('express')
const router = express.Router()
const { protect } = require('../middlewares/auth.middleware')
const { isAdmin } = require('../middlewares/role.middleware')
const {
  getUserProfile,
  updateUserProfile,
  getUsers,
} = require('../controllers/user.controller')

// Routes
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

router.route('/')
  .get(protect, isAdmin, getUsers)

module.exports = router
