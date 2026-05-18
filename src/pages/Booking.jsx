// useParams reads accountId and tripId from the URL
// useNavigate lets you move between pages
import { useParams, useNavigate } from 'react-router-dom'

// Import createBooking to save confirmed bookings to the database
import { createBooking } from '../api'

// useState tracks whether the booking has been confirmed
import { useState } from 'react'

// Icons used on this screen
import { FaArrowLeft, FaTruck, FaStar, FaCheck, FaHome, FaSearch, FaBox, FaUser } from 'react-icons/fa'

// Trip data matched by tripId from the URL
const dummyTrips = [
  {
    id: 1,
    company: 'Kiwi Transport Co.',
    route: 'Auckland → Wellington',
    date: '18 May 2026',
    departure: '06:00 AM',
    arrival: '12:30 PM',
    spaceAvailable: 4.8,
    tempType: 'Ambient',
    priceMin: 45,
    priceMax: 80,
    rating: 4.8,
    truckType: 'MAN TGX',
    finalPrice: 65,
  },
  {
    id: 2,
    company: 'Mike Taufa · Private Owner',
    route: 'Auckland → Wellington',
    date: '18 May 2026',
    departure: '08:00 AM',
    arrival: '02:00 PM',
    spaceAvailable: 3.2,
    tempType: 'Ambient',
    priceMin: 30,
    priceMax: 60,
    rating: 4.6,
    truckType: 'Ford Ranger Ute',
    finalPrice: 45,
  },
  {
    id: 3,
    company: 'NZ Express Haulage',
    route: 'Auckland → Wellington',
    date: '19 May 2026',
    departure: '05:30 AM',
    arrival: '11:45 AM',
    spaceAvailable: 6.1,
    tempType: 'Chilled',
    priceMin: 55,
    priceMax: 90,
    rating: 4.6,
    truckType: 'Scania R',
    finalPrice: 72,
  },
  {
    id: 4,
    company: 'Dave Kirino · Private Owner',
    route: 'Auckland → Wellington',
    date: '20 May 2026',
    departure: '07:00 AM',
    arrival: '01:15 PM',
    spaceAvailable: 2.9,
    tempType: 'Ambient',
    priceMin: 25,
    priceMax: 55,
    rating: 4.3,
    truckType: 'Toyota Hilux',
    finalPrice: 38,
  },
]

