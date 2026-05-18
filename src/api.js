// This is the base URL for all API calls
// When running locally it points to your local server
// When deployed it will point to your Render server
// We use an environment variable so it's easy to switch
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

// ── LISTINGS ──

// Fetch all available truck listings from the database
export async function getListings() {
  const res = await fetch(`${BASE_URL}/listings`)
  return res.json()
}

// Post a new truck listing to the database
export async function createListing(data) {
  const res = await fetch(`${BASE_URL}/listings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

// ── BOOKINGS ──

// Fetch all bookings for a specific account
export async function getBookings(accountId) {
  const res = await fetch(`${BASE_URL}/bookings/${accountId}`)
  return res.json()
}

// Post a new booking to the database
export async function createBooking(data) {
  const res = await fetch(`${BASE_URL}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}