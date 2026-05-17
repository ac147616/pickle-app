// useParams reads accountId and tripId from the URL
// useNavigate lets you move between pages
import { useParams, useNavigate } from 'react-router-dom'

// useState tracks whether the booking has been confirmed
import { useState } from 'react'

// Icons used on this screen
import { FaArrowLeft, FaTruck, FaStar, FaCheck } from 'react-icons/fa'

// Same trip data as FindSpace — in a real app this would come from the database
// Here you just find the right trip using the tripId from the URL
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
    // Final price shown on confirmation
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
  // parseInt converts the string from the URL to a number
  const trip = dummyTrips.find((t) => t.id === parseInt(tripId))

  // Track whether the user has confirmed the booking
  const [confirmed, setConfirmed] = useState(false)

  // Calculate platform fee (5% of final price)
  const platformFee = trip ? (trip.finalPrice * 0.05).toFixed(2) : 0

  // Calculate total
  const total = trip ? (trip.finalPrice + parseFloat(platformFee)).toFixed(2) : 0

  // If no matching trip found, show a simple error
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
  // Shows a success screen after the user taps Confirm Booking
  if (confirmed) {
    return (
      <div className="min-h-screen bg-[#f9e9da] flex flex-col items-center justify-center px-5">

        {/* Big green check circle */}
        <div className="bg-[#0c3120] rounded-full p-6 mb-6">
          <FaCheck size={32} color="#f9e9da" />
        </div>

        <h1 className="text-[#0c3120] text-2xl mb-2 text-center"
          style={{ fontFamily: 'Belleza, sans-serif' }}>
          Booking Confirmed!
        </h1>

        <p className="text-gray-400 text-sm text-center mb-2"
          style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Your delivery has been booked with
        </p>

        <p className="text-[#0c3120] text-sm font-medium text-center mb-1"
          style={{ fontFamily: 'DM Sans, sans-serif' }}>
          {trip.company}
        </p>

        <p className="text-gray-400 text-sm text-center mb-8"
          style={{ fontFamily: 'DM Sans, sans-serif' }}>
          {trip.route} · {trip.date}
        </p>

        {/* Total paid */}
        <div className="bg-white rounded-2xl px-6 py-4 mb-8 w-full max-w-sm text-center shadow-sm">
          <p className="text-gray-400 text-xs mb-1"
            style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Total paid
          </p>
          <p className="text-[#0c3120] text-3xl"
            style={{ fontFamily: 'Belleza, sans-serif' }}>
            ${total}
          </p>
        </div>

        {/* Back to dashboard button */}
        <button
          onClick={() => navigate(`/dashboard/${accountId}`)}
          className="w-full max-w-sm bg-[#0c3120] text-[#f9e9da] rounded-xl py-3 active:scale-95 transition-all duration-150"
          style={{ fontFamily: 'Belleza, sans-serif' }}
        >
          Back to Dashboard
        </button>

      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f9e9da] pb-24">

      {/* ── TOP HEADER ── */}
      <div className="bg-[#0c3120] px-5 pt-10 pb-5">

        {/* Back button */}
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

        {/* ── DELIVERY SUMMARY CARD ── */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">

          <p className="text-[#0c3120] text-xs opacity-50 mb-3"
            style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Delivery summary
          </p>

          {/* Company name and rating */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="bg-[#f9e9da] rounded-full p-2">
                <FaTruck size={12} color="#0c3120" />
              </div>
              <p className="text-[#0c3120] text-sm font-medium"
                style={{ fontFamily: 'Belleza, sans-serif' }}>
                {trip.company}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <FaStar size={10} color="#f59e0b" />
              <span className="text-xs text-gray-400">{trip.rating}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gray-100 mb-3"></div>

          {/* Trip details grid */}
          <div className="grid grid-cols-2 gap-y-3">

            <div>
              <p className="text-gray-400 text-[10px]"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Route
              </p>
              <p className="text-[#0c3120] text-xs font-medium mt-0.5"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {trip.route}
              </p>
            </div>

            <div>
              <p className="text-gray-400 text-[10px]"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Date
              </p>
              <p className="text-[#0c3120] text-xs font-medium mt-0.5"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {trip.date}
              </p>
            </div>

            <div>
              <p className="text-gray-400 text-[10px]"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Pickup
              </p>
              <p className="text-[#0c3120] text-xs font-medium mt-0.5"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {trip.departure}
              </p>
            </div>

            <div>
              <p className="text-gray-400 text-[10px]"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Drop-off
              </p>
              <p className="text-[#0c3120] text-xs font-medium mt-0.5"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {trip.arrival}
              </p>
            </div>

            <div>
              <p className="text-gray-400 text-[10px]"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Truck type
              </p>
              <p className="text-[#0c3120] text-xs font-medium mt-0.5"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {trip.truckType}
              </p>
            </div>

            <div>
              <p className="text-gray-400 text-[10px]"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Goods type
              </p>
              <p className="text-[#0c3120] text-xs font-medium mt-0.5"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {trip.tempType}
              </p>
            </div>

          </div>
        </div>

        {/* ── PRICE BREAKDOWN CARD ── */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">

          <p className="text-[#0c3120] text-xs opacity-50 mb-3"
            style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Price breakdown
          </p>

          {/* Freight fee row */}
          <div className="flex justify-between items-center mb-2">
            <p className="text-[#0c3120] text-sm"
              style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Freight fee
            </p>
            <p className="text-[#0c3120] text-sm"
              style={{ fontFamily: 'DM Sans, sans-serif' }}>
              ${trip.finalPrice}
            </p>
          </div>

          {/* Platform fee row */}
          <div className="flex justify-between items-center mb-3">
            <p className="text-gray-400 text-sm"
              style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Platform fee (5%)
            </p>
            <p className="text-gray-400 text-sm"
              style={{ fontFamily: 'DM Sans, sans-serif' }}>
              ${platformFee}
            </p>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gray-100 mb-3"></div>

          {/* Total row */}
          <div className="flex justify-between items-center">
            <p className="text-[#0c3120] text-base"
              style={{ fontFamily: 'Belleza, sans-serif' }}>
              Total
            </p>
            <p className="text-[#0c3120] text-xl"
              style={{ fontFamily: 'Belleza, sans-serif' }}>
              ${total}
            </p>
          </div>
        </div>

        {/* ── CONFIRM BUTTON ── */}
        <button
          onClick={() => setConfirmed(true)}
          className="w-full bg-[#0c3120] text-[#f9e9da] rounded-xl py-4 active:scale-95 transition-all duration-150 shadow-sm"
          style={{ fontFamily: 'Belleza, sans-serif' }}
        >
          Confirm Booking
        </button>

        {/* Small terms note below button */}
        <p className="text-center text-gray-400 text-[10px]"
          style={{ fontFamily: 'DM Sans, sans-serif' }}>
          By confirming you agree to PICKle's terms & conditions
        </p>

      </div>
    </div>
  )
}