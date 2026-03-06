import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <section style={{
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        color: "white",
        textAlign: "center",
        padding: "80px 20px"
      }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "20px" }}>🚀 StockLink Ferrari</h1>
        <p style={{ fontSize: "1.5rem", marginBottom: "40px" }}>
          Seamless, Secure, Credible — Trust First
        </p>
        <div>
          <Link to="/login">
            <button style={{
              marginRight: "15px",
              padding: "12px 24px",
              fontSize: "1rem",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#ff4b2b",
              color: "white",
              cursor: "pointer"
            }}>Login</button>
          </Link>
          <Link to="/about">
            <button style={{
              padding: "12px 24px",
              fontSize: "1rem",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#4CAF50",
              color: "white",
              cursor: "pointer"
            }}>Learn More</button>
          </Link>
        </div>
      </section>

      <section style={{ textAlign: "center", padding: "40px 20px" }}>
        <h2>Why StockLink Ferrari?</h2>
        <ul style={{ listStyle: "none", padding: 0, fontSize: "1.2rem" }}>
          <li>🔐 Secure Authentication</li>
          <li>📊 Transparent Dashboards</li>
          <li>💸 Credible Payout Lifecycle</li>
          <li>⚡ Demo‑Ready in Under 2 Minutes</li>
        </ul>
      </section>

      <footer style={{
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#f5f5f5",
        fontSize: "0.9rem"
      }}>
        © 2026 StockLink Ferrari | Contact | About
      </footer>
    </div>
  );
}

function Login() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login to StockLink Ferrari</h2>
      <form style={{ display: "inline-block", marginTop: "20px" }}>
        <input type="text" placeholder="Username" style={{ display: "block", margin: "10px auto", padding: "10px" }} />
        <input type="password" placeholder="Password" style={{ display: "block", margin: "10px auto", padding: "10px" }} />
        <button style={{ padding: "10px 20px", backgroundColor: "#ff4b2b", color: "white", border: "none", borderRadius: "5px" }}>
          Submit
        </button>
      </form>
    </div>
  );
}

function About() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>About StockLink Ferrari</h2>
      <p>StockLink Ferrari is built for seamless authentication, transparent dashboards, and credible payouts.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
