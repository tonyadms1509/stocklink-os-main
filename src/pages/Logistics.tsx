import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function Logistics() {
  const data = {
    labels: ["Pretoria → Cape Town", "Johannesburg → Durban", "Bloemfontein → Port Elizabeth"],
    datasets: [
      {
        label: "ETA (hours)",
        data: [12, 6, 8],
        borderColor: "#d32f2f",
        backgroundColor: "rgba(211,47,47,0.2)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Logistics Dashboard</h2>
      <table border="1" style={{ margin: "20px auto" }}>
        <thead>
          <tr><th>Route</th><th>Status</th><th>ETA</th></tr>
        </thead>
        <tbody>
          <tr><td>Pretoria → Cape Town</td><td>In Transit</td><td>12 hrs</td></tr>
          <tr><td>Johannesburg → Durban</td><td>Delayed</td><td>6 hrs</td></tr>
          <tr><td>Bloemfontein → Port Elizabeth</td><td>On Schedule</td><td>8 hrs</td></tr>
        </tbody>
      </table>
      <Line data={data} />
    </div>
  );
}
