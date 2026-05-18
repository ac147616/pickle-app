// Express is the web framework that handles API requests
const express = require('express')

// cors allows the frontend to talk to this backend
// without getting blocked by the browser
const cors = require('cors')

// Import the database connection
const db = require('./database')

const app = express()

// Allow requests from any origin (needed for frontend to talk to backend)
app.use(cors())

// Parse incoming JSON request bodies
app.use(express.json())

// ── LISTINGS ROUTES ──

// GET /listings — returns all truck listings
// The frontend calls this to show available trips
app.get('/listings', (req, res) => {
  const listings = db.prepare('SELECT * FROM listings ORDER BY createdAt DESC').all()
  res.json(listings)
})

// POST /listings — creates a new truck listing
// Called when a truck operator submits the List Space form
app.post('/listings', (req, res) => {
  const { company, route, date, departure, truckType, licencePlate, space, tempType, price } = req.body

  const result = db.prepare(`
    INSERT INTO listings (company, route, date, departure, truckType, licencePlate, space, tempType, price)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(company, route, date, departure, truckType, licencePlate, space, tempType, price)

  res.json({ id: result.lastInsertRowid, message: 'Listing created' })
})

// ── BOOKINGS ROUTES ──

// GET /bookings/:accountId — returns bookings for a specific account
// Called when loading My Trips for a user
app.get('/bookings/:accountId', (req, res) => {
  const bookings = db.prepare(
    'SELECT * FROM bookings WHERE accountId = ? ORDER BY createdAt DESC'
  ).all(req.params.accountId)
  res.json(bookings)
})

// POST /bookings — creates a new booking
// Called when a user confirms a booking
app.post('/bookings', (req, res) => {
  const { accountId, company, route, date, departure, arrival, truckType, tempType, finalPrice } = req.body

  const result = db.prepare(`
    INSERT INTO bookings (accountId, company, route, date, departure, arrival, truckType, tempType, finalPrice)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(accountId, company, route, date, departure, arrival, truckType, tempType, finalPrice)

  res.json({ id: result.lastInsertRowid, message: 'Booking created' })
})

// ── HEALTH CHECK ──
// Uptime Robot pings this to keep the server awake
app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

// Start the server on port 3001
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`PICKle server running on port ${PORT}`)
})