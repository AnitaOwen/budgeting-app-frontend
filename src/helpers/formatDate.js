const formatDate = (transactionDate) => {
    const date = new Date(transactionDate); 
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1; 
    const day = date.getUTCDate(); 
    return `${month}/${day}/${year}`;
}

export default formatDate;