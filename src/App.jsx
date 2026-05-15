// React Router gives us the ability to show different pages
// based on the URL, like a real multi-page app
import { Routes, Route } from 'react-router-dom'

// We import the Login page we'll create in the next step
import Login from './pages/Login'

// App is the root component — everything flows through here
// Think of it like the main menu that decides what page to show
function App() {
  return (
    // Routes is the container that holds all our page definitions
    <Routes>
      {/* When the URL is "/" (the homepage), show the Login page */}
      <Route path="/" element={<Login />} />

      {/* We'll add more routes here as we build more screens */}
    </Routes>
  )
}

export default App