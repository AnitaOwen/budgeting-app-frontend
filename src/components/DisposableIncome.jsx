import { useState, useEffect } from "react";
import Chart from 'chart.js/auto';
import DoughnutChart from "./DoughnutChart.jsx";


const DisposableIncome = ({transactions}) => {
  const [disposableIncome, setDisposableIncome] = useState(0);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [expenseCategoriesValues, setExpenseCategoriesValues] = useState([]);

  const today = new Date()
  const monthName = today.toLocaleString('default', { month: 'long' });


  useEffect(() => {

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear(); 

    let currentTotalExpenses = 0;
    let currentTotalIncome = 0;
    
    const recentExpenses = transactions.filter((transaction) => {
      const month = new Date(transaction.transaction_date).getMonth();
      const year = new Date(transaction.transaction_date).getFullYear();
      if(month === currentMonth && year === currentYear && transaction.transaction_type === "expense"){
        currentTotalExpenses += parseFloat(transaction.amount);
        return transaction
      }
    });
    
    const recentTotalIncome = transactions.filter((transaction) => {
      const month = new Date(transaction.transaction_date).getMonth();
      const year = new Date(transaction.transaction_date).getFullYear();
      if(month === currentMonth && year === currentYear && transaction.transaction_type === "income"){
        currentTotalIncome += parseFloat(transaction.amount);
        return transaction
      }
    })

    const expenseCategoryTotals = recentExpenses.reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + parseFloat(transaction.amount);
      return acc;
    }, {});
    
    setDisposableIncome(currentTotalIncome - currentTotalExpenses);
    setExpenseCategories(Object.keys(expenseCategoryTotals))
    setExpenseCategoriesValues(Object.values(expenseCategoryTotals))

  }, [transactions]);

  const expenseChartData = {
    labels: ['Disposable Income', ...expenseCategories],
    datasets: [
      {
        backgroundColor: [
          '#4CAF50', // Green for disposable income
          '#FF7043', 
          '#FFCA28', 
          '#29B6F6', 
          '#AB47BC',
          '#FFA726',
          '#66BB6A',
        ],
        hoverBackgroundColor: [
        '#66FF66',// Brighter green for disposable income
        '#FFCCBC', 
        '#FFECB3',
        '#81D4FA', 
        '#D1C4E9',
        '#FFE0B2', 
        '#A5D6A7',
      ],
        borderColor: [
          '#388E3C',
          '#D84315', 
          '#F57C00', 
          '#0277BD', 
          '#7B1FA2', 
          '#EF6C00',
          '#2E7D32', 
        ],
        borderWidth: 1,
        data: [disposableIncome, ...expenseCategoriesValues],
      },
    ],
  };

  return (
    <div className="card p-4 my-4 mx-2 justify-content-center d-flex">
      <div style={{ width: '400px', height: '450px'}}>
        <h4>{monthName} Income and Expenses</h4>
        <DoughnutChart data={expenseChartData} />
      </div>
    </div>
  )
}

export default DisposableIncome;