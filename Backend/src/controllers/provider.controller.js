// controllers/providerController.js
// Get providers, filter them, get one provider

const asyncHandler = require('express-async-handler')
const Provider = require('../models/provider.model')
const { sendSuccess, sendError } = require('../utils/apiResponse')

// GET /api/providers
// Get all approved providers (with optional filters)
const getAllProviders = asyncHandler(async (req, res) => {
  // Get filter values from URL query
  // Example: /api/providers?trade=Electrician&city=Ahmedabad
  const { trade, city, minRating } = req.query

  // Build filter object
  let filter = {}

  if (trade) {
    filter.trade = trade
  }

  if (city) {
    filter.city = { $regex: city, $options: "i" }
  }

  if (minRating) {
    filter.rating = { $gte: Number(minRating) }
  }

  // Get providers and include user name/avatar
  const providers = await Provider.find(filter)
    .populate('user', 'name avatar email mobile')  // get user details
    .sort({ rating: -1 })                   // highest rated first

  sendSuccess(res, 200, 'Providers fetched', { providers })
})

// GET /api/providers/:id
// Get one provider by ID
const getProviderById = asyncHandler(async (req, res) => {
  const provider = await Provider.findById(req.params.id)
    .populate('user', 'name avatar email mobile')

  if (!provider) {
    return sendError(res, 404, 'Provider not found')
  }

  sendSuccess(res, 200, 'Provider fetched', { provider })
})

module.exports = { getAllProviders, getProviderById }
