const Filter = ({ filter, handleFilterChange }) => {
    return (
        <p>find countries <input type="text" value={filter} onChange={handleFilterChange} /></p>
    ) 
}

export default Filter