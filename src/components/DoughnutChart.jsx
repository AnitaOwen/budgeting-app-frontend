
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = ({data}) => {
  return (
    <>
      <Doughnut
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'right',
              labels: {
                font: {
                  size: 14,
                },
                padding: 20, 
              },
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => {
                  const label =
                    tooltipItem.chart.data.labels[tooltipItem.dataIndex] || '';
                  const amount =
                    tooltipItem.raw || 0;
                  return `$${amount.toFixed(2)}`;
                },
              },
              backgroundColor: '#fff',
              titleColor: '#333',
              bodyColor: '#333',
              borderColor: '#ccc',
              borderWidth: 1,
            },
            title: {
              display: true,
              text: 'Expense Distribution for This Month',
              font: {
                size: 18,
              },
              color: '#333',
            },
          },
        }}
      />
    </>
  )
}

export default DoughnutChart;