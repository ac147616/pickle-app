// useParams reads the accountId from the URL
// useNavigate lets you move between pages
import { useParams, useNavigate } from 'react-router-dom'

// useState lets you track what the user has typed into the form fields
import { useState } from 'react'

// Icons used on this screen
import { FaArrowLeft, FaStar, FaTruck, FaHome, FaSearch, FaBox, FaUser } from 'react-icons/fa'

// Dummy trip results that show after searching
// In a real app these would come from the database
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
    },
  ]

export default function FindSpace() {
  const { accountId } = useParams()
  const navigate = useNavigate()

  // Track whether the user has searched yet
  // Results only show after tapping Search
  const [hasSearched, setHasSearched] = useState(false)

  // Track the values of each form field
  const [pickup, setPickup] = useState('')
  const [dropoff, setDropoff] = useState('')
  const [date, setDate] = useState('')
  const [space, setSpace] = useState('')

  // Called when the user taps Search
  // Sets hasSearched to true which reveals the results
  const handleSearch = () => {
    setHasSearched(true)
  }

  return (
    <div className="min-h-screen bg-[#f9e9da] pb-24">

      {/* ── TOP HEADER ── */}
      <div className="bg-[#0c3120] px-5 pt-10 pb-5">

        {/* Back button row */}
        <button
          onClick={() => navigate(`/dashboard/${accountId}`)}
          className="flex items-center gap-2 mb-4 opacity-70 active:opacity-100"
        >
          <FaArrowLeft size={14} color="#f9e9da" />
          <span className="text-[#f9e9da] text-xs"
            style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Back
          </span>
        </button>

        {/* Screen title */}
        <h1 className="text-[#f9e9da] text-2xl"
          style={{ fontFamily: 'Belleza, sans-serif' }}>
          Find Delivery Space
        </h1>
        <p className="text-[#f9e9da] text-xs opacity-50 mt-1"
          style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Search available truck space on your route
        </p>
      </div>

      {/* ── SEARCH FORM ── */}
      <div className="px-5 pt-5">
        <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-3 mb-4">

          {/* Pickup location */}
          <div>
            <label className="text-[#0c3120] text-xs opacity-50 mb-1 block"
              style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Pickup location
            </label>
            <input
              type="text"
              placeholder="e.g. Auckland CBD"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="w-full bg-[#f9e9da] rounded-xl px-3 py-2.5 text-sm text-[#0c3120] outline-none"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            />
          </div>

          {/* Thin divider between fields */}
          <div className="w-full h-px bg-gray-100"></div>

          {/* Drop-off location */}
          <div>
            <label className="text-[#0c3120] text-xs opacity-50 mb-1 block"
              style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Drop-off location
            </label>
            <input
              type="text"
              placeholder="e.g. Wellington CBD"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              className="w-full bg-[#f9e9da] rounded-xl px-3 py-2.5 text-sm text-[#0c3120] outline-none"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            />
          </div>

          {/* Thin divider */}
          <div className="w-full h-px bg-gray-100"></div>

          {/* Date and space on the same row */}
          <div className="grid grid-cols-2 gap-3">

            {/* Date picker */}
            <div>
              <label className="text-[#0c3120] text-xs opacity-50 mb-1 block"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#f9e9da] rounded-xl px-3 py-2.5 text-xs text-[#0c3120] outline-none"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              />
            </div>

            {/* Space needed */}
            <div>
              <label className="text-[#0c3120] text-xs opacity-50 mb-1 block"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Space needed (m³)
              </label>
              <input
                type="number"
                placeholder="e.g. 2.5"
                value={space}
                onChange={(e) => setSpace(e.target.value)}
                className="w-full bg-[#f9e9da] rounded-xl px-3 py-2.5 text-xs text-[#0c3120] outline-none"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              />
            </div>
          </div>

          {/* Search button */}
          <button
            onClick={handleSearch}
            className="w-full bg-[#0c3120] text-[#f9e9da] rounded-xl py-3 mt-1 active:scale-95 transition-all duration-150"
            style={{ fontFamily: 'Belleza, sans-serif' }}
          >
            Search trips
          </button>
        </div>

        {/* ── RESULTS ── */}
        {/* Only shows after the user taps Search */}
        {hasSearched && (
          <div>

            {/* Results count */}
            <p className="text-[#0c3120] text-xs opacity-50 mb-3"
              style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {dummyTrips.length} trips available
            </p>

            {/* Trip result cards */}
            <div className="flex flex-col gap-3">
              {dummyTrips.map((trip) => (
                <div
                  key={trip.id}
                  className="bg-white rounded-2xl p-4 shadow-sm"
                >
                  {/* Top row: company name + rating */}
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[#0c3120] text-sm font-medium"
                      style={{ fontFamily: 'Belleza, sans-serif' }}>
                      {trip.company}
                    </p>

                    {/* Star rating */}
                    <div className="flex items-center gap-1">
                      <FaStar size={10} color="#f59e0b" />
                      <span className="text-xs text-gray-400"
                        style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        {trip.rating}
                      </span>
                    </div>
                  </div>

                  {/* Route and date */}
                  <p className="text-[#0c3120] text-xs opacity-60 mb-3"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    {trip.route} · {trip.date}
                  </p>

                  {/* Truck icon row with details */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="bg-[#f9e9da] rounded-full p-1.5">
                      <FaTruck size={10} color="#0c3120" />
                    </div>
                    <span className="text-xs text-gray-400"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      {trip.truckType}
                    </span>

                    {/* Dot separator */}
                    <div className="w-1 h-1 rounded-full bg-gray-200"></div>

                    <span className="text-xs text-gray-400"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      {trip.spaceAvailable}m³ avail
                    </span>

                    {/* Dot separator */}
                    <div className="w-1 h-1 rounded-full bg-gray-200"></div>

                    {/* Temperature type badge */}
                    <span className="text-xs text-gray-400"
                      style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      {trip.tempType}
                    </span>
                  </div>

                  {/* Bottom row: price range + book button */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[#0c3120] text-base font-medium"
                        style={{ fontFamily: 'Belleza, sans-serif' }}>
                        ${trip.priceMin}–${trip.priceMax}
                      </span>
                      <span className="text-gray-400 text-[10px] ml-1"
                        style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        NZD
                      </span>
                    </div>

                    {/* Book button navigates to booking confirmation */}
                    <button
                      onClick={() => navigate(`/booking/${accountId}/${trip.id}`)}
                      className="bg-[#0c3120] text-[#f9e9da] text-xs px-4 py-2 rounded-xl active:scale-95 transition-all duration-150"
                      style={{ fontFamily: 'Belleza, sans-serif' }}
                    >
                      Book
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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

        {/* Find is active on this screen */}
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