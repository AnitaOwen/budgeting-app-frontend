import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faTimes } from "@fortawesome/free-solid-svg-icons";
import AddTransactionForm from './AddTransactionForm';
import DisposableIncome from './DisposableIncome';
import UpdatePasswordForm from './UpdatePasswordForm';


const Dashboard = () => {
  const { id } = useParams(); 
  const [transactions, setTransactions] = useState([]);
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
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
          </>
        )}
        {/* <div className="d-grid"> */}
          {/* {!showPasswordForm && (
            <button
              className="btn btn-info btn-sm mt-3 ms-auto"
              onClick={() => setShowTransactionForm(!showTransactionForm)}
            >
              {showTransactionForm ? "X" : "Add Transaction"}
            </button>
          )} */}
          {showTransactionForm && !showPasswordForm && (
            <AddTransactionForm
              id={id}
              setTransactions={setTransactions}
              setShowTransactionForm={setShowTransactionForm}
            />
          )}
        {/* </div> */}
      </div>
    </div>
  )
}

export default Dashboard