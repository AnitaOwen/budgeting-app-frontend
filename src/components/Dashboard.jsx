import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const Dashboard = () => {
  const { id } = useParams(); 
  const [transactions, setTransactions] = useState([]);
  const URL = import.meta.env.VITE_BASE_URL

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`${URL}/api/transactions/${id}`); 

        if (!response.ok) {
        throw new Error(`error status: ${response.status}`);
        }

        const data = await response.json();  
        // console.log("data", data)
        setTransactions(data);

      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="min-vh-100 d-flex p-3 bg-info bg-opacity-25">

      <div className="container mt-4">
        <h2>Your Transactions</h2>
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
            {transactions.length > 0 && transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.item_name}</td>
                <td>${parseFloat(transaction.amount).toFixed(2)}</td>
                <td>{new Date(transaction.transaction_date).toLocaleDateString()}</td>
                <td>{transaction.transaction_type}</td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default Dashboard