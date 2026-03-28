export default function Home() {
  const dealers = [
    {
      name: "AutoWorld Johannesburg",
      address: "123 Main Road",
      phone: "+27 11 555 1234",
      vehicles: 3,
    },
    {
      name: "CapeTown Motors",
      address: "456 Long Street",
      phone: "+27 21 555 5678",
      vehicles: 3,
    },
    {
      name: "Durban Auto Centre",
      address: "789 Marine Parade",
      phone: "+27 31 555 7890",
      vehicles: 3,
    },
    {
      name: "Pretoria Car Hub",
      address: "101 Church Street",
      phone: "+27 12 555 1010",
      vehicles: 3,
    },
    {
      name: "Bloemfontein Wheels",
      address: "202 Market Square",
      phone: "+27 51 555 2020",
      vehicles: 3,
    },
    {
      name: "Polokwane Motors",
      address: "303 Limpopo Road",
      phone: "+27 15 555 3030",
      vehicles: 3,
    },
  ];

  return (
    <main>
      <section className="hero-banner">
        <h1>StockLinkSA — Trusted Nationwide</h1>
        <img
          src="/assets/dashboard-poster.png"
          alt="StockLinkSA Vehicle Inventory Dashboard"
          className="hero-image"
        />
        <p className="hero-summary">18 Vehicles Seeded · R9M+ Total Value</p>
      </section>

      <section className="dealer-spotlights">
        {dealers.map((dealer, index) => (
          <div key={index} className="dealer-card">
            <h2>{dealer.name}</h2>
            <p>📍 {dealer.address}</p>
            <p>📞 {dealer.phone}</p>
            <p>🚗 {dealer.vehicles} Vehicles</p>
          </div>
        ))}
      </section>
    </main>
  );
}
