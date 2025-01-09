import { useState, useEffect } from "react";
import Chart from 'chart.js/auto';
import DoughnutChart from "./DoughnutChart.jsx";
import Insights from "./Insights.jsx";

const DisposableIncome = ({transactions}) => {
  const [disposableIncome, setDisposableIncome] = useState(null);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [expenseCategoriesValues, setExpenseCategoriesValues] = useState([]);

  // const [totalLeftoverIncome, setTotalLeftoverIncome] = useState(0);
  // const [allExpenseCategories, setAllExpenseCategories] = useState([]);
  // const [expenseCategoriesSumValues, setExpenseCategoriesSumValues] = useState([]);

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

    // let totalSumExpenses = 0;
    // let totalSumIncome = 0;

    // const totalExpenses = transactions.filter((transaction) => {
    //   if(transaction.transaction_type === "expense"){
    //     totalSumExpenses += parseFloat(transaction.amount);
    //     return transaction
    //   }
    // });

    // for(let transaction of transactions){
    //   if(transaction.transaction_type === "income"){
    //     totalSumIncome += parseFloat(transaction.amount);
    //   }
    // };

    // const expenseCategorySumTotals = totalExpenses.reduce((acc, transaction) => {
    //   acc[transaction.category] = (acc[transaction.category] || 0) + parseFloat(transaction.amount);
    //   return acc;
    // }, {});

    // setTotalLeftoverIncome(totalSumIncome - totalSumExpenses);
    // setAllExpenseCategories(Object.keys(expenseCategorySumTotals))
    // setExpenseCategoriesSumValues(Object.values(expenseCategorySumTotals))

  }, [transactions]);

  const nonGreenColors = [
    '#FF5733', '#3357FF', '#FF33A1', '#FFD700', '#FF4500', 
    '#8A2BE2', '#00CED1', '#7FFF00', '#FF69B4', '#DC143C'
  ];
  const lighterNonGreenColors = [
    '#FF8363', '#637AFF', '#FF63B8', '#FFEA85', '#FF6F55', 
    '#A97BE8', '#5FE7FF', '#B0FF7F', '#FF8ACC', '#FF6673'
  ];

  const expenseChartData = {
    labels: ['Leftover Income', ...expenseCategories],
    datasets: [
      {
        backgroundColor: [
          '#4CAF50',
          ...nonGreenColors.slice(0, expenseCategories.length)
        ],
        hoverBackgroundColor: [
          '#66FF66',
          ...lighterNonGreenColors.slice(0, expenseCategories.length)
        ],
        borderColor: [
          '#388E3C',
          ...nonGreenColors.slice(0, expenseCategories.length)
        ],
        borderWidth: 1,
        data: [disposableIncome, ...expenseCategoriesValues],
      },
    ],
  };

  // const allExpensesTotalsChartData = {
  //   labels: ['Leftover Income', ...allExpenseCategories],
  //   datasets: [
  //     {
  //       backgroundColor: [
  //         '#4CAF50',
  //         ...nonGreenColors.slice(0, allExpenseCategories.length)
  //       ],
  //       hoverBackgroundColor: [
  //         '#66FF66',
  //         ...nonGreenColors.slice(0, allExpenseCategories.length)
  //       ],
  //       borderColor: [
  //         '#388E3C',
  //         ...nonGreenColors.slice(0, allExpenseCategories.length)
  //       ],
  //       borderWidth: 1,
  //       data: [totalLeftoverIncome, ...expenseCategoriesSumValues],
  //     },
  //   ],
  // };

  return (
    <>
      {disposableIncome && (
        <div className="container mb-3">
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
            <DoughnutChart data={expenseChartData} disposableIncome={disposableIncome}/>
          </div>
            <Insights transactions={transactions}/>
        </div> 
      )}
  </>
)}

export default DisposableIncome;