
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = ({data, disposableIncome, expenseCategoriesValues}) => {

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentMonth = new Date().getUTCMonth();
  const monthName = monthNames[currentMonth];
  
  const expenseTotal = expenseCategoriesValues.reduce((a, b) => a + b, 0)
  return (
    <>
      <Doughnut
        data={data}
        options={{
          animation: {
            duration: 1700,
            easing: 'easeOutBounce', 
          },
          responsive: true,
          plugins: {
            legend: {
              position: 'right',
              labels: {
                font: {
                  size: 12,
                },
                padding: 20, 
                usePointStyle: true,
                pointStyle: 'circle',
              },
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  const amount = tooltipItem.raw || 0;
                  return `$${amount.toFixed(2)}`;
                },
              },
              backgroundColor: '#fff',
              titleColor: '#333',
              bodyColor: '#333',
              borderColor: '#ccc',
              borderWidth: 1,
              bodyFont: {
                size: 14,
              },
              titleFont: {
                size: 16,
              },
            },
            title: {
              display: true,
              text: `Expense Distribution for ${monthName}`,
              font: {
                size: 16,
              },
              color: '#333',
            },
            subtitle: {
              display: true,
              text: `${monthName} Income Earned: $${disposableIncome + expenseTotal}       ${monthName} Spending: $${expenseTotal}`,
              font: { size: 14 },
              color: '#555',
            },
          },
        }}
      />
    </>
  )
}

export default DoughnutChart;