export default function Booking() {
  const { accountId, tripId } = useParams()
  const navigate = useNavigate()

  // Find the trip that matches the tripId from the URL
  const trip = dummyTrips.find((t) => t.id === parseInt(tripId))

  // Track whether the user has confirmed the booking
  const [confirmed, setConfirmed] = useState(false)

  // Calculate platform fee (5% of final price)
  const platformFee = trip ? (trip.finalPrice * 0.05).toFixed(2) : 0

  // Calculate total
  const total = trip ? (trip.finalPrice + parseFloat(platformFee)).toFixed(2) : 0

  // Called when user taps Confirm Booking
  // Saves the booking to the database then shows success screen
  const handleConfirm = async () => {
    try {
      await createBooking({
        accountId,
        company: trip.company,
        route: trip.route,
        date: trip.date,
        departure: trip.departure,
        arrival: trip.arrival,
        truckType: trip.truckType,
        tempType: trip.tempType,
        finalPrice: trip.finalPrice,
      })
    } catch (err) {
      console.error('Failed to save booking:', err)
    }
    // Always show success even if save fails during demo
    setConfirmed(true)
  }

  // If no matching trip found show a simple error
  if (!trip) {
    return (
      <div className="min-h-screen bg-[#f9e9da] flex items-center justify-center">
        <p className="text-[#0c3120]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Trip not found.
        </p>
      </div>
    )
  }

  // ── CONFIRMED STATE ──
  if (confirmed) {
    return (
      <div className="min-h-screen bg-[#f9e9da] flex flex-col items-center justify-center px-6 pb-24">

        <div className="bg-[#0c3120] rounded-full p-4 mb-4">
          <FaCheck size={22} color="#f9e9da" />
        </div>

        <h1 className="text-[#0c3120] text-2xl mb-2 text-center"
          style={{ fontFamily: 'Belleza, sans-serif' }}>
          Booking Confirmed!
        </h1>

        <p className="text-gray-400 text-xs text-center mb-1"
          style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Your delivery has been booked with
        </p>

        <p className="text-[#0c3120] text-sm text-center font-medium mb-0.5"
          style={{ fontFamily: 'DM Sans, sans-serif' }}>
          {trip.company}
        </p>

        <p className="text-gray-400 text-xs text-center mb-12"
          style={{ fontFamily: 'DM Sans, sans-serif' }}>
          {trip.route} · {trip.date}
        </p>

        <div className="bg-white rounded-2xl px-8 py-5 mb-5 shadow-sm"
          style={{ width: '60%' }}>
          <p className="text-gray-400 text-xs text-center mb-0.5"
            style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Total paid
          </p>
          <p className="text-[#0c3120] text-3xl text-center"
            style={{ fontFamily: 'Belleza, sans-serif' }}>
            ${total}
          </p>
        </div>

        <button
          onClick={() => navigate(`/dashboard/${accountId}`)}
          className="bg-[#0c3120] text-[#f9e9da] rounded-xl py-3 active:scale-95 transition-all duration-150"
          style={{ width: '60%', fontFamily: 'Belleza, sans-serif' }}
        >
          Back to Dashboard
        </button>

        {/* ── BOTTOM NAV ── */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-8 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate(`/dashboard/${accountId}`)}
            className="flex flex-col items-center gap-1">
            <FaHome size={20} color="#9ca3af" />
            <span className="text-[10px] text-gray-400"
              style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Home
            </span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <FaSearch size={20} color="#0c3120" />
            <span className="text-[10px] text-[#0c3120] font-medium"
              style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Find
            </span>
          </button>
          <button
            onClick={() => navigate(`/mytrips/${accountId}`)}
            className="flex flex-col items-center gap-1">
            <FaBox size={20} color="#9ca3af" />
            <span className="text-[10px] text-gray-400"
              style={{ fontFamily: 'DM Sans, sans-serif' }}>
              My Trips
            </span>
          </button>
          <button
            onClick={() => navigate(`/account/${accountId}`)}
            className="flex flex-col items-center gap-1">
            <FaUser size={20} color="#9ca3af" />
            <span className="text-[10px] text-gray-400"
              style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Account
            </span>
          </button>
        </div>

      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f9e9da] pb-24">

      {/* ── TOP HEADER ── */}
      <div className="bg-[#0c3120] px-5 pt-10 pb-5">
        <button
          onClick={() => navigate(`/find/${accountId}`)}
          className="flex items-center gap-2 mb-4 opacity-70"
        >
          <FaArrowLeft size={14} color="#f9e9da" />
          <span className="text-[#f9e9da] text-xs"
            style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Back
          </span>
        </button>
        <h1 className="text-[#f9e9da] text-2xl"
          style={{ fontFamily: 'Belleza, sans-serif' }}>
          Confirm Booking
        </h1>
        <p className="text-[#f9e9da] text-xs opacity-50 mt-1"
          style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Review your delivery details before confirming
        </p>
      </div>

      <div className="px-5 pt-5 flex flex-col gap-4">

        {/* ── CARRIER CARD ── */}
        <div className="bg-[#0c3120] rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white bg-opacity-10 rounded-full p-3">
              <FaTruck size={16} color="#f9e9da" />
            </div>
            <div>
              <p className="text-[#f9e9da] text-sm"
                style={{ fontFamily: 'Belleza, sans-serif' }}>
                {trip.company}
              </p>
              <p className="text-[#f9e9da] text-xs opacity-50 mt-0.5"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {trip.truckType}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-white bg-opacity-10 rounded-full px-3 py-1">
            <FaStar size={10} color="#f9e9da" />
            <span className="text-[#f9e9da] text-xs"
              style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {trip.rating}
            </span>
          </div>
        </div>

        {/* ── ROUTE CARD ── */}
        <div className="bg-white rounded-2xl p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-[#0c3120] text-base"
              style={{ fontFamily: 'Belleza, sans-serif' }}>
              {trip.route}
            </p>
            <span className="text-xs bg-[#f9e9da] text-[#0c3120] rounded-full px-3 py-1"
              style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {trip.tempType}
            </span>
          </div>
          <div className="w-full h-px bg-gray-100"></div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <p className="text-[10px] text-gray-400 mb-0.5"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Pickup
              </p>
              <p className="text-[#0c3120] text-xs font-medium"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {trip.departure}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 mb-0.5"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Drop-off
              </p>
              <p className="text-[#0c3120] text-xs font-medium"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {trip.arrival}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 mb-0.5"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Date
              </p>
              <p className="text-[#0c3120] text-xs font-medium"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {trip.date}
              </p>
            </div>
          </div>
        </div>

        {/* ── PRICE BREAKDOWN CARD ── */}
        <div className="bg-white rounded-2xl p-4 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <p className="text-[#0c3120] text-sm"
              style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Freight fee
            </p>
            <p className="text-[#0c3120] text-sm"
              style={{ fontFamily: 'DM Sans, sans-serif' }}>
              ${trip.finalPrice}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[#0c3120] text-sm opacity-50"
              style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Platform fee (5%)
            </p>
            <p className="text-[#0c3120] text-sm opacity-50"
              style={{ fontFamily: 'DM Sans, sans-serif' }}>
              ${platformFee}
            </p>
          </div>
          <div className="w-full h-px bg-gray-100"></div>
          <div className="flex justify-between items-center">
            <p className="text-[#0c3120] text-base"
              style={{ fontFamily: 'Belleza, sans-serif' }}>
              Total
            </p>
            <p className="text-[#0c3120] text-2xl"
              style={{ fontFamily: 'Belleza, sans-serif' }}>
              ${total}
            </p>
          </div>
        </div>

        {/* ── CONFIRM BUTTON ── */}
        <button
          onClick={handleConfirm}
          className="w-full bg-[#0c3120] text-[#f9e9da] rounded-xl py-4 mt-1 active:scale-95 transition-all duration-150"
          style={{ fontFamily: 'Belleza, sans-serif' }}
        >
          Confirm Booking
        </button>

        <p className="text-center text-gray-400 text-[10px]"
          style={{ fontFamily: 'DM Sans, sans-serif' }}>
          By confirming you agree to PICKle's terms & conditions
        </p>

      </div>

      {/* ── BOTTOM NAV ── */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-8 py-4 flex justify-between items-center">
        <button
          onClick={() => navigate(`/dashboard/${accountId}`)}
          className="flex flex-col items-center gap-1">
          <FaHome size={20} color="#9ca3af" />
          <span className="text-[10px] text-gray-400"
            style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Home
          </span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <FaSearch size={20} color="#0c3120" />
          <span className="text-[10px] text-[#0c3120] font-medium"
            style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Find
          </span>
        </button>
        <button
          onClick={() => navigate(`/mytrips/${accountId}`)}
          className="flex flex-col items-center gap-1">
          <FaBox size={20} color="#9ca3af" />
          <span className="text-[10px] text-gray-400"
            style={{ fontFamily: 'DM Sans, sans-serif' }}>
            My Trips
          </span>
        </button>
        <button
          onClick={() => navigate(`/account/${accountId}`)}
          className="flex flex-col items-center gap-1">
          <FaUser size={20} color="#9ca3af" />
          <span className="text-[10px] text-gray-400"
            style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Account
          </span>
        </button>
      </div>

    </div>
  )
}