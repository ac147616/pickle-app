// useParams reads accountId and tripId from the URL
// useNavigate lets you move between pages
import { useParams, useNavigate } from 'react-router-dom'

// useState and useEffect let you animate the truck moving on the map
import { useState, useEffect } from 'react'

// Icons used on this screen
import { FaArrowLeft, FaTruck, FaHome, FaSearch, FaBox, FaUser, FaPlus, FaPhone } from 'react-icons/fa'

// Dummy trip data matched to MyTrips active trips
const activeTrips = [
  {
    id: 1,
    route: 'Auckland → Wellington',
    company: 'Kiwi Transport Co.',
    driver: 'James Tana',
    phone: '+64 21 345 678',
    truckType: 'MAN TGX',
    departure: '06:00 AM',
    arrival: '12:30 PM',
    date: '14 May 2026',
    price: '$68.25',
    // Progress 0-100 of how far along the route the truck is
    progress: 62,
    // Status message shown on the tracking card
    statusMessage: 'On the way · Est. arrival 12:30 PM',
    // Waypoints shown on the dummy map route line
    stops: ['Auckland', 'Hamilton', 'Palmerston North', 'Wellington'],
    // Which stop the truck is currently between
    currentStop: 2,
  },
  {
    id: 2,
    route: 'Auckland → Wellington',
    company: 'Mike Taufa · Private Owner',
    driver: 'Mike Taufa',
    phone: '+64 21 567 890',
    truckType: 'Ford Ranger Ute',
    departure: '08:00 AM',
    arrival: '02:00 PM',
    date: '18 May 2026',
    price: '$47.25',
    progress: 28,
    statusMessage: 'Picked up · Est. arrival 2:00 PM',
    stops: ['Auckland', 'Hamilton', 'Palmerston North', 'Wellington'],
    currentStop: 1,
  },
]

