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

    for(let transaction of transactions){
      const month = new Date(transaction.transaction_date).getMonth();
      const year = new Date(transaction.transaction_date).getFullYear();
      if(month === currentMonth && year === currentYear && transaction.transaction_type === "income"){
        currentTotalIncome += parseFloat(transaction.amount);
      }
    }

    const expenseCategoryTotals = recentExpenses.reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + parseFloat(transaction.amount);
      return acc;
    }, {});
    
    setDisposableIncome(currentTotalIncome - currentTotalExpenses);
    setExpenseCategories(Object.keys(expenseCategoryTotals))
    setExpenseCategoriesValues(Object.values(expenseCategoryTotals))

  }, [transactions]);

  const expenseChartData = {
    labels: ['Leftover Income', ...expenseCategories],
    datasets: [
      {
        backgroundColor: [
          '#4CAF50', 
          '#FF7043', 
          '#FFEB3B',
          '#29B6F6', 
          '#AB47BC',
          '#FFA726',
          '#FF8A80',  
          '#9C27B0'
        ],
        hoverBackgroundColor: [
        '#66FF66',
        '#FFCCBC', 
        '#FFF176',
        '#81D4FA', 
        '#D1C4E9',
        '#FFF59D',
        '#FF7F7F', 
        '#D05CE3' 
        ],
        borderColor: [
          '#388E3C',
          '#D84315', 
          '#FBC02D', 
          '#0277BD', 
          '#7B1FA2', 
          '#EF6C00',
          '#D32F2F',
          '#7B1FA2'
        ],
        borderWidth: 1,
        data: [disposableIncome, ...expenseCategoriesValues],
      },
    ],
  };

  return (
    <>
      {expenseCategories.length > 0 && (
        <div className="card p-4 my-4 mx-2 justify-content-center d-flex" style={{ width: '400px', height: '450px'}}>
          <h5 className="pb-3">{monthName} Financial Overview</h5>
          <DoughnutChart data={expenseChartData} />
      </div>
      )}
    </>
  )}

export default DisposableIncome;