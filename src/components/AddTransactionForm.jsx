import { useState } from "react";


const AddTransactionForm = ({id, setTransactions, setShowTransactionForm}) => {
  const URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  
  const [newTransaction, setNewTransaction] = useState({
    transaction_type: "",
    amount: "",
    category: "",
    transaction_date: "",
  })


  const handleTextChange = (event) => {
    setNewTransaction({ ...newTransaction, [event.target.id]: event.target.value });
  }
    
  const handleSubmit = async (event) => {
    event.preventDefault();

    const transactionToSend = {
      ...newTransaction,
      amount: parseFloat(newTransaction.amount),
      user_id: id,
    };

    try {
      const response = await fetch(`${URL}/api/transactions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionToSend),
      });

      if (!response.ok) {
        throw new Error(`Failed to add transaction: ${response.status}`);
      }

      const updatedTransactions = await response.json();
      setTransactions(updatedTransactions);
      setNewTransaction({
        transaction_type: "",
        amount: "",
        category: "",
        transaction_date: "",
      })
      setShowTransactionForm(false); 
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  }
  return (
    <div className="mt-4 text-center container-sm">
      <h4 className="mb-5">Add a new transaction</h4>
      <form onSubmit={handleSubmit} className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <div className="mb-3">
            <label htmlFor="transaction_type" className="form-label">Transaction Type</label>
            <select
              className="form-control"
              id="transaction_type"
              value={newTransaction.transaction_type}
              type="text"
              onChange={handleTextChange}
              required
            >
              <option value="" disabled>Select Type</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <select 
              className="form-control"
              id="category"
              type="text"
              value={newTransaction.category}
              onChange={handleTextChange}
              required
            >
              <option value="" disabled>Select Category</option>
              <option value="Salary/Income">Salary</option>
              <option value="Transportation">Transportation</option>
              <option value="Utilities">Utilities</option>
              <option value="Rent/Mortgage">Rent/Mortgage</option>
              <option value="Groceries">Groceries</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Insurance">Insurance</option>
              <option value="Debt Repayment">Debt Repayment</option>
              <option value="Savings">Savings</option>
              <option value="Gifts/Donations">Gifts/Donations</option>
              <option value="Dining Out">Dining Out</option>
              <option value="Education">Education</option>
              <option value="Investment">Investment</option>
              <option value="Childcare">Childcare</option>
              <option value="Miscellaneous">Miscellaneous</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">Amount</label>
            <input 
              className="form-control"
              id="amount"
              type="text"
              value={newTransaction.amount}
              onChange={handleTextChange}
              placeholder="0.00"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="transaction_date" className="form-label">Date of Transaction</label>
            <input 
              className="form-control"
              id="transaction_date"
              type="date"
              value={newTransaction.transaction_date}
              onChange={handleTextChange}
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <button 
          type="submit" 
          className="btn btn-info mb-3 mt-4">
            Submit</button>
        </div>
      </form>
    </div>
  )
}

export default AddTransactionForm