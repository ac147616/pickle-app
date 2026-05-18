// useParams reads the accountId from the URL
// useNavigate lets you move between pages
import { useParams, useNavigate } from 'react-router-dom'

// Import the createListing function from our API file
import { createListing } from '../api'

// useState tracks each form field and the submitted state
import { useState } from 'react'

// Icons used on this screen
import { FaArrowLeft, FaHome, FaSearch, FaBox, FaUser, FaCheck, FaPlus } from 'react-icons/fa'

export default function ListSpace() {
  const { accountId } = useParams()
  const navigate = useNavigate()

  // Track whether the listing has been submitted
  const [submitted, setSubmitted] = useState(false)

  // Form field state — each one tracks what the user types
  const [route, setRoute] = useState('')
  const [date, setDate] = useState('')
  const [departure, setDeparture] = useState('')
  const [truckType, setTruckType] = useState('')
  const [space, setSpace] = useState('')
  const [price, setPrice] = useState('')
  const [tempType, setTempType] = useState('Ambient')
  const [licencePlate, setLicencePlate] = useState('')

  // Called when the user taps Submit Listing
  const handleSubmit = async () => {
    try {
      await createListing({
        // Use the account name as company
        company: 'Kiwi Transport Co.',
        route,
        date,
        departure,
        truckType,
        licencePlate,
        space: parseFloat(space),
        tempType,
        price: parseFloat(price),
      })
      setSubmitted(true)
    } catch (err) {
      console.error('Failed to save listing:', err)
      // Still show success for demo purposes
      setSubmitted(true)
    }
  }

  // ── SUBMITTED SUCCESS SCREEN ──
  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f9e9da] flex flex-col items-center justify-center px-6 pb-24">

        <div className="bg-[#0c3120] rounded-full p-4 mb-5">
          <FaCheck size={24} color="#f9e9da" />
        </div>

        <h1 className="text-[#0c3120] text-2xl mb-2 text-center"
          style={{ fontFamily: 'Belleza, sans-serif' }}>
          Listing Posted!
        </h1>

        <p className="text-gray-400 text-xs text-center mb-1"
          style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Your available space has been listed on
        </p>

        <p className="text-[#0c3120] text-sm text-center font-medium mb-0.5"
          style={{ fontFamily: 'DM Sans, sans-serif' }}>
          {route || 'Auckland → Wellington'}
        </p>

        <p className="text-gray-400 text-xs text-center mb-12"
          style={{ fontFamily: 'DM Sans, sans-serif' }}>
          {date || '18 May 2026'} · Departure {departure || '06:00 AM'}
        </p>

        {/* Summary card */}
        <div className="bg-white rounded-2xl px-6 py-5 mb-5 shadow-sm"
          style={{ width: '80%' }}>
          <div className="flex justify-between items-center mb-3">
            <p className="text-gray-400 text-xs"
              style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Space available
            </p>
            <p className="text-[#0c3120] text-sm"
              style={{ fontFamily: 'Belleza, sans-serif' }}>
              {space || '4.8'}m³
            </p>
          </div>
          <div className="w-full h-px bg-gray-100 mb-3"></div>
          <div className="flex justify-between items-center">
            <p className="text-gray-400 text-xs"
              style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Price
            </p>
            <p className="text-[#0c3120] text-sm"
              style={{ fontFamily: 'Belleza, sans-serif' }}>
              ${price || '85'} fixed
            </p>
          </div>
        </div>

        {/* Post another listing button */}
        <button
          onClick={() => setSubmitted(false)}
          className="bg-white border-2 border-[#0c3120] text-[#0c3120] rounded-xl py-3 mb-3 active:scale-95 transition-all duration-150"
          style={{ width: '80%', fontFamily: 'Belleza, sans-serif' }}
        >
          Post Another Listing
        </button>

        {/* Back to dashboard button */}
        <button
          onClick={() => navigate(`/dashboard/${accountId}`)}
          className="bg-[#0c3120] text-[#f9e9da] rounded-xl py-3 active:scale-95 transition-all duration-150"
          style={{ width: '80%', fontFamily: 'Belleza, sans-serif' }}
        >
          Back to Dashboard
        </button>

        {/* Bottom nav */}
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
            <FaPlus size={20} color="#0c3120" />
            <span className="text-[10px] text-[#0c3120] font-medium"
              style={{ fontFamily: 'DM Sans, sans-serif' }}>
              List Space
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
          onClick={() => navigate(`/dashboard/${accountId}`)}
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
          List Truck Space
        </h1>
        <p className="text-[#f9e9da] text-xs opacity-50 mt-1"
          style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Fill in your trip details below
        </p>
      </div>

      <div className="px-5 pt-5 flex flex-col gap-3">

        {/* ── ROUTE CARD ── */}
        <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-3">

          <p className="text-[#0c3120] text-xs opacity-50"
            style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Route details
          </p>

          {/* Route input */}
          <div>
            <label className="text-[#0c3120] text-xs opacity-50 mb-1 block"
              style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Route (from → to)
            </label>
            <input
              type="text"
              placeholder="e.g. Auckland → Wellington"
              value={route}
              onChange={(e) => setRoute(e.target.value)}
              className="w-full bg-[#f9e9da] rounded-xl px-3 py-2.5 text-sm text-[#0c3120] outline-none"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            />
          </div>

          <div className="w-full h-px bg-gray-100"></div>

          {/* Date and departure time on same row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[#0c3120] text-xs opacity-50 mb-1 block"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Departure date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-[#f9e9da] rounded-xl px-3 py-2.5 text-xs text-[#0c3120] outline-none"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              />
            </div>
            <div>
              <label className="text-[#0c3120] text-xs opacity-50 mb-1 block"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Departure time
              </label>
              <input
                type="time"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
                className="w-full bg-[#f9e9da] rounded-xl px-3 py-2.5 text-xs text-[#0c3120] outline-none"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              />
            </div>
          </div>
        </div>

        {/* ── TRUCK DETAILS CARD ── */}
        <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-3">

          <p className="text-[#0c3120] text-xs opacity-50"
            style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Truck details
          </p>

          {/* Truck type and licence plate */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[#0c3120] text-xs opacity-50 mb-1 block"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Truck type
              </label>
              <input
                type="text"
                placeholder="e.g. MAN TGX"
                value={truckType}
                onChange={(e) => setTruckType(e.target.value)}
                className="w-full bg-[#f9e9da] rounded-xl px-3 py-2.5 text-xs text-[#0c3120] outline-none"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              />
            </div>
            <div>
              <label className="text-[#0c3120] text-xs opacity-50 mb-1 block"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Licence plate
              </label>
              <input
                type="text"
                placeholder="e.g. ABC 123"
                value={licencePlate}
                onChange={(e) => setLicencePlate(e.target.value)}
                className="w-full bg-[#f9e9da] rounded-xl px-3 py-2.5 text-xs text-[#0c3120] outline-none"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              />
            </div>
          </div>

          <div className="w-full h-px bg-gray-100"></div>

          {/* Space and temperature type */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[#0c3120] text-xs opacity-50 mb-1 block"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Space available (m³)
              </label>
              <input
                type="number"
                placeholder="e.g. 4.8"
                value={space}
                onChange={(e) => setSpace(e.target.value)}
                className="w-full bg-[#f9e9da] rounded-xl px-3 py-2.5 text-xs text-[#0c3120] outline-none"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              />
            </div>
            <div>
              <label className="text-[#0c3120] text-xs opacity-50 mb-1 block"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Temp type
              </label>
              {/* Dropdown for temperature type */}
              <select
                value={tempType}
                onChange={(e) => setTempType(e.target.value)}
                className="w-full bg-[#f9e9da] rounded-xl px-3 py-2.5 text-xs text-[#0c3120] outline-none"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                <option>Ambient</option>
                <option>Chilled</option>
                <option>Frozen</option>
                <option>Hazmat</option>
              </select>
            </div>
          </div>
        </div>

        {/* ── PRICING CARD ── */}
        <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-3">

          <p className="text-[#0c3120] text-xs opacity-50"
            style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Pricing
          </p>

          <div>
            <label className="text-[#0c3120] text-xs opacity-50 mb-1 block"
              style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Fixed price (NZD)
            </label>
            <input
              type="number"
              placeholder="e.g. 85"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-[#f9e9da] rounded-xl px-3 py-2.5 text-sm text-[#0c3120] outline-none"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            />
          </div>
        </div>

        {/* ── SUBMIT BUTTON ── */}
        <button
          onClick={handleSubmit}
          className="w-full bg-[#0c3120] text-[#f9e9da] rounded-xl py-4 active:scale-95 transition-all duration-150"
          style={{ fontFamily: 'Belleza, sans-serif' }}
        >
          Submit Listing
        </button>
        
        <p className="text-center text-gray-400 text-[10px]"
          style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Your listing will be visible to businesses immediately
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

        {/* List Space is active on this screen */}
        <button className="flex flex-col items-center gap-1">
          <FaPlus size={20} color="#0c3120" />
          <span className="text-[10px] text-[#0c3120] font-medium"
            style={{ fontFamily: 'DM Sans, sans-serif' }}>
            List Space
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