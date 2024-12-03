import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link  } from 'react-router-dom';
import AddTransactionForm from './AddTransactionForm';
import DisposableIncome from './DisposableIncome';


const Dashboard = () => {
  const { id } = useParams(); 
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  
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
  }, [id]);
  return (
    <div className="min-vh-100 p-3 bg-info bg-opacity-25">
      {transactions.length > 0 && (<DisposableIncome transactions={transactions}/>)}
      
      <div className="container mt-4">
        <h2>Your Transactions</h2>
        {transactions.length === 0 ? (
          <p>Welcome! Click the button below to begin!</p>
        ) : (
          <table className="table table-striped">
            <thead className="thead-dark text-center">
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{new Date(transaction.transaction_date).toLocaleDateString()}</td>
                  <td>{transaction.category}</td>
                  <td>${parseFloat(transaction.amount).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="text-center">
          <button
            className="btn btn-info mt-3"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Hide Form" : "Add a Transaction"}
          </button>
          {showForm && (
            <AddTransactionForm
              id={id}
              setTransactions={setTransactions}
              setShowForm={setShowForm}
            />
          )}
        </div>
      </div>
    </div>
    
  )
}

export default Dashboard