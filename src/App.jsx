// React Router gives you the ability to show different pages
// based on the URL
import { Routes, Route } from 'react-router-dom'

// Importing both pages so the router knows about them
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Routes>
      {/* Homepage shows the login/account picker */}
      <Route path="/" element={<Login />} />

      {/* Dashboard route accepts an accountId in the URL */}
      {/* e.g. /dashboard/business or /dashboard/truck */}
      <Route path="/dashboard/:accountId" element={<Dashboard />} />
    </Routes>
  )
}

export default App