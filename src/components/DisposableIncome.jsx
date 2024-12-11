import { useState, useEffect } from "react";
import Chart from 'chart.js/auto';
import DoughnutChart from "./DoughnutChart.jsx";
import Insights from "./Insights.jsx";

const DisposableIncome = ({transactions}) => {
  const [disposableIncome, setDisposableIncome] = useState(0);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [expenseCategoriesValues, setExpenseCategoriesValues] = useState([]);

  const today = new Date()

  const scrollToTransactions = () => {
    const transactionsTable = document.getElementById("transactions-table");
    if (transactionsTable) {
      transactionsTable.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

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
          '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A1FF33',
          '#33A1FF', '#FF8C33', '#8C33FF', '#33FF8C', '#FF3333',
          '#FFD700', '#FF4500', '#2E8B57', '#9400D3', '#20B2AA',
          '#DC143C', '#8A2BE2', '#00CED1', '#FF69B4', '#7FFF00'
        ],
        hoverBackgroundColor: [
          '#66FF66',
          '#FF8363', '#70FF83', '#637AFF', '#FF63B8', '#C8FF63',
          '#63C8FF', '#FFA05C', '#A863FF', '#63FFC8', '#FF6666',
          '#FFE066', '#FF6347', '#5CB084', '#AE5EDB', '#46D5C5',
          '#F56464', '#A46EFF', '#2CE7E7', '#FF85CB', '#A4FF5C'
        ],
        borderColor: [
          '#388E3C',
          '#CC4629', '#29CC46', '#2946CC', '#CC2992', '#92CC29',
          '#2992CC', '#CC7329', '#7329CC', '#29CC73', '#CC2929',
          '#CCA600', '#CC3300', '#237246', '#6B00B1', '#17908D',
          '#A50F30', '#6B1FB3', '#00A5A5', '#CC508E', '#64CC00'
        ],
        borderWidth: 1,
        data: [disposableIncome, ...expenseCategoriesValues],
      },
    ],
  };

  return (
    <>
      {expenseCategories.length > 0 && (
        <div className="card my-3">
          <p className="text-end mx-4">
            <span
            style={{
              cursor: "pointer",
              color: "#007bff",
            }}
            onClick={scrollToTransactions}
            >
            See my transactions
            </span>
          </p>
          <div className="card-body d-flex justify-content-center" style={{height: '400px'}}>
            <DoughnutChart data={expenseChartData} />
          </div>
            <Insights/>
        </div> 
      )}
  </>
)}

export default DisposableIncome;