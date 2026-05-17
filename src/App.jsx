// Routes and Route are needed to define the page navigation
import { Routes, Route } from 'react-router-dom'

// Importing all pages so the router knows about them
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import FindSpace from './pages/FindSpace'

function App() {
  return (
    <Routes>
      {/* Homepage shows the login/account picker */}
      <Route path="/" element={<Login />} />

      {/* Dashboard route accepts an accountId in the URL */}
      <Route path="/dashboard/:accountId" element={<Dashboard />} />

      {/* Find space screen */}
      <Route path="/find/:accountId" element={<FindSpace />} />
    </Routes>
  )
}

export default App