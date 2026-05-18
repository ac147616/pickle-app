import { Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import FindSpace from './pages/FindSpace'
import Booking from './pages/Booking'
import MyTrips from './pages/MyTrips'
import Account from './pages/Account'
import ListSpace from './pages/ListSpace'
import TripDetails from './pages/TripDetails'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard/:accountId" element={<Dashboard />} />
      <Route path="/find/:accountId" element={<FindSpace />} />
      <Route path="/booking/:accountId/:tripId" element={<Booking />} />
      <Route path="/mytrips/:accountId" element={<MyTrips />} />
      <Route path="/account/:accountId" element={<Account />} />
      <Route path="/listspace/:accountId" element={<ListSpace />} />
      <Route path="/trip/:accountId/:tripId" element={<TripDetails />} />
    </Routes>
  )
}

export default App