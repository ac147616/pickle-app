// useParams lets you read the accountId from the URL
// useNavigate lets you move between pages
import { useParams, useNavigate } from 'react-router-dom'

// Importing all icons used in this screen
import { FaTruck, FaSearch, FaBox, FaHome, FaUser } from 'react-icons/fa'

// This is the dummy data for Molly's Bakery dashboard
const businessData = {
  name: "Molly's Bakery",
  role: 'Small Business',
  stats: [
    { label: 'Active Bookings', value: '2' },
    { label: 'CO₂ Saved (kg)', value: '840' },
    { label: 'Total Deliveries', value: '12' },
    { label: 'Avg Cost Saved', value: '$45' },
  ],
  // These are the recent deliveries shown on the dashboard
  recentActivity: [
    {
      id: 1,
      route: 'Auckland → Wellington',
      status: 'In Transit',
      date: '14 May 2026',
      price: '$136.50',
      // green dot for active
      statusColor: 'bg-green-500',
    },
    {
      id: 2,
      route: 'Hamilton → Napier',
      status: 'Delivered',
      date: '10 May 2026',
      price: '$98.00',
      // gray dot for completed
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
  ],
}

export default function Dashboard() {
  // Read the accountId from the URL e.g. "business" from /dashboard/business
  const { accountId } = useParams()
  const navigate = useNavigate()

  // For now this always shows business data
  // Later you'll swap this based on accountId
  const data = businessData

  return (
    // Full screen cream background with bottom padding for the nav bar
    <div className="min-h-screen bg-[#f9e9da] pb-24">

      {/* ── TOP HEADER ── */}
      <div className="bg-[#0c3120] px-5 pt-10 pb-6">

        {/* Top row: greeting on left, logo on right */}
        <div className="flex items-center justify-between mb-4">
          <div>
            {/* Greeting with the account name */}
            <p className="text-[#f9e9da] text-xs opacity-60"
              style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Good morning,
            </p>
            <h1 className="text-[#f9e9da] text-xl"
              style={{ fontFamily: 'Belleza, sans-serif' }}>
              {data.name}
            </h1>
          </div>

          {/* PICK/e logo top right */}
          <span className="text-[#f9e9da] text-xl opacity-80"
            style={{ fontFamily: 'Belleza, sans-serif' }}>
            PICK/e
          </span>
        </div>

        {/* ── STATS ROW ── */}
        {/* Horizontal scrollable row of stat cards */}
        <div className="flex gap-3 overflow-x-auto pb-1">
          {data.stats.map((stat, index) => (
            <div
              key={index}
              // Each stat card is a small white-tinted pill
              className="flex-shrink-0 bg-white bg-opacity-10 rounded-xl px-4 py-3 min-w-[100px]"
            >
              <p className="text-[#f9e9da] text-xl"
                style={{ fontFamily: 'Belleza, sans-serif' }}>
                {stat.value}
              </p>
              <p className="text-[#f9e9da] text-xs opacity-60 mt-0.5"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="px-5 pt-6">

        {/* ── QUICK ACTIONS ── */}
        <h2 className="text-[#0c3120] text-lg mb-3"
          style={{ fontFamily: 'Belleza, sans-serif' }}>
          Quick Actions
        </h2>

        {/* Two big action buttons side by side */}
        <div className="grid grid-cols-2 gap-3 mb-6">

          {/* Book Delivery Space button — dark green filled */}
          <button
            onClick={() => navigate(`/find/${accountId}`)}
            className="bg-[#0c3120] text-[#f9e9da] rounded-2xl p-4 text-left active:scale-95 transition-all duration-150 shadow-sm"
          >
            {/* Icon sitting above the label */}
            <div className="mb-2">
                <FaSearch size={22} color="#f9e9da" />
            </div>
            <p className="text-sm leading-tight"
              style={{ fontFamily: 'Belleza, sans-serif' }}>
              Book Delivery Space
            </p>
          </button>

          {/* My Trips button — white outlined */}
          <button
            className="bg-white text-[#0c3120] border-2 border-[#0c3120] rounded-2xl p-4 text-left active:scale-95 transition-all duration-150 shadow-sm"
          >
            <div className="mb-2">
                <FaBox size={22} color="#0c3120" />
            </div>
            <p className="text-sm leading-tight"
              style={{ fontFamily: 'Belleza, sans-serif' }}>
              My Trips
            </p>
          </button>
        </div>

        <h2 className="text-[#0c3120] text-lg mb-3"
        style={{ fontFamily: 'Belleza, sans-serif' }}>
            Recent Activity
        </h2>
        
        {/* List of recent deliveries */}
        <div className="flex flex-col gap-3">
          {data.recentActivity.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl px-4 py-4 shadow-sm flex items-center justify-between"
            >
              {/* Left side: truck icon + route and date */}
              <div className="flex items-center gap-3">

                {/* Small truck icon to the left of each delivery */}
                <div className="bg-[#f9e9da] rounded-full p-2">
                <FaTruck size={16} color="#0c3120" />
                </div>

                <div>
                  <p className="text-[#0c3120] text-sm font-medium"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    {item.route}
                  </p>
                  <p className="text-gray-400 text-xs mt-0.5"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    {item.date}
                  </p>
                </div>
              </div>

              {/* Right side: price and status badge */}
              <div className="text-right">
                <p className="text-[#0c3120] text-sm font-medium"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  {item.price}
                </p>
                {/* Status badge with colored dot */}
                <div className="flex items-center gap-1 justify-end mt-0.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${item.statusColor}`}></div>
                  <p className="text-gray-400 text-xs"
                    style={{ fontFamily: 'DM Sans, sans-serif' }}>
                    {item.status}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM NAV BAR ── */}
      {/* Fixed to the bottom of the screen like a real app */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-8 py-4 flex justify-between items-center">

        {/* Home tab — active state shown with dark green color */}
        <button className="flex flex-col items-center gap-1">
        <FaHome size={20} color="#0c3120" />
        <span className="text-[10px] text-[#0c3120] font-medium"
            style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Home
        </span>
        </button>

        {/* Find tab */}
        <button
        onClick={() => navigate(`/find/${accountId}`)}
        className="flex flex-col items-center gap-1">
        <FaSearch size={20} color="#9ca3af" />
        <span className="text-[10px] text-gray-400"
            style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Find
        </span>
        </button>

        {/* Trips tab */}
        <button className="flex flex-col items-center gap-1">
        <FaBox size={20} color="#9ca3af" />
        <span className="text-[10px] text-gray-400"
            style={{ fontFamily: 'DM Sans, sans-serif' }}>
            My Trips
        </span>
        </button>

        {/* Account tab */}
        <button className="flex flex-col items-center gap-1">
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