import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function OnboardingStatusChart({ counts }) {
  const data = {
    labels: ["Profiles", "Contractors", "Dealers"],
    datasets: [
      {
        label: "Onboarding Counts",
        data: [counts.profiles, counts.contractors, counts.dealers],
        backgroundColor: ["#ef4444", "#3b82f6", "#10b981"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Onboarding Status Chart" },
    },
  };

  return <Bar data={data} options={options} />;
}
