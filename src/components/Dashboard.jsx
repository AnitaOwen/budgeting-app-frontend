import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faTimes, faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import AddTransactionForm from './AddTransactionForm';
import DisposableIncome from './DisposableIncome';
import UpdatePasswordForm from './UpdatePasswordForm';
import deleteTransaction from '../helpers/deleteTransaction';


const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  
  const URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  const { id } = useParams(); 
  const navigate = useNavigate();

  const handleDelete = async (transactionId) => {
    if (!token) {
      alert("You must be logged in to delete transactions.");
      navigate("/login");
      return;
    }
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        const deletedTransaction = await deleteTransaction(transactionId);
        if(!deletedTransaction.id){
          throw new Error("There was an issue deleting the transaction.")
        }
        console.log(`Transaction ${transactionId} deleted successfully.`);
        setTransactions(transactions.filter((transaction) => transaction.id !== transactionId));
        alert("Transaction deleted successfully.");
      } catch (error) {
        console.error("Error deleting transaction:", error);
        alert("An error occurred while trying to delete the transaction.");
      }
    }
  };
  
  useEffect(() => {
    if (!token) {
      console.log("No token found, redirecting to login.");
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
        console.log("Fetched Transactions Data:", data);
        setTransactions(data || []);
      } catch (error) {
        console.error("Error fetching transactions:", error);
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

      <div className="mt-4 mb-5">
        {transactions.length > 0 && !showTransactionForm && !showPasswordForm && (
          <>
            {transactions.length > 0 && (<DisposableIncome transactions={transactions}/>)}
            <h2>Your Transactions</h2>
            <table className="table table-striped">
              <thead className="thead-dark text-center">
                <tr>
                  <th></th> 
                  <th>Date</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="text-center">
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>
                      <button 
                      className="btn btn-sm btn-light"
                      onClick={() => handleDelete(transaction.id)}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </td>
                    <td>{new Date(transaction.transaction_date).toLocaleDateString()}</td>
                    <td>{transaction.category}</td>
                    <td>${parseFloat(transaction.amount).toFixed(2)}</td>
                    <td>
                      <button 
                        className="btn btn-sm btn-btn-light"
                        onClick={() => handleEdit(transaction)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
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

export default Dashboard