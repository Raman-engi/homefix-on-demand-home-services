
// config/db.js
// This file connects our app to MongoDB database

const mongoose = require('mongoose')

// Function to connect MongoDB
const connectDB = async () => {
  try {

    // Connect MongoDB using .env variable
    const conn = await mongoose.connect(process.env.MONGODB_URI)

    // Success message
    console.log(`✅ MongoDB connected: ${conn.connection.host}`)

  } catch (error) {

    // Error message
    console.log(`❌ MongoDB connection failed: ${error.message}`)

    // Stop server if DB connection fails
    process.exit(1)
  }
}

// Export function
module.exports = connectDB
