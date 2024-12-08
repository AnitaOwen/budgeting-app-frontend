const formatDate = (transactionDate) => {
    const date = new Date(transactionDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; 
    const day = date.getDate(); 
    return `${month}/${day}/${year}`;
}

export default formatDate;