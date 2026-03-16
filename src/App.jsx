import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Supplier from "./pages/Supplier";
import Contractor from "./pages/Contractor";
import LandingPage from "./pages/LandingPage";

import Admin from "./pages/Admin";
import Signup from "./pages/Signup";
import "./index.css";

function App() {
  return (
    <Router>
      {/* Deployment 4 visuals */}
      <div className="banner">StockLinkSA — Deployment 4</div>
      <div className="tagline">Building trust, step by step</div>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/supplier" element={<Supplier />} />
        <Route path="/contractor" element={<Contractor />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>

      {/* Footer */}
      <footer>© 2026 StockLinkSA. All rights reserved.</footer>
    </Router>
  );
}

export default App;
