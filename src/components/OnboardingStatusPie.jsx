import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { createClient } from "@supabase/supabase-js";

ChartJS.register(ArcElement, Tooltip, Legend);

// Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function DealerLocationPie() {
  const [dealerData, setDealerData] = useState([]);

  useEffect(() => {
    async function fetchDealers() {
      const { data, error } = await supabase.from("dealers").select("location");
      if (error) {
        console.error("Supabase dealers error:", error.message);
        setDealerData([]);
      } else {
        // Group dealers by location
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
        backgroundColor: [
          "#ef4444", // red
          "#3b82f6", // blue
          "#10b981", // green
          "#f59e0b", // amber
          "#6366f1", // indigo
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "right" },
      title: { display: true, text: "Dealer Distribution by Location (Pie)" },
    },
  };

  return <Pie data={chartData} options={options} />;
}
