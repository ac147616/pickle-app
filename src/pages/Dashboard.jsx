// useParams lets you read the accountId from the URL
// useNavigate lets you move between pages
import { useParams, useNavigate } from 'react-router-dom'

// Icons used on this screen
import { FaTruck, FaSearch, FaBox, FaHome, FaUser, FaPlus } from 'react-icons/fa'

// ── BUSINESS DATA ──
const businessData = {
  name: "Molly's Bakery",
  role: 'Small Business',
  savings: {
    amount: 312,
    traditional: 780,
  },
  co2: {
    saved: 840,
    target: 1000,
  },
  recentActivity: [
    {
      id: 1,
      route: 'Auckland → Wellington',
      status: 'In Transit',
      date: '14 May 2026',
      price: '$136.50',
      statusColor: 'bg-green-500',
    },
    {
      id: 2,
      route: 'Hamilton → Napier',
      status: 'Delivered',
      date: '10 May 2026',
      price: '$98.00',
      statusColor: 'bg-gray-400',
    },
    {
      id: 3,
      route: 'AKL → Tauranga',
      status: 'Delivered',
      date: '3 May 2026',
      price: '$112.00',
      statusColor: 'bg-gray-400',
    },
    {
      id: 4,
      route: 'Wellington → Christchurch',
      status: 'Delivered',
      date: '28 Apr 2026',
      price: '$154.00',
      statusColor: 'bg-gray-400',
    },
  ],
}

// ── TRUCK OPERATOR DATA ──
const truckData = {
  name: 'Kiwi Transport Co.',
  role: 'Truck Operator',
  earnings: {
    amount: 1240,
    trips: 18,
  },
  co2: {
    saved: 1200,
  },
  recentActivity: [
    {
      id: 1,
      route: 'Auckland → Wellington',
      status: 'In Transit',
      date: '14 May 2026',
      price: '+$185.00',
      statusColor: 'bg-green-500',
    },
    {
      id: 2,
      route: 'Hamilton → Tauranga',
      status: 'Completed',
      date: '11 May 2026',
      price: '+$120.00',
      statusColor: 'bg-gray-400',
    },
    {
      id: 3,
      route: 'Auckland → Hamilton',
      status: 'Completed',
      date: '8 May 2026',
      price: '+$95.00',
      statusColor: 'bg-gray-400',
    },
    {
      id: 4,
      route: 'Wellington → Napier',
      status: 'Completed',
      date: '2 May 2026',
      price: '+$210.00',
      statusColor: 'bg-gray-400',
    },
  ],
}

// ── INDIVIDUAL DATA ──
const individualData = {
  name: 'Sarah Chen',
  role: 'Individual',
  savings: {
    amount: 89,
    traditional: 210,
  },
  co2: {
    saved: 145,
    target: 300,
  },
  recentActivity: [
    {
      id: 1,
      route: 'Auckland → Hamilton',
      status: 'Delivered',
      date: '12 May 2026',
      price: '$42.00',
      statusColor: 'bg-gray-400',
    },
    {
      id: 2,
      route: 'Hamilton → Wellington',
      status: 'In Transit',
      date: '16 May 2026',
      price: '$67.00',
      statusColor: 'bg-green-500',
    },
  ],
}

