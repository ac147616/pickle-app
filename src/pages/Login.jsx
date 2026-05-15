// useNavigate lets you move between pages programmatically
// when a button is clicked for example
import { useNavigate } from 'react-router-dom'

// These are the three dummy accounts judges can tap into
// Each has an id that gets passed into the URL when selected
const accounts = [
  {
    id: 'truck',
    name: 'Kiwi Transport Co.',
    role: 'Truck Operator',
    // This description shows under the name on the card
    description: 'List spare truck space, manage bookings and track earnings on your routes.',
    emoji: '🚛',
  },
  {
    id: 'business',
    name: "Molly's Bakery",
    role: 'Small Business',
    description: 'Find affordable freight space for your deliveries across New Zealand.',
    emoji: '🏪',
  },
  {
    id: 'individual',
    name: 'Sarah Chen',
    role: 'Individual',
    description: 'Move personal items or single loads between cities, quickly and cheaply.',
    emoji: '📦',
  },
]

export default function Login() {
  // useNavigate gives you a function to change the page
  const navigate = useNavigate()

  return (
    // Full screen container with brand cream background
    // flex flex-col centers everything vertically and horizontally
    <div className="min-h-screen bg-[#f9e9da] flex flex-col items-center justify-center px-5 py-12">

      {/* ── LOGO BLOCK ── */}
      {/* Dark green pill containing the PICK/e wordmark */}
      <div className="bg-[#0c3120] px-8 py-4 rounded-2xl mb-3">
        <span className="text-[#f9e9da] text-4xl tracking-widest"
          style={{ fontFamily: 'Belleza, sans-serif' }}>
          PICK/e
        </span>
      </div>

      {/* Tagline sitting just below the logo */}
      <p className="text-[#0c3120] text-sm mt-3 mb-10 text-center opacity-60"
        style={{ fontFamily: 'DM Sans, sans-serif' }}>
        Smarter freight. Shared journeys.
      </p>

      {/* ── HEADING ── */}
      <h1 className="text-[#0c3120] text-2xl mb-1 text-center"
        style={{ fontFamily: 'Belleza, sans-serif' }}>
        Choose your account
      </h1>

      {/* Subtitle explaining this is a demo tap-to-enter login */}
      <p className="text-sm text-center text-gray-400 mb-8"
        style={{ fontFamily: 'DM Sans, sans-serif' }}>
        Tap a profile to explore the platform
      </p>

      {/* ── ACCOUNT CARDS ── */}
      {/* gap-4 spaces the cards evenly, max-w-sm keeps it phone width */}
      <div className="flex flex-col gap-4 w-full max-w-sm">

        {/* Loop through each account and render a card for it */}
        {accounts.map((account) => (
          <button
            key={account.id}
            // When tapped, navigate to that account's dashboard
            // The account id becomes part of the URL e.g. /dashboard/truck
            onClick={() => navigate(`/dashboard/${account.id}`)}
            className="bg-white border-2 border-transparent rounded-2xl p-5 text-left shadow-sm transition-all duration-200 hover:border-[#0c3120] hover:shadow-md active:scale-95"
          >
            {/* Top row: emoji icon + name and role badge */}
            <div className="flex items-center gap-4">

              {/* Large emoji acting as the account avatar */}
              <div className="text-4xl">{account.emoji}</div>

              <div>
                {/* Account name in Belleza */}
                <p className="text-[#0c3120] text-lg leading-tight"
                  style={{ fontFamily: 'Belleza, sans-serif' }}>
                  {account.name}
                </p>

                {/* Small dark green pill showing the role type */}
                <span className="inline-block text-xs bg-[#0c3120] text-[#f9e9da] rounded-full px-2 py-0.5 mt-1"
                  style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  {account.role}
                </span>
              </div>
            </div>

            {/* Description text below the name */}
            <p className="text-sm text-gray-400 mt-3 leading-relaxed"
              style={{ fontFamily: 'DM Sans, sans-serif' }}>
              {account.description}
            </p>

          </button>
        ))}
      </div>

      {/* ── FOOTER ── */}
      {/* Small note at the bottom clarifying this is a demo */}
      <p className="text-xs text-gray-300 mt-10 text-center">
            PICK/e © 2026
      </p>

    </div>
  )
}