import { useState, useEffect } from "react";

const DisposableIncome = ({transactions}) => {
  const [disposableIncome, setDisposableIncome] = useState(0);

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
    <div className="mt-4">
      <h4>Disposable Income</h4>
      <p>${disposableIncome.toFixed(2)}</p>
    </div>
  )
}

export default DisposableIncome