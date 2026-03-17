import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

export default function Driver() {
  const data = {
    labels: ['On Duty', 'Off Duty', 'In Transit'],
    datasets: [
      {
        label: 'Driver Status',
        data: [10, 4, 6],
        backgroundColor: ['#4caf50', '#fbc02d', '#203a43'],
      },
    ],
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Driver Dashboard</h2>
      <table border="1" style={{ margin: '20px auto' }}>
        <thead>
          <tr><th>Driver ID</th><th>Status</th><th>Last Trip</th></tr>
        </thead>
        <tbody>
          <tr><td>D001</td><td>On Duty</td><td>Johannesburg → Pretoria</td></tr>
          <tr><td>D002</td><td>Off Duty</td><td>—</td></tr>
          <tr><td>D003</td><td>In Transit</td><td>Durban → Cape Town</td></tr>
        </tbody>
      </table>
      <Doughnut data={data} />
    </div>
  );
}
