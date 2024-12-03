import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link  } from 'react-router-dom';
import AddTransactionForm from './AddTransactionForm';


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
    <div className="min-vh-100 d-flex p-3 bg-info bg-opacity-25">
      <div className="container mt-4">
        <h2>Your Transactions</h2>

        {transactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.item_name}</td>
                  <td>${parseFloat(transaction.amount).toFixed(2)}</td>
                  <td>{new Date(transaction.transaction_date).toLocaleDateString()}</td>
                  <td>{transaction.transaction_type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

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
  )
}

export default Dashboard