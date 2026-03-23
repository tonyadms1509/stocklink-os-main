import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May"],
  datasets: [
    {
      label: "Admin",
      data: [40, 55, 60, 70, 85],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      tension: 0.3,
    },
    {
      label: "Contractor",
      data: [30, 45, 50, 65, 80],
      borderColor: "rgb(54, 162, 235)",
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      tension: 0.3,
    },
    {
      label: "Supplier",
      data: [20, 35, 40, 55, 70],
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      tension: 0.3,
    },
    {
      label: "Logistics",
      data: [25, 40, 45, 60, 75],
      borderColor: "rgb(255, 206, 86)",
      backgroundColor: "rgba(255, 206, 86, 0.2)",
      tension: 0.3,
    },
    {
      label: "Driver",
      data: [15, 25, 35, 50, 65],
      borderColor: "rgb(153, 102, 255)",
      backgroundColor: "rgba(153, 102, 255, 0.2)",
      tension: 0.3,
    },
  ],
};

export default function LandingPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">StockLink OS Overview</h2>
      <p className="mb-4">
        A snapshot of system activity across Admin, Contractor, Supplier, Logistics, and Driver dashboards.
      </p>
      <Line data={data} />
    </div>
  );
}
