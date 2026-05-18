// useParams reads the accountId from the URL
// useNavigate lets you move between pages
import { useParams, useNavigate } from 'react-router-dom'

// useState tracks which filter tab is active
import { useState } from 'react'

// Icons used on this screen
import { FaArrowLeft, FaTruck, FaHome, FaSearch, FaBox, FaUser, FaPlus } from 'react-icons/fa'

// All dummy trips for Molly's Bakery
// Each has a status used for filtering
const allTrips = [
  {
    id: 1,
    route: 'Auckland → Wellington',
    company: 'Kiwi Transport Co.',
    date: '14 May 2026',
    price: '$68.25',
    status: 'active',
  },
  {
    id: 2,
    route: 'Auckland → Wellington',
    company: 'Mike Taufa · Private Owner',
    date: '18 May 2026',
    price: '$47.25',
    status: 'active',
  },
  {
    id: 3,
    route: 'Hamilton → Napier',
    company: 'NZ Express Haulage',
    date: '10 May 2026',
    price: '$98.00',
    status: 'delivered',
  },
  {
    id: 4,
    route: 'AKL → Tauranga',
    company: 'Dave Kirino · Private Owner',
    date: '3 May 2026',
    price: '$112.00',
    status: 'delivered',
  },
  {
    id: 5,
    route: 'Wellington → Christchurch',
    company: 'Kiwi Transport Co.',
    date: '28 Apr 2026',
    price: '$154.00',
    status: 'delivered',
  },
]

// Filter tabs shown at the top of the list
const tabs = ['All', 'Active', 'Delivered']

export default function MyTrips() {
  const { accountId } = useParams()
  const navigate = useNavigate()

  // Track which tab is currently selected
  // Defaults to All so everything shows first
  const [activeTab, setActiveTab] = useState('All')

  // Filter the trips based on the selected tab
  const filtered = allTrips.filter((trip) => {
    if (activeTab === 'All') return true
    if (activeTab === 'Active') return trip.status === 'active'
    if (activeTab === 'Delivered') return trip.status === 'delivered'
    return true
  })

  return (
    <div className="min-h-screen bg-[#f9e9da] pb-24">

      {/* ── TOP HEADER ── */}
      <div className="bg-[#0c3120] px-5 pt-10 pb-5">

        {/* Back button */}
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
          My Trips
        </h1>
        <p className="text-[#f9e9da] text-xs opacity-50 mt-1"
          style={{ fontFamily: 'DM Sans, sans-serif' }}>
          {allTrips.length} total deliveries
        </p>
      </div>

      <div className="px-5 pt-5">

        {/* ── FILTER TABS ── */}
        {/* Tapping a tab filters the list below */}
        <div className="flex gap-2 mb-5">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-xs transition-all duration-150
                ${activeTab === tab
                  // Active tab is dark green filled
                  ? 'bg-[#0c3120] text-[#f9e9da]'
                  // Inactive tab is white outlined
                  : 'bg-white text-[#0c3120] border border-gray-200'
                }`}
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── TRIP LIST ── */}
        <div className="flex flex-col gap-3">
          {filtered.map((trip) => (
            <div
              key={trip.id}
              onClick={() => trip.status === 'active'
                ? navigate(`/tracking/${accountId}/${trip.id}`)
                : null
              }
              className={`bg-white rounded-2xl px-4 py-4 shadow-sm flex items-center justify-between
                ${trip.status === 'active' ? 'cursor-pointer active:scale-95 transition-all duration-150' : ''}`}
            >
              {/* Left: truck icon + route and company */}
              <div className="flex items-center gap-3">

                {/* Truck icon in cream circle */}
                <div className="bg-[#f9e9da] rounded-full p-2.5">
                  <FaTruck size={14} color="#0c3120" />
                </div>

                <div>
                  <p className="text-[#0c3120] text-sm"
                    style={{ fontFamily: 'Belleza, sans-serif' }}>
                    {trip.route}
                  </p>
                  <p className="text-gray-400 text-[10px] mt-0.5"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    {trip.company}
                  </p>
                  <p className="text-gray-400 text-[10px]"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    {trip.date}
                  </p>
                </div>
              </div>

              {/* Right: price and status */}
              <div className="text-right">
                <p className="text-[#0c3120] text-sm"
                  style={{ fontFamily: 'Belleza, sans-serif' }}>
                  {trip.price}
                </p>
                {/* Status dot and label */}
                <div className="flex items-center gap-1 justify-end mt-1">
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    trip.status === 'active' ? 'bg-green-500' : 'bg-gray-300'
                  }`}></div>
                  <p className="text-[10px] text-gray-400 capitalize"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    {trip.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
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

        <button
        onClick={() => accountId === 'truck'
          ? navigate(`/listspace/${accountId}`)
          : navigate(`/find/${accountId}`)
        }
        className="flex flex-col items-center gap-1">
        {accountId === 'truck'
          ? <FaPlus size={20} color="#9ca3af" />
          : <FaSearch size={20} color="#9ca3af" />
        }
        <span className="text-[10px] text-gray-400"
          style={{ fontFamily: 'DM Sans, sans-serif' }}>
          {accountId === 'truck' ? 'List Space' : 'Find'}
        </span>
      </button>

        {/* My Trips is active on this screen */}
        <button className="flex flex-col items-center gap-1">
          <FaBox size={20} color="#0c3120" />
          <span className="text-[10px] text-[#0c3120] font-medium"
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