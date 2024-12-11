import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faTimes, faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";
import AddTransactionForm from './AddTransactionForm';
import DisposableIncome from './DisposableIncome';
import UpdatePasswordForm from './UpdatePasswordForm';
import deleteTransaction from '../helpers/deleteTransaction';
import formatDate from '../helpers/formatDate';

const Dashboard = () => {
  const URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [transactions, setTransactions] = useState([]);
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [editableTransaction, setEditableTransaction] = useState(null); 
  const [updatedTransaction, setUpdatedTransaction] = useState({});
  const [filter, setFilter] = useState('all');

  const filteredTransactions = transactions.filter(transaction => {
    if (filter === 'income') return transaction.transaction_type === 'income';
    if (filter === 'expenses') return transaction.transaction_type === 'expense';
    return true;
  });
  
  const handleEditClick = (transaction) => {
    setEditableTransaction(transaction.id);
    setUpdatedTransaction({
      ...transaction,
      transaction_date: new Date(transaction.transaction_date).toISOString().split('T')[0]
    });
  };

  const handleEditChange = (event) => {
    setUpdatedTransaction({
      ...updatedTransaction,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditSubmit = async (event) => {
    const { amount } = updatedTransaction;

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid positive number for the amount.")
      return;
    }

    try {
      const response = await fetch(`${URL}/api/transactions`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTransaction),
      });

      if (!response.ok) {
        throw new Error('Failed to update transaction');
      }

      const updatedTransactionsList = await response.json();
      setEditableTransaction(null); 
      setTransactions(updatedTransactionsList)
    } catch (error) {
      toast.error("Error updating transaction.")
    }
  };

  const handleDelete = async (transactionId) => {
    if (!token) {
      toast.error("You must be logged in to delete transactions.")
      navigate("/login");
      return;
    }
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        const deletedTransaction = await deleteTransaction(transactionId);
        if(!deletedTransaction.id){
          throw new Error("There was an issue deleting the transaction.")
        }

        setTransactions(transactions.filter((transaction) => transaction.id !== transactionId));
        toast.success("Transaction deleted successfully!");
      } catch (error) {
        toast.error("An error occurred while trying to delete the transaction.")
      }
    }
  };
  
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchTransactions = async () => {
      try {
        const response = await fetch(`${URL}/api/transactions/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error status: ${response.status}`);
        }

        const data = await response.json();
        setTransactions(data || []);
      } catch (error) {
        toast.error("Something went wrong, please try logging in again.")
      }
    };

    fetchTransactions();
  }, [id, navigate]);

  return (
    <div className="p-3 bg-info bg-opacity-25">
      <div className='d-flex gap-2 py-2'>
        {!showTransactionForm && (
          <button className="btn btn-sm btn-info" type="button" onClick={() => setShowPasswordForm(!showPasswordForm)}  >
            <FontAwesomeIcon icon={showPasswordForm ? faTimes : faKey} />
          </button>
        )}

        {!showPasswordForm && (
          <button
          className="btn btn-info btn-sm"
          onClick={() => setShowTransactionForm(!showTransactionForm)}
          >
            {showTransactionForm ? "X" : "Add Transaction"}
          </button>
        )}
      </div>
      {showPasswordForm && <UpdatePasswordForm id={id} setShowPasswordForm={setShowPasswordForm} />}

      <div className="mb-5">
        {transactions.length === 0 && (
          <>
          <h2>Your Transactions</h2>
          <div className="my-4 alert fs-8 alert-light text-center">
            <p>You haven't made any transactions yet.</p>
            <p>Start adding transactions to track your spending.</p>
          </div>
          </>
        )}
        {transactions.length > 0 && !showTransactionForm && !showPasswordForm && (
          <div className='container text-center'>
            {transactions.length > 0 && (
                <DisposableIncome transactions={transactions}/>
            )}
            <div id="transactions-table" className="d-flex gap-2 m-2">
              <h3 className="mt-4 d-none d-md-block">Your Transactions</h3>
              <div className="ms-auto d-flex gap-2 py-3">
                <button 
                  className={`btn ${filter === 'all' ? 'btn-info' : 'btn-light'}`} 
                  onClick={() => setFilter('all')}
                >
                  All
                </button>
                <button 
                  className={`btn ${filter === 'income' ? 'btn-info' : 'btn-light'}`} 
                  onClick={() => setFilter('income')}
                >
                  Income
                </button>
                <button 
                  className={`btn ${filter === 'expenses' ? 'btn-info' : 'btn-light'}`} 
                  onClick={() => setFilter('expenses')}
                >
                  Expenses
                </button>
              </div>
            </div>
            <table className="table table-sm table-striped table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th></th>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th></th>
                </tr>
              </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>
                        <button
                          className="btn btn-sm btn-light"
                          onClick={() => handleDelete(transaction.id)}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                      </td>
                      <td>
                        {editableTransaction === transaction.id ? (
                          <input
                            type="date"
                            name="transaction_date"
                            value={updatedTransaction.transaction_date}
                            onChange={handleEditChange}
                            className="form-control"
                          />
                        ) : (
                          formatDate(new Date(transaction.transaction_date).toISOString().split('T')[0])
                        )}
                      </td>
                      <td>
                        {editableTransaction === transaction.id ? (
                          <select 
                          className="form-control"
                          id="category"
                          type="text"
                          name="category" 
                          value={updatedTransaction.category}
                          onChange={handleEditChange}
                          required
                        >
                          {transaction.transaction_type === "income" ? (
                            <>
                              <option value="" disabled>Income Categories</option>
                              <option value="Salary & Wages">Salary & Wages</option>
                              <option value="Investments">Investments</option>
                              <option value="Business Income">Business Income</option>
                              <option value="Government Benefits">Government Benefits</option>
                              <option value="Other Income">Other Income</option>
                            </>
                          ) : (
                            <>
                              <option value="" disabled>Expense Categories</option>
                              <option value="Housing">Housing</option>
                              <option value="Utilities">Utilities</option>
                              <option value="Transportation">Transportation</option>
                              <option value="Food & Dining">Food & Dining</option>
                              <option value="Health & Wellness">Health & Wellness</option>
                              <option value="Shopping">Shopping</option>
                              <option value="Entertainment">Entertainment</option>
                              <option value="Childcare">Childcare</option>
                              <option value="Travel">Insurance</option>
                              <option value="Debt Repayment">Debt Repayment</option>
                              <option value="Pets">Pets</option>
                              <option value="Other Expense">Other Expense</option>   
                            </>
                          )}
                        </select>
                        ) : ( 
                          transaction.category
                        )}
                      </td>
                      <td>
                        {editableTransaction === transaction.id ? (
                          <input
                            type="text"
                            name="amount"
                            value={updatedTransaction.amount}
                            onChange={handleEditChange}
                            className="form-control"
                          />
                        ) : (
                          <span className={transaction.transaction_type === "income" ? "text-success" : "text-danger"}>
                            ${parseFloat(transaction.amount).toFixed(2)}
                          </span>
                        )}
                      </td>
                      <td>
                        {editableTransaction === transaction.id ? (
                          <button
                            className="btn btn-sm btn-info"
                            onClick={() => handleEditSubmit(transaction.id)}
                          >
                            <FontAwesomeIcon icon={faCheck} />
                          </button>
                        ) : (
                          <button
                            className="btn btn-sm btn-light"
                            onClick={() => handleEditClick(transaction)}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
            </table>
          </div>
        )}
        {showTransactionForm && !showPasswordForm && (
          <AddTransactionForm
            id={id}
            setTransactions={setTransactions}
            setShowTransactionForm={setShowTransactionForm}
          />
        )}
      </div>
    </div>
  )
}

export default Dashboard;