export default function Tracking() {
  const { accountId, tripId } = useParams()
  const navigate = useNavigate()

  const isTruck = accountId === 'truck'

  // Find the active trip from the URL tripId
  const trip = activeTrips.find((t) => t.id === parseInt(tripId))
    // Fall back to first trip if not found
    || activeTrips[0]

  // Animate the truck position along the route
  // This starts at the trip's progress and slowly increments
  const [truckPos, setTruckPos] = useState(trip.progress)

  useEffect(() => {
    // Every 3 seconds move the truck slightly forward
    const interval = setInterval(() => {
      setTruckPos((prev) => {
        // Stop at 95 so it never quite arrives during the demo
        if (prev >= 95) return prev
        return prev + 0.5
      })
    }, 3000)
    // Clean up the interval when leaving the screen
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-[#f9e9da] pb-24">

      {/* ── TOP HEADER ── */}
      <div className="bg-[#0c3120] px-5 pt-10 pb-5">
        <button
          onClick={() => navigate(`/mytrips/${accountId}`)}
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
          Live Tracking
        </h1>
        <p className="text-[#f9e9da] text-xs opacity-50 mt-1"
          style={{ fontFamily: 'DM Sans, sans-serif' }}>
          {trip.route}
        </p>
      </div>

      <div className="px-5 pt-5 flex flex-col gap-3">

        {/* ── DUMMY MAP ── */}
        {/* SVG based map showing NZ outline and route line */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">

          {/* Map container */}
          <div className="relative bg-[#e8f0e8] w-full"
            style={{ height: '260px' }}>

            <svg
              viewBox="0 0 300 260"
              width="100%"
              height="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* ── NZ NORTH ISLAND OUTLINE ── */}
              {/* Simplified shape just for visual feel */}
              <path
                d="M 180 20 L 200 40 L 210 70 L 205 100 L 195 120 L 180 140 L 160 155 L 145 165 L 140 180 L 150 195 L 145 210 L 130 220 L 115 215 L 110 200 L 120 185 L 125 170 L 115 155 L 100 145 L 95 130 L 100 110 L 115 90 L 125 70 L 140 45 L 155 25 Z"
                fill="#d4e6d4"
                stroke="#b8d4b8"
                strokeWidth="1"
              />

              {/* ── NZ SOUTH ISLAND OUTLINE ── */}
              <path
                d="M 100 230 L 120 225 L 140 228 L 155 240 L 150 255 L 130 258 L 110 252 L 95 242 Z"
                fill="#d4e6d4"
                stroke="#b8d4b8"
                strokeWidth="1"
              />

              {/* ── ROUTE LINE ── */}
              {/* Dashed line from Auckland down to Wellington */}
              <line
                x1="165" y1="55"
                x2="140" y2="195"
                stroke="#0c3120"
                strokeWidth="2"
                strokeDasharray="5,4"
                opacity="0.4"
              />

              {/* ── STOP DOTS ── */}
              {/* Auckland */}
              <circle cx="165" cy="55" r="5"
                fill="#0c3120" opacity="0.8" />
              <text x="172" y="58" fontSize="8"
                fill="#0c3120" opacity="0.7"
                fontFamily="DM Sans, sans-serif">
                Auckland
              </text>

              {/* Hamilton */}
              <circle cx="158" cy="95" r="3.5"
                fill={truckPos > 25 ? '#0c3120' : '#9ca3af'} opacity="0.6" />
              <text x="165" y="98" fontSize="7"
                fill="#0c3120" opacity="0.6"
                fontFamily="DM Sans, sans-serif">
                Hamilton
              </text>

              {/* Palmerston North */}
              <circle cx="150" cy="145" r="3.5"
                fill={truckPos > 55 ? '#0c3120' : '#9ca3af'} opacity="0.6" />
              <text x="157" y="148" fontSize="7"
                fill="#0c3120" opacity="0.6"
                fontFamily="DM Sans, sans-serif">
                Palmerston North
              </text>

              {/* Wellington */}
              <circle cx="140" cy="195" r="5"
                fill={truckPos > 90 ? '#0c3120' : '#9ca3af'} opacity="0.8" />
              <text x="147" y="198" fontSize="8"
                fill="#0c3120" opacity="0.7"
                fontFamily="DM Sans, sans-serif">
                Wellington
              </text>

              {/* ── TRUCK ICON ── */}
              {/* Moves along the route line based on truckPos */}
              {/* truckPos 0 = Auckland (y=55), 100 = Wellington (y=195) */}
              <g transform={`translate(
                ${165 - (truckPos / 100) * 25},
                ${55 + (truckPos / 100) * 140}
              )`}>
                {/* White circle background for the truck icon */}
                <circle cx="0" cy="0" r="10"
                  fill="white"
                  stroke="#0c3120"
                  strokeWidth="1.5"
                />
                {/* Truck symbol inside the circle */}
                <text
                  x="0" y="4"
                  fontSize="10"
                  textAnchor="middle"
                  fontFamily="sans-serif">
                  🚛
                </text>
              </g>

              {/* ── PROGRESS LABEL ── */}
              <text x="15" y="20" fontSize="9"
                fill="#0c3120" opacity="0.6"
                fontFamily="DM Sans, sans-serif">
                {Math.round(truckPos)}% completed
              </text>

            </svg>
          </div>

          {/* Status bar below the map */}
          <div className="px-4 py-3 flex items-center gap-2 border-t border-gray-100">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <p className="text-[#0c3120] text-xs"
              style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {trip.statusMessage}
            </p>
          </div>
        </div>

        {/* ── PROGRESS BAR ── */}
        <div className="bg-white rounded-2xl px-4 py-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <p className="text-[#0c3120] text-xs"
              style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {trip.stops[0]}
            </p>
            <p className="text-[#0c3120] text-xs"
              style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {trip.stops[trip.stops.length - 1]}
            </p>
          </div>
          {/* Progress track */}
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-[#0c3120] h-2 rounded-full transition-all duration-1000"
              style={{ width: `${truckPos}%` }}
            ></div>
          </div>
          <p className="text-gray-400 text-[10px] mt-1.5 text-center"
            style={{ fontFamily: 'DM Sans, sans-serif' }}>
            {Math.round(truckPos)}% of journey completed
          </p>
        </div>

        {/* ── DRIVER CARD ── */}
        <div className="bg-[#0c3120] rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Driver avatar circle with initial */}
            <div className="bg-white bg-opacity-10 rounded-full w-10 h-10 flex items-center justify-center">
              <span className="text-[#f9e9da] text-sm"
                style={{ fontFamily: 'Belleza, sans-serif' }}>
                {trip.driver.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-[#f9e9da] text-sm"
                style={{ fontFamily: 'Belleza, sans-serif' }}>
                {trip.driver}
              </p>
              <p className="text-[#f9e9da] text-xs opacity-50"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {trip.truckType}
              </p>
            </div>
          </div>
          {/* Call button */}
          <button className="bg-white bg-opacity-10 rounded-full p-3 active:scale-95 transition-all duration-150">
            <FaPhone size={14} color="#f9e9da" />
          </button>
        </div>

        {/* ── DELIVERY DETAILS ── */}
        <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-3">

          <p className="text-[#0c3120] text-xs opacity-50"
            style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Delivery details
          </p>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <p className="text-[10px] text-gray-400 mb-0.5"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Departed
              </p>
              <p className="text-[#0c3120] text-xs font-medium"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {trip.departure}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 mb-0.5"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Est. Arrival
              </p>
              <p className="text-[#0c3120] text-xs font-medium"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {trip.arrival}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 mb-0.5"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Paid
              </p>
              <p className="text-[#0c3120] text-xs font-medium"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {trip.price}
              </p>
            </div>
          </div>
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
          onClick={() => isTruck
            ? navigate(`/listspace/${accountId}`)
            : navigate(`/find/${accountId}`)
          }
          className="flex flex-col items-center gap-1">
          {isTruck
            ? <FaPlus size={20} color="#9ca3af" />
            : <FaSearch size={20} color="#9ca3af" />
          }
          <span className="text-[10px] text-gray-400"
            style={{ fontFamily: 'DM Sans, sans-serif' }}>
            {isTruck ? 'List Space' : 'Find'}
          </span>
        </button>

        {/* My Trips is active since we came from there */}
        <button
          onClick={() => navigate(`/mytrips/${accountId}`)}
          className="flex flex-col items-center gap-1">
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