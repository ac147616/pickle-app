// useParams reads accountId and tripId from the URL
// useNavigate lets you move between pages
import { useParams, useNavigate } from 'react-router-dom'

// Icons used on this screen
import { FaArrowLeft, FaStar, FaTruck, FaPhone, FaEnvelope, FaHome, FaSearch, FaBox, FaUser, FaPlus } from 'react-icons/fa'

// Same trip data as FindSpace with added driver/company info
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
    // Driver/company contact info
    driverName: 'James Tana',
    phone: '+64 21 345 678',
    email: 'dispatch@kiwitransport.co.nz',
    about: 'Kiwi Transport Co. has been operating inter-city freight routes across New Zealand since 2018. Fully insured with a 98% on-time delivery rate.',
    typicalPrice: '$45–$80 per booking',
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
    driverName: 'Mike Taufa',
    phone: '+64 21 567 890',
    email: 'mike.taufa@gmail.com',
    about: 'Private owner-operator making regular runs between Auckland and Wellington. Happy to carry small loads and personal items. Very reliable and easy to deal with.',
    typicalPrice: '$30–$60 per booking',
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
    driverName: 'Raj Patel',
    phone: '+64 21 789 012',
    email: 'raj@nzexpresshaulage.co.nz',
    about: 'NZ Express Haulage specialises in chilled and ambient freight between major NZ cities. Refrigerated trucks available for perishable goods.',
    typicalPrice: '$55–$90 per booking',
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
    driverName: 'Dave Kirino',
    phone: '+64 21 234 567',
    email: 'davekirino@gmail.com',
    about: 'Private driver doing regular Auckland to Wellington runs for work. Happy to take small loads along the way at a good price.',
    typicalPrice: '$25–$55 per booking',
  },
]

export default function TripDetails() {
  const { accountId, tripId } = useParams()
  const navigate = useNavigate()

  // Find the right trip from the URL tripId
  const trip = dummyTrips.find((t) => t.id === parseInt(tripId))

  const isTruck = accountId === 'truck'

  if (!trip) {
    return (
      <div className="min-h-screen bg-[#f9e9da] flex items-center justify-center">
        <p className="text-[#0c3120]" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Trip not found.
        </p>
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
          Trip Details
        </h1>
        <p className="text-[#f9e9da] text-xs opacity-50 mt-1"
          style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Review before booking
        </p>
      </div>

      <div className="px-5 pt-5 flex flex-col gap-3">

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

        {/* ── DELIVERY SUMMARY CARD ── */}
        <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-3">

          <p className="text-[#0c3120] text-xs opacity-50"
            style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Delivery summary
          </p>

          {/* Route row */}
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

          {/* Details grid */}
          <div className="grid grid-cols-3 gap-2">
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
            <div>
              <p className="text-[10px] text-gray-400 mb-0.5"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Departure
              </p>
              <p className="text-[#0c3120] text-xs font-medium"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {trip.departure}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 mb-0.5"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Arrival
              </p>
              <p className="text-[#0c3120] text-xs font-medium"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {trip.arrival}
              </p>
            </div>
          </div>

          <div className="w-full h-px bg-gray-100"></div>

          {/* Space and price */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-[10px] text-gray-400 mb-0.5"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Space available
              </p>
              <p className="text-[#0c3120] text-xs font-medium"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {trip.spaceAvailable}m³
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-400 mb-0.5"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Typical price
              </p>
              <p className="text-[#0c3120] text-sm"
                style={{ fontFamily: 'Belleza, sans-serif' }}>
                {trip.typicalPrice}
              </p>
            </div>
          </div>
        </div>

        {/* ── DRIVER/COMPANY INFO CARD ── */}
        <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-3">

          <p className="text-[#0c3120] text-xs opacity-50"
            style={{ fontFamily: 'DM Sans, sans-serif' }}>
            About the carrier
          </p>

          {/* Driver name */}
          <p className="text-[#0c3120] text-sm"
            style={{ fontFamily: 'Belleza, sans-serif' }}>
            {trip.driverName}
          </p>

          {/* About text */}
          <p className="text-gray-400 text-xs leading-relaxed"
            style={{ fontFamily: 'DM Sans, sans-serif' }}>
            {trip.about}
          </p>

          <div className="w-full h-px bg-gray-100"></div>

          {/* Contact info */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="bg-[#f9e9da] rounded-full p-2">
                <FaPhone size={11} color="#0c3120" />
              </div>
              <p className="text-[#0c3120] text-xs"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {trip.phone}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-[#f9e9da] rounded-full p-2">
                <FaEnvelope size={11} color="#0c3120" />
              </div>
              <p className="text-[#0c3120] text-xs"
                style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {trip.email}
              </p>
            </div>
          </div>
        </div>

        {/* ── BOOK BUTTON ── */}
        <button
          onClick={() => navigate(`/booking/${accountId}/${trip.id}`)}
          className="w-full bg-[#0c3120] text-[#f9e9da] rounded-xl py-4 active:scale-95 transition-all duration-150"
          style={{ fontFamily: 'Belleza, sans-serif' }}
        >
          Book This Trip
        </button>

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

        {/* Find is active across the booking flow */}
        <button className="flex flex-col items-center gap-1">
          {isTruck
            ? <FaPlus size={20} color="#0c3120" />
            : <FaSearch size={20} color="#0c3120" />
          }
          <span className="text-[10px] text-[#0c3120] font-medium"
            style={{ fontFamily: 'DM Sans, sans-serif' }}>
            {isTruck ? 'List Space' : 'Find'}
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