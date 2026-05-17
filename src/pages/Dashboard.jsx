// useParams lets you read the accountId from the URL
// useNavigate lets you move between pages
import { useParams, useNavigate } from 'react-router-dom'
// Importing all icons used in this screen
import { FaTruck, FaSearch, FaBox, FaHome, FaUser } from 'react-icons/fa'

// Dummy data for Molly's Bakery dashboard
const businessData = {
  name: "Molly's Bakery",
  role: 'Small Business',
  // CO2 data for the donut ring
  // saved is how much has been saved, remaining is the rest up to the target
  // CO2 and savings data shown in the visual stats block
    co2: {
        saved: 840,
        target: 1000,
    },
    // Estimated money saved vs using traditional freight
    savings: {
        amount: 312,
        // This is what they would have paid with a traditional courier
        traditional: 780,
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
          route: 'Auckland → Tauranga',
          status: 'Delivered',
          date: '3 May 2026',
          price: '$112.00',
          statusColor: 'bg-gray-400',
        },
        // Fourth dummy activity
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

export default function Dashboard() {
  const { accountId } = useParams()
  const navigate = useNavigate()
  const data = businessData

  // Build the two slices of the donut
  // one for saved, one for remaining to target
  const donutData = [
    { name: 'Saved', value: data.co2.saved },
    { name: 'Remaining', value: data.co2.target - data.co2.saved },
  ]

  // Calculate the percentage saved for the label inside the ring
  const percentage = Math.round((data.co2.saved / data.co2.target) * 100)

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
            <circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="5"
            />

            {/* Outer ring - green - active deliveries ratio */}
            <circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke="#4ade80"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={`${(2 / 12) * 282.7} 282.7`}
            transform="rotate(-90 50 50)"
            />

            {/* Inner ring track */}
            <circle
            cx="50" cy="50" r="33"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
            />

            {/* Inner ring - cream - freight savings ratio */}
            <circle
            cx="50" cy="50" r="33"
            fill="none"
            stroke="#f9e9da"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${(data.savings.amount / data.savings.traditional) * 207.3} 207.3`}
            transform="rotate(-90 50 50)"
            />

        </svg>

        {/* Percentage label — only one, centered inside inner ring */}
        <div className="absolute flex items-center justify-center">
            <span className="text-[#f9e9da] text-sm font-bold"
            style={{ fontFamily: 'Belleza, sans-serif' }}>
            {Math.round((data.savings.amount / data.savings.traditional) * 100)}%
            </span>
        </div>
        </div>

        {/* ── RIGHT SIDE STATS ── */}
        <div className="flex flex-col gap-2 flex-1">

        {/* Freight saved and CO2 on same row */}
        <div className="flex gap-4 items-start">
            <div>
            <p className="text-[#f9e9da] text-lg leading-none"
                style={{ fontFamily: 'Belleza, sans-serif' }}>
                ${data.savings.amount}
            </p>
            <p className="text-[#f9e9da] text-[10px] opacity-50 mt-0.5"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Freight saved
            </p>
            </div>

            {/* Thin vertical divider */}
            <div className="w-px h-8 bg-white opacity-20"></div>

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

        {/* Active deliveries */}
        <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
            <p className="text-[#f9e9da] text-[10px] opacity-70"
            style={{ fontFamily: 'DM Sans, sans-serif' }}>
            2 active deliveries
            </p>
        </div>

        {/* Total deliveries */}
        <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-white opacity-30"></div>
            <p className="text-[#f9e9da] text-[10px] opacity-70"
            style={{ fontFamily: 'DM Sans, sans-serif' }}>
            12 total deliveries
            </p>
        </div>

        </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="px-5 pt-5">

        {/* ── ACTION BUTTONS ── */}
        <div className="grid grid-cols-2 gap-3 mb-5">
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
                <p className="text-[#0c3120] text-xs font-medium"
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

      {/* ── BOTTOM NAV BAR ── */}
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