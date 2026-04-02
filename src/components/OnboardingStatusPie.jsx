import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function OnboardingStatusPie({ counts }) {
  const data = {
    labels: ["Profiles", "Contractors", "Dealers"],
    datasets: [
      {
        label: "Onboarding Distribution",
        data: [counts.profiles, counts.contractors, counts.dealers],
        backgroundColor: ["#ef4444", "#3b82f6", "#10b981"], // red, blue, green
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: "Onboarding Status Pie" },
    },
  };

  return <Pie data={data} options={options} />;
}
