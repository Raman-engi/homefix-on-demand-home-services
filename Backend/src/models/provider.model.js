// models/Provider.js
// Professional/tradesperson profile
// Linked to User model (every provider is also a user)

const mongoose = require('mongoose')

const providerSchema = new mongoose.Schema(
  {
    // Link to User model
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',         // references User collection
      required: true,
      unique: true,        // one provider profile per user
    },

    // What they do
    trade: {
      type: String,
      required: [true, 'Please specify your trade'],
      enum: [
        "Electrician",
        "Plumber",
        "AC Service",
        "Painter",
        "Carpenter",
        "Deep Cleaning",
        "Appliance Repair",
        "Bathroom Repair",
      ],
    },

    // Skills list e.g. ['Fan Installation', 'Wiring']
    skills: [String],

    // Years of work experience
    experience: {
      type: Number,
      default: 0,
    },

    // Which city they work in
    city: {
      type: String,
      required: true,
    },

    // Price per hour in rupees
    pricePerHour: {
      type: Number,
      required: [true, 'Please enter your hourly rate'],
    },

    // Fixed price services they offer
    priceMenu: [
      {
        serviceName: String,
        description: String,
        price: Number,
      },
    ],

    // Their rating (calculated from reviews)
    rating: {
      type: Number,
      default: 0,
    },

    // Total number of reviews
    totalReviews: {
      type: Number,
      default: 0,
    },

    // Total jobs completed
    totalJobs: {
      type: Number,
      default: 0,
    },

    // Percentage of jobs completed on time
    onTimePercent: {
      type: Number,
      default: 100,
    },

    // Verification badges
    verification: {
      aadhaar: { type: Boolean, default: false },
      skillTest: { type: Boolean, default: false },
      backgroundCheck: { type: Boolean, default: false },
      homefixCertified: { type: Boolean, default: false },
    },

    // Is this provider approved by admin?
    isApproved: {
      type: Boolean,
      default: false,
    },

    // Is provider currently available?
    isAvailable: {
      type: Boolean,
      default: true,
    },

    // Bio / about section
    bio: {
      type: String,
      default: '',
    },

    // Contact Information
    phone: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },

    // Profile Photo
    profileImage: {
      type: String,
      default: "",
    },

    // Languages
    languages: {
      type: [String],
      default: ["Hindi"],
    },

    // Average Response Time
    responseTime: {
      type: String,
      default: "15 mins",
    },

    // Service Radius (KM)
    serviceRadius: {
      type: Number,
      default: 20,
    },

    // Last Active
    lastActive: {
      type: String,
      default: "Online",
    },

    phone: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      default: "",
    },

    languages: {
      type: [String],
      default: ["Hindi"],
    },

    responseTime: {
      type: String,
      default: "15 mins",
    },

    serviceRadius: {
      type: Number,
      default: 20,
    },

    lastActive: {
      type: String,
      default: "Online",
    },
  },
  {
    timestamps: true,
  }
)

const Provider = mongoose.model('Provider', providerSchema)

module.exports = Provider
