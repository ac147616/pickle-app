import { Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import FindSpace from './pages/FindSpace'
import Booking from './pages/Booking'
import MyTrips from './pages/MyTrips'

function App() {
  return (
    <Routes>
      {/* Homepage shows the login/account picker */}
      <Route path="/" element={<Login />} />

      {/* Dashboard */}
      <Route path="/dashboard/:accountId" element={<Dashboard />} />

      {/* Find space screen */}
      <Route path="/find/:accountId" element={<FindSpace />} />

      {/* Booking confirmation */}
      <Route path="/booking/:accountId/:tripId" element={<Booking />} />

      {/* My trips screen */}
      <Route path="/mytrips/:accountId" element={<MyTrips />} />
    </Routes>
  )
}

export default App