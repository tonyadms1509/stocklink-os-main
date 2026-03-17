import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function Contractor() {
  const data = {
    labels: ["Active", "Pending", "Completed"],
    datasets: [
      {
        label: "Contracts",
        data: [5, 3, 7],
        backgroundColor: ["#203a43", "#d32f2f", "#4caf50"],
      },
    ],
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Contractor Dashboard</h2>
      <table border="1" style={{ margin: "20px auto" }}>
        <thead>
          <tr><th>Contract ID</th><th>Status</th><th>Deadline</th></tr>
        </thead>
        <tbody>
          <tr><td>001</td><td>Active</td><td>30 Mar 2026</td></tr>
          <tr><td>002</td><td>Pending</td><td>15 Apr 2026</td></tr>
        </tbody>
      </table>
      <Bar data={data} />
    </div>
  );
}
