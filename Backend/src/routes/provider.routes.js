// routes/providerRoutes.js
const express = require('express')
const router = express.Router()

const {
  getAllProviders,
  getProviderById,
} = require('../controllers/provider.controller')

// GET /api/providers
router.get('/', getAllProviders)

// GET /api/providers/:id
router.get('/:id', getProviderById)

module.exports = router
