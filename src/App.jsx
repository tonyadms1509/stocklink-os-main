function App() {
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
          <button style={{
            padding: "12px 24px",
            fontSize: "1rem",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#4CAF50",
            color: "white",
            cursor: "pointer"
          }}>Learn More</button>
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

export default App;
