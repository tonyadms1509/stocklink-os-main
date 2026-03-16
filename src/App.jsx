import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import ContractorPage from './pages/Contractor'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contractor" element={<ContractorPage />} />
      </Routes>
    </Router>
  )
}

export default App

