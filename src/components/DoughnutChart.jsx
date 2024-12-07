
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = ({data}) => {
  return (
    <div className="chart">
      <Doughnut
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                font: {
                  size: 14,
                },
                padding: 20, // Adds space between legend items
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
          },
        }}
      />
    </div>
  )
}

export default DoughnutChart;