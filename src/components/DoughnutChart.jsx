
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = ({data}) => {
  return (
    <div className="chart">
        <Doughnut data={data} />
    </div>
  )
}

export default DoughnutChart;