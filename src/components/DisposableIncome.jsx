

const DisposableIncome = ({transactions}) => {
    const calculateDisposableIncome = () => {
        const totalIncome = transactions
        .filter((transaction) => transaction.transaction_type === "income")
        .reduce((sum, curr) => sum + parseFloat(curr.amount), 0);

    const totalExpenses = transactions
      .filter((transaction) => transaction.transaction_type === "expense")
      .reduce((sum, curr) => sum + parseFloat(curr.amount), 0);

    return totalIncome - totalExpenses;
  };

  return (
    <div className="mt-4">
      <h4>Disposable Income</h4>
      <p>${calculateDisposableIncome().toFixed(2)}</p>
    </div>
  )
}

export default DisposableIncome