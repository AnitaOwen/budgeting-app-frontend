const deleteTransaction = async (transactionId) => {
    const token = localStorage.getItem("token");
    const URL = import.meta.env.VITE_BASE_URL;

    try {
        if (!token) {
            alert("You must be logged in to delete transactions.");
            navigate("/login");
            return;
        }
        const response = await fetch(`${URL}/api/transactions/${transactionId}`, {
            method: 'DELETE',
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
  
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`); 
        }
  
        const deletedTransaction = await response.json(); 
        return deletedTransaction;
    } catch (error) {
        console.error("Error deleting transaction:", error);
        throw error;  
    }
};

export default deleteTransaction