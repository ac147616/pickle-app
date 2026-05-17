// useParams lets you read the accountId from the URL
// useNavigate lets you move between pages
import { useParams, useNavigate } from 'react-router-dom'

// Recharts gives you the donut ring chart
import { PieChart, Pie, Cell } from 'recharts'

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
      route: 'AKL → Tauranga',
      status: 'Delivered',
      date: '3 May 2026',
      price: '$112.00',
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
        {/* Outer ring: active deliveries as % of total */}
        {/* Inner ring: freight cost saved as % of traditional cost */}
        <div className="relative flex items-center justify-center flex-shrink-0">
        <PieChart width={100} height={100}>

            {/* ── OUTER RING — active deliveries ratio ── */}
            <Pie
            data={[
                // Green slice: active deliveries out of total
                { value: 2 },
                // Remaining slice: completed
                { value: 12 - 2 },
            ]}
            cx={45}
            cy={45}
            innerRadius={42}
            outerRadius={48}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            // strokeWidth 0 removes the glitch lines between slices
            strokeWidth={0}
            isAnimationActive={false}
            >
            {/* Active portion in green */}
            <Cell fill="#4ade80" />
            {/* Remaining in faded white */}
            <Cell fill="rgba(255,255,255,0.1)" />
            </Pie>

            {/* ── INNER RING — freight savings ── */}
            <Pie
            data={[
                { value: data.savings.amount },
                { value: data.savings.traditional - data.savings.amount },
            ]}
            cx={45}
            cy={45}
            innerRadius={28}
            outerRadius={38}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            strokeWidth={0}
            isAnimationActive={false}
            >
            <Cell fill="#f9e9da" />
            <Cell fill="rgba(255,255,255,0.1)" />
            </Pie>

        </PieChart>

        {/* Savings percentage in center of inner ring */}
        <div className="absolute flex flex-col items-center justify-center">
            <span className="text-[#f9e9da] text-sm font-bold"
            style={{ fontFamily: 'Belleza, sans-serif' }}>
            {Math.round((data.savings.amount / data.savings.traditional) * 100)}%
            </span>
        </div>
        </div>

        {/* ── RIGHT SIDE STATS ── */}
        <div className="flex flex-col gap-2 flex-1">

        {/* Freight saved */}
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

        {/* CO2 saved */}
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

        {/* Active deliveries with green dot */}
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

        <button className="flex flex-col items-center gap-1">
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