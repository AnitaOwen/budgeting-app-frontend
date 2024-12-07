
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = ({data}) => {
  return (
    <div className="chart">
        <Doughnut data={data} 
        options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    const label = tooltipItem.label;
                    const amount = tooltipItem.raw;
                    return `${label}: $${amount.toFixed(2)}`;
                  }
                }
              }
            }
          }} 
        />
    </div>
  )
}

export default DoughnutChart;