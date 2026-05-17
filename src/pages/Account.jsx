// useParams reads the accountId from the URL
// useNavigate lets you move between pages
import { useParams, useNavigate } from 'react-router-dom'

// Icons used on this screen
import { FaHome, FaSearch, FaBox, FaUser, FaBell, FaCreditCard, FaQuestionCircle, FaChevronRight, FaSignOutAlt } from 'react-icons/fa'

// Dummy account data for each account type
// Each account has different profile info
const accountData = {
  business: {
    name: "Molly's Bakery",
    role: 'Small Business',
    email: 'molly@mollysbakery.co.nz',
    phone: '+64 21 456 789',
    location: 'Auckland, NZ',
    memberSince: 'January 2026',
  },
  truck: {
    name: 'Kiwi Transport Co.',
    role: 'Truck Operator',
    email: 'dispatch@kiwitransport.co.nz',
    phone: '+64 21 123 456',
    location: 'Auckland, NZ',
    memberSince: 'November 2025',
  },
  individual: {
    name: 'Sarah Chen',
    role: 'Individual',
    email: 'sarah.chen@gmail.com',
    phone: '+64 21 987 654',
    location: 'Hamilton, NZ',
    memberSince: 'March 2026',
  },
}

// Settings menu items shown as a list
const settingsItems = [
  {
    icon: FaBell,
    label: 'Notifications',
    sublabel: 'Manage your alerts',
  },
  {
    icon: FaCreditCard,
    label: 'Payment Method',
    sublabel: 'Visa ending 4242',
  },
  {
    icon: FaQuestionCircle,
    label: 'Help & Support',
    sublabel: 'FAQs and contact us',
  },
]

export default function Account() {
  const { accountId } = useParams()
  const navigate = useNavigate()

  // Pick the right account data based on who is logged in
  const data = accountData[accountId] || accountData.business

  return (
    <div className="min-h-screen bg-[#f9e9da] pb-24">

      {/* ── TOP HEADER ── */}
      <div className="bg-[#0c3120] px-5 pt-10 pb-8">

        {/* Profile avatar circle with initial */}
        <div className="flex flex-col items-center">
          <div className="bg-[#f9e9da] rounded-full w-16 h-16 flex items-center justify-center mb-3 px-3">
            <span className="text-[#0c3120] text-2xl"
              style={{ fontFamily: 'Belleza, sans-serif' }}>
              {data.name.charAt(0)}
            </span>
          </div>

          {/* Name and role */}
          <h1 className="text-[#f9e9da] text-xl mb-1"
            style={{ fontFamily: 'Belleza, sans-serif' }}>
            {data.name}
          </h1>
          <span className="text-xs bg-white bg-opacity-10 text-[#f9e9da] rounded-full px-3 py-1.5 mb-2"
            style={{ fontFamily: 'DM Sans, sans-serif' }}>
            {data.role}
          </span>
        </div>
      </div>

      <div className="px-5 pt-5 flex flex-col gap-4">

        {/* ── PROFILE DETAILS CARD ── */}
        <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col gap-3">

          <p className="text-[#0c3120] text-xs opacity-50"
            style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Profile details
          </p>

          {/* Email */}
          <div className="flex justify-between items-center">
            <p className="text-gray-400 text-xs"
              style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Email
            </p>
            <p className="text-[#0c3120] text-xs"
              style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {data.email}
            </p>
          </div>

          <div className="w-full h-px bg-gray-100"></div>

          {/* Phone */}
          <div className="flex justify-between items-center">
            <p className="text-gray-400 text-xs"
              style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Phone
            </p>
            <p className="text-[#0c3120] text-xs"
              style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {data.phone}
            </p>
          </div>

          <div className="w-full h-px bg-gray-100"></div>

          {/* Location */}
          <div className="flex justify-between items-center">
            <p className="text-gray-400 text-xs"
              style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Location
            </p>
            <p className="text-[#0c3120] text-xs"
              style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {data.location}
            </p>
          </div>

          <div className="w-full h-px bg-gray-100"></div>

          {/* Member since */}
          <div className="flex justify-between items-center">
            <p className="text-gray-400 text-xs"
              style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Member since
            </p>
            <p className="text-[#0c3120] text-xs"
              style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {data.memberSince}
            </p>
          </div>
        </div>

        {/* ── SETTINGS ITEMS ── */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {settingsItems.map((item, index) => {
            const IconComponent = item.icon
            return (
              <div key={index}>
                <button className="w-full flex items-center justify-between px-4 py-4 active:bg-gray-50">
                  <div className="flex items-center gap-3">
                    {/* Icon in cream circle */}
                    <div className="bg-[#f9e9da] rounded-full p-2">
                      <IconComponent size={14} color="#0c3120" />
                    </div>
                    <div className="text-left">
                      <p className="text-[#0c3120] text-sm"
                        style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        {item.label}
                      </p>
                      <p className="text-gray-400 text-[10px]"
                        style={{ fontFamily: 'DM Sans, sans-serif' }}>
                        {item.sublabel}
                      </p>
                    </div>
                  </div>
                  {/* Chevron arrow on the right */}
                  <FaChevronRight size={10} color="#9ca3af" />
                </button>
                {/* Divider between items except the last one */}
                {index < settingsItems.length - 1 && (
                  <div className="w-full h-px bg-gray-100"></div>
                )}
              </div>
            )
          })}
        </div>

        {/* ── SWITCH ACCOUNT BUTTON ── */}
        {/* Takes judges back to the login screen to try another account */}
        <button
          onClick={() => navigate('/')}
          className="w-full bg-white border-2 border-[#0c3120] text-[#0c3120] rounded-xl py-3 flex items-center justify-center gap-2 active:scale-95 transition-all duration-150"
          style={{ fontFamily: 'Belleza, sans-serif' }}
        >
          <FaSignOutAlt size={14} color="#0c3120" />
          Log Out
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

        {/* Account is active on this screen */}
        <button className="flex flex-col items-center gap-1">
          <FaUser size={20} color="#0c3120" />
          <span className="text-[10px] text-[#0c3120] font-medium"
            style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Account
          </span>
        </button>

      </div>
    </div>
  )
}