export default function Dashboard() {
  const { accountId } = useParams()
  const navigate = useNavigate()

  // Pick the right data based on who is logged in
  const data =
    accountId === 'truck'
      ? truckData
      : accountId === 'individual'
      ? individualData
      : businessData

  // Check if this is the truck operator
  // so you can show different UI elements
  const isTruck = accountId === 'truck'

  return (
    <div className="min-h-screen bg-[#f9e9da] pb-24">

      {/* ── TOP HEADER ── */}
      <div className="bg-[#0c3120] px-5 pt-10 pb-5">

        {/* Greeting row */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[#f9e9da] text-xs opacity-60"
              style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Good morning,
            </p>
            <h1 className="text-[#f9e9da] text-xl"
              style={{ fontFamily: 'Belleza, sans-serif' }}>
              {data.name}
            </h1>
          </div>
          <span className="text-[#f9e9da] text-xl opacity-80"
            style={{ fontFamily: 'Belleza, sans-serif' }}>
            PICK/e
          </span>
        </div>

        {/* ── VISUAL STATS ROW ── */}
        <div className="flex items-center gap-4 bg-white bg-opacity-10 rounded-2xl px-4 py-3">

          {/* ── DOUBLE DONUT RING ── */}
          <div className="relative flex items-center justify-center flex-shrink-0 w-[100px] h-[100px]">
            <svg width="100" height="100" viewBox="0 0 100 100">

              {/* Outer ring track */}
              <circle cx="50" cy="50" r="45" fill="none"
                stroke="rgba(255,255,255,0.1)" strokeWidth="5" />

              {/* Outer ring - green */}
              {/* For truck: shows trips ratio, for others: active delivery ratio */}
              <circle cx="50" cy="50" r="45" fill="none"
                stroke="#4ade80" strokeWidth="5" strokeLinecap="round"
                strokeDasharray={`${isTruck
                  ? (data.earnings.trips / 20) * 282.7
                  : (2 / 12) * 282.7} 282.7`}
                transform="rotate(-90 50 50)" />

              {/* Inner ring track */}
              <circle cx="50" cy="50" r="33" fill="none"
                stroke="rgba(255,255,255,0.1)" strokeWidth="8" />

              {/* Inner ring - cream */}
              {/* For truck: shows earnings ratio, for others: savings ratio */}
              <circle cx="50" cy="50" r="33" fill="none"
                stroke="#f9e9da" strokeWidth="8" strokeLinecap="round"
                strokeDasharray={`${isTruck
                  ? (data.earnings.amount / 2000) * 207.3
                  : (data.savings.amount / data.savings.traditional) * 207.3} 207.3`}
                transform="rotate(-90 50 50)" />

            </svg>

            {/* Center label */}
            <div className="absolute flex items-center justify-center">
              <span className="text-[#f9e9da] text-sm font-bold"
                style={{ fontFamily: 'Belleza, sans-serif' }}>
                {isTruck
                  ? `${data.earnings.trips}`
                  : `${Math.round((data.savings.amount / data.savings.traditional) * 100)}%`}
              </span>
            </div>
          </div>

          {/* ── RIGHT SIDE STATS ── */}
          <div className="flex flex-col gap-2 flex-1">

            {/* Top stats row */}
            <div className="flex gap-4 items-start">

              {/* Left stat */}
              <div>
                <p className="text-[#f9e9da] text-lg leading-none"
                  style={{ fontFamily: 'Belleza, sans-serif' }}>
                  {isTruck ? `$${data.earnings.amount}` : `$${data.savings.amount}`}
                </p>
                <p className="text-[#f9e9da] text-[10px] opacity-50 mt-0.5"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  {isTruck ? 'Total earned' : 'Freight saved'}
                </p>
              </div>

              <div className="w-px h-8 bg-white opacity-20"></div>

              {/* Right stat */}
              <div>
                <p className="text-[#f9e9da] text-lg leading-none"
                  style={{ fontFamily: 'Belleza, sans-serif' }}>
                  {data.co2.saved}kg
                </p>
                <p className="text-[#f9e9da] text-[10px] opacity-50 mt-0.5"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  CO₂ saved
                </p>
              </div>
            </div>

            {/* Bottom row */}
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
              <p className="text-[#f9e9da] text-[10px] opacity-70"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {isTruck
                  ? `${data.earnings.trips} trips completed`
                  : '2 active deliveries'}
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-white opacity-30"></div>
              <p className="text-[#f9e9da] text-[10px] opacity-70"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {isTruck ? 'Goal: 20 trips' : '12 total deliveries'}
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="px-5 pt-5">

        {/* ── QUICK ACTIONS ── */}
        {/* Truck operator sees List Space + Bookings */}
        {/* Everyone else sees Book Space + My Trips */}
        <div className="grid grid-cols-2 gap-3 mb-5">

          {isTruck ? (
            <>
              {/* List truck space button */}
              <button
                onClick={() => navigate(`/listspace/${accountId}`)}
                className="bg-[#0c3120] text-[#f9e9da] rounded-2xl px-4 py-3 flex items-center gap-2 active:scale-95 transition-all duration-150 shadow-sm"
              >
                <FaPlus size={14} color="#f9e9da" />
                <p className="text-xs"
                  style={{ fontFamily: 'Belleza, sans-serif' }}>
                  List Space
                </p>
              </button>

              {/* View bookings button */}
              <button
                onClick={() => navigate(`/mytrips/${accountId}`)}
                className="bg-white text-[#0c3120] border-2 border-[#0c3120] rounded-2xl px-4 py-3 flex items-center gap-2 active:scale-95 transition-all duration-150 shadow-sm"
              >
                <FaBox size={14} color="#0c3120" />
                <p className="text-xs"
                  style={{ fontFamily: 'Belleza, sans-serif' }}>
                  My Trips
                </p>
              </button>
            </>
          ) : (
            <>
              {/* Book delivery space button */}
              <button
                onClick={() => navigate(`/find/${accountId}`)}
                className="bg-[#0c3120] text-[#f9e9da] rounded-2xl px-4 py-3 flex items-center gap-2 active:scale-95 transition-all duration-150 shadow-sm"
              >
                <FaSearch size={14} color="#f9e9da" />
                <p className="text-xs"
                  style={{ fontFamily: 'Belleza, sans-serif' }}>
                  Book Space
                </p>
              </button>

              {/* My trips button */}
              <button
                onClick={() => navigate(`/mytrips/${accountId}`)}
                className="bg-white text-[#0c3120] border-2 border-[#0c3120] rounded-2xl px-4 py-3 flex items-center gap-2 active:scale-95 transition-all duration-150 shadow-sm"
              >
                <FaBox size={14} color="#0c3120" />
                <p className="text-xs"
                  style={{ fontFamily: 'Belleza, sans-serif' }}>
                  My Trips
                </p>
              </button>
            </>
          )}
        </div>

        {/* ── RECENT ACTIVITY ── */}
        <h2 className="text-[#0c3120] text-sm mb-2 opacity-60"
          style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Recent Activity
        </h2>

        <div className="flex flex-col gap-2">
          {data.recentActivity.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl px-4 py-3 shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="bg-[#f9e9da] rounded-full p-2">
                  <FaTruck size={12} color="#0c3120" />
                </div>
                <div>
                  <p className="text-[#0c3120] text-xs font-medium"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    {item.route}
                  </p>
                  <p className="text-gray-400 text-[10px] mt-0.5"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    {item.date}
                  </p>
                </div>
              </div>

              <div className="text-right">
                {/* Green price for truck earnings */}
                <p className={`text-xs font-medium ${isTruck ? 'text-green-600' : 'text-[#0c3120]'}`}
                  style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  {item.price}
                </p>
                <div className="flex items-center gap-1 justify-end mt-0.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${item.statusColor}`}></div>
                  <p className="text-gray-400 text-[10px]"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    {item.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM NAV ── */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-8 py-4 flex justify-between items-center">

        <button className="flex flex-col items-center gap-1">
          <FaHome size={20} color="#0c3120" />
          <span className="text-[10px] text-[#0c3120] font-medium"
            style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Home
          </span>
        </button>

        <button
          onClick={() => navigate(`/find/${accountId}`)}
          className="flex flex-col items-center gap-1">
          <FaSearch size={20} color="#9ca3af" />
          <span className="text-[10px] text-gray-400"
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