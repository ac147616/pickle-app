// better-sqlite3 lets you create and query a SQLite database
const Database = require('better-sqlite3')

// Creates a pickle.db file in the server folder
// If it already exists it just opens it
const db = new Database('pickle.db')

// ── CREATE TABLES ──
// This runs every time the server starts
// IF NOT EXISTS means it won't overwrite existing data

// Listings table — stores truck space posted by operators
db.exec(`
  CREATE TABLE IF NOT EXISTS listings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company TEXT NOT NULL,
    route TEXT NOT NULL,
    date TEXT NOT NULL,
    departure TEXT NOT NULL,
    truckType TEXT NOT NULL,
    licencePlate TEXT NOT NULL,
    space REAL NOT NULL,
    tempType TEXT NOT NULL,
    price REAL NOT NULL,
    createdAt TEXT DEFAULT (datetime('now'))
  )
`)

// Bookings table — stores bookings made by businesses
db.exec(`
  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    accountId TEXT NOT NULL,
    company TEXT NOT NULL,
    route TEXT NOT NULL,
    date TEXT NOT NULL,
    departure TEXT NOT NULL,
    arrival TEXT NOT NULL,
    truckType TEXT NOT NULL,
    tempType TEXT NOT NULL,
    finalPrice REAL NOT NULL,
    status TEXT DEFAULT 'active',
    createdAt TEXT DEFAULT (datetime('now'))
  )
`)

// Export the db so other files can use it
module.exports = db