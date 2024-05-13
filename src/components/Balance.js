import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import db, { auth } from '../firebase';
import '../components/Balance.css';

function Balance() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [transactionData, setTransactionData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userId = currentUser.uid;
          const userTransactionsRef = db.collection('transactions').where('userId', '==', userId);
          const userTransactionsSnapshot = await userTransactionsRef.get();

          const transactionsByDay = {};
          userTransactionsSnapshot.forEach((doc) => {
            const data = doc.data();
            const date = data.date.toDate().toLocaleDateString();
            if (transactionsByDay[date]) {
              transactionsByDay[date] += data.amount;
            } else {
              transactionsByDay[date] = data.amount;
            }
          });
          setTransactionData(transactionsByDay);
        } else {
          console.error('Current user not found');
        }
      } catch (error) {
        console.error('Error fetching transaction data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartInstance.current !== null) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(transactionData),
        datasets: [{
          label: 'Total Transactions',
          data: Object.values(transactionData),
          backgroundColor: '#E0E0E0',
          borderWidth: 0,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: false,
            text: 'Total Transactions by Day',
            padding: {
              top: 10,
              bottom: 10,
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Total Sum'
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current !== null) {
        chartInstance.current.destroy();
      }
    };
  }, [transactionData]);

  return (
    <div className='balance'>
      <div className='balance_Content'>
        <p>Total Transactions by Day</p>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}

export default Balance;
