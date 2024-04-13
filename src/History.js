import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import Context from './Context';
import { FaTrash } from 'react-icons/fa'; // Import the trash icon from react-icons/fa

const History = () => {
  const { Fetch, Set } = useContext(Context); // Destructure Set from Context
  const [searchText, setSearchText] = useState('');
  const [searched, setSearched] = useState(false); // Track if search has been performed

  function handleSearch() {
    if (searchText.trim() !== '') {
      const foundTransactions = Fetch.filter(transaction =>
        transaction.Text.toLowerCase().includes(searchText.toLowerCase())
      );

      if (foundTransactions.length > 0) {
        toast.success(`Found ${foundTransactions.length} matching transactions.`);
      } else {
        toast.error("No matching transactions found.");
      }

      setSearched(true); // Set searched to true after search button is clicked
    } else {
      toast.warning("Please enter a search query.");
    }
  }

  // Function to handle input change
  function handleInputChange(e) {
    setSearchText(e.target.value);
    setSearched(false); // Set searched to false whenever input changes
  }

  // Function to handle delete transaction
  function handleDelete(index) {
    const updatedTransactions = Fetch.filter((_, i) => i !== index); // Remove transaction at index
    Set(updatedTransactions); // Update context with updated transactions
    toast.error("Transaction deleted successfully.");
  }

  return (
    <div className='design'>
      <h3>History</h3>
      <div className='search-container'>
        <input
          type="text"
          placeholder="Search Transaction"
          value={searchText}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <ul id="list" className="list">
        {
          Fetch ? Fetch.map(function (Obj, index) {
            const isFound = searched && searchText && Obj.Text.toLowerCase().includes(searchText.toLowerCase());
            return (
              <li key={index} className={isFound ? "highlighted" : (parseInt(Obj.Amount) > 0 ? "plus" : "minus")}>
                <span style={{ fontWeight: isFound ? 'bold' : 'normal' }}>{Obj.Text}</span> <span>₹{Obj.Amount}</span>
                <FaTrash onClick={() => handleDelete(index)} style={{ cursor: 'pointer', marginLeft: '10px' }} /> {/* Delete button */}
              </li>
            );
          }) : ""
        }
      </ul>
    </div>
  );
}

export default History;
