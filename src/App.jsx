// Routes and Route are needed to define the page navigation
import { Routes, Route } from 'react-router-dom'

// Importing all pages so the router knows about them
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import FindSpace from './pages/FindSpace'
import Booking from './pages/Booking'

function App() {
  return (
    <Routes>
      {/* Homepage shows the login/account picker */}
      <Route path="/" element={<Login />} />

      {/* Dashboard route accepts an accountId in the URL */}
      <Route path="/dashboard/:accountId" element={<Dashboard />} />

      {/* Find space screen */}
      <Route path="/find/:accountId" element={<FindSpace />} />

      {/* Booking confirmation screen */}
      {/* tripId tells it which trip the user selected */}
      <Route path="/booking/:accountId/:tripId" element={<Booking />} />
    </Routes>
  )
}

export default App