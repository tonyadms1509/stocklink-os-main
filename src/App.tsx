import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import LandingPage from './pages/LandingPage';
import Admin from './pages/admin/Admin';
import Contractor from './pages/contractor/Contractor';
import SupplierProfile from './pages/supplier/SupplierProfile';
import LogisticsProfile from './pages/logistics/LogisticsProfile';
import Driver from './pages/driver/Driver';

function App() {
  return (
    <Router>
      {/* Persistent navigation bar */}
      <NavBar />

      {/* Route definitions */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/contractor" element={<Contractor />} />
        <Route path="/supplier" element={<SupplierProfile />} />
        <Route path="/logistics" element={<LogisticsProfile />} />
        <Route path="/driver" element={<Driver />} />
      </Routes>
    </Router>
  );
}

export default App;
