import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { createClient } from "@supabase/supabase-js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function DealerLocationChart() {
  const [dealerData, setDealerData] = useState([]);

  useEffect(() => {
    async function fetchDealers() {
      const { data, error } = await supabase.from("dealers").select("location");
      if (error) {
        console.error("Supabase dealers error:", error.message);
        setDealerData([]);
      } else {
        const counts = {};
        data.forEach((d) => {
          const loc = d.location || "Unknown";
          counts[loc] = (counts[loc] || 0) + 1;
        });
        setDealerData(Object.entries(counts));
      }
    }
    fetchDealers();
  }, []);

  const labels = dealerData.map(([loc]) => loc);
  const values = dealerData.map(([_, count]) => count);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Dealers per Location",
        data: values,
        backgroundColor: "#3b82f6", // blue bars
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Dealer Distribution by Location (Bar)" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return <Bar data={chartData} options={options} />;
}
