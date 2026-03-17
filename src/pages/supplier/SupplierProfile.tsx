import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

export default function SupplierProfile() {
  const data = {
    labels: ['Raw Materials', 'Components', 'Finished Goods'],
    datasets: [
      {
        label: 'Supplier Orders',
        data: [12, 8, 5],
        backgroundColor: ['#203a43', '#fbc02d', '#4caf50'],
      },
    ],
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Supplier Dashboard</h2>
      <table border="1" style={{ margin: '20px auto' }}>
        <thead>
          <tr><th>Supplier ID</th><th>Category</th><th>Status</th></tr>
        </thead>
        <tbody>
          <tr><td>S001</td><td>Raw Materials</td><td>Active</td></tr>
          <tr><td>S002</td><td>Components</td><td>Pending</td></tr>
          <tr><td>S003</td><td>Finished Goods</td><td>Completed</td></tr>
        </tbody>
      </table>
      <Pie data={data} />
    </div>
  );
}
