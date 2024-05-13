import React, { useContext } from 'react';
import { BalanceContext } from './Profile'; // Import BalanceContext from Profile
import { Bar } from 'react-chartjs-2'; // Import Bar from Chart.js
import '../components/BalanceChart.css';

function BalanceChart() {
  const balance = useContext(BalanceContext); // Access balance from context

  // Define chart data
  const data = {
    labels: ['Total Balance'],
    datasets: [
      {
        label: 'Balance',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [balance.toFixed(2)],
      },
    ],
  };

  // Define chart options
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div className='balance-chart'>
      <Bar data={data} options={options} />
    </div>
  );
}

export default BalanceChart;
