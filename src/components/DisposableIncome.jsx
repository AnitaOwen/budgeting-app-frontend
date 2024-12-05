import { useState, useEffect } from "react";
import Chart from 'chart.js/auto';
import DoughnutChart from "./DoughnutChart.jsx";

const DisposableIncome = ({transactions}) => {
  const [disposableIncome, setDisposableIncome] = useState(0);

  const getPast30DaysDate = () => {
    const today = new Date();
    today.setDate(today.getDate() - 30);
    return today;
  };
  const past30DaysDate = getPast30DaysDate();

  const recentExpenses = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return (
      transaction.transaction_type === "expense" &&
      transactionDate >= past30DaysDate
    );
  });

  console.log("Filtered expenses for the past 30 days:", recentExpenses);
  // const categoryTotals = recentExpenses.reduce((acc, transaction) => {
  //   if (!acc[transaction.category]) {
  //     acc[transaction.category] = +transaction.amount;
  //   } else {
  //     acc[transaction.category] += parseFloat(transaction.amount);
  //   }
  //   return acc;
  // }, {});

  // console.log("Filtered expenses for the past 30 days:", recentExpenses);
  // console.log("Category totals:", categoryTotals);

  const categoryTotals = transactions.reduce((acc, transaction) => {
    if (!acc[transaction.category]) {
      acc[transaction.category] = +transaction.amount;
    } else {
      acc[transaction.category] += parseFloat(transaction.amount);
    }
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        backgroundColor: ['#e4d1d1', '#b9b0b0', '#d9ecd0', '#77a8a8', '#E1E8ED', '#d5f4e6'],
        hoverBackgroundColor: ['#e4d1d1', '#b9b0b0', '#d9ecd0', '#77a8a8', '#E1E8ED', '#d5f4e6'],
        data: Object.values(categoryTotals),
      },
    ],
  }

  useEffect(() => {
    const calculateDisposableIncome = () => {
      const totalIncome = transactions
        .filter((transaction) => transaction.transaction_type === "income")
        .reduce((sum, curr) => sum + parseFloat(curr.amount), 0);

      const totalExpenses = transactions
        .filter((transaction) => transaction.transaction_type === "expense")
        .reduce((sum, curr) => sum + parseFloat(curr.amount), 0);

      return totalIncome - totalExpenses;
    };

    setDisposableIncome(calculateDisposableIncome());
  }, [transactions]);
  
  return (
    <div className="card p-4 my-4 mx-2">
      <h4>Disposable Income</h4>
      <p>${disposableIncome.toFixed(2)}</p>
      {/* <div className="chart-container" style={{ width: '300px', height: '300px' }}>
        <DoughnutChart data={chartData} />
      </div> */}
    </div>
  )
}

export default DisposableIncome