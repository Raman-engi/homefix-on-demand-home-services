require('dotenv').config()
const app = require('./app')
const connectDB = require('./config/db')

// Connect to MongoDB database
connectDB()

// ── START SERVER ─────────────────────────────────────
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log('─────────────────────────────────')
  console.log(`✅ Server running on port ${PORT}`)
  console.log(`🌍 Mode: ${process.env.NODE_ENV}`)
  console.log(`🔗 URL: http://localhost:${PORT}`)
  console.log('─────────────────────────────────')
})

const seedServices = async () => {
  const Service = require('./models/service.model')
  const count = await Service.countDocuments()
  
  if (count === 0) {
    await Service.insertMany([
      { name: 'Electrician', icon: '⚡', startingPrice: 299, category: 'electrical' },
      { name: 'Plumber', icon: '🔧', startingPrice: 249, category: 'plumbing' },
      { name: 'AC Service', icon: '❄️', startingPrice: 499, category: 'ac' },
      { name: 'Painter', icon: '🖌️', startingPrice: 199, category: 'painting' },
      { name: 'Deep Cleaning', icon: '🧹', startingPrice: 1499, category: 'cleaning' },
      { name: 'Appliance Repair', icon: '📺', startingPrice: 349, category: 'appliance' },
      { name: 'Carpenter', icon: '🪵', startingPrice: 499, category: 'carpentry' },
      { name: 'Bathroom Fitter', icon: '🚿', startingPrice: 399, category: 'other' },
    ])
    console.log('✅ Services seeded successfully')
  }
}

seedServices()
