import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

export default function LogisticsProfile() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      {
        label: 'Deliveries',
        data: [20, 35, 25, 40],
        borderColor: '#203a43',
        backgroundColor: 'rgba(32,58,67,0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Logistics Dashboard</h2>
      <table border="1" style={{ margin: '20px auto' }}>
        <thead>
          <tr><th>Fleet ID</th><th>Status</th><th>Next Service</th></tr>
        </thead>
        <tbody>
          <tr><td>L001</td><td>Active</td><td>25 Mar 2026</td></tr>
          <tr><td>L002</td><td>In Workshop</td><td>10 Apr 2026</td></tr>
        </tbody>
      </table>
      <Line data={data} />
    </div>
  );
}
