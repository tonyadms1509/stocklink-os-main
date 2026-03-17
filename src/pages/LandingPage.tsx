import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {/* Welcome Banner */}
      <h1 style={{ color: '#203a43' }}>Welcome to StockLink OS</h1>
      <p style={{ fontSize: '18px', marginTop: '10px' }}>
        Streamlined dashboards for Admin, Contractor, Supplier, Logistics, and Driver.
      </p>

      {/* Quick Links */}
      <div style={{ marginTop: '30px' }}>
        <Link to="/admin" style={{ margin: '0 15px', fontSize: '16px', color: '#203a43' }}>Admin Dashboard</Link>
        <Link to="/contractor" style={{ margin: '0 15px', fontSize: '16px', color: '#203a43' }}>Contractor Dashboard</Link>
        <Link to="/supplier" style={{ margin: '0 15px', fontSize: '16px', color: '#203a43' }}>Supplier Dashboard</Link>
        <Link to="/logistics" style={{ margin: '0 15px', fontSize: '16px', color: '#203a43' }}>Logistics Dashboard</Link>
        <Link to="/driver" style={{ margin: '0 15px', fontSize: '16px', color: '#203a43' }}>Driver Dashboard</Link>
      </div>

      {/* Footer */}
      <footer style={{ marginTop: '50px', fontSize: '14px', color: '#555' }}>
        © 2026 StockLink OS — Empowering seamless operations
      </footer>
    </div>
  );
}
