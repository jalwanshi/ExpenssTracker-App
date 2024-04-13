import React, { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Context from './Context';

const AddTransaction = () => {
  const [transaction, setTransaction] = useState({
    Text: "",
    Income: "",
    Expense: "",
  });

  const { Fetch, Set } = useContext(Context);

  function handleChange(event) {
    setTransaction({ ...transaction, [event.target.name]: event.target.value });
  }

  function handleAdd(e) {
    e.preventDefault();

    if (transaction.Text !== "" && ((transaction.Income !== "" && transaction.Expense === "") || (transaction.Income === "" && transaction.Expense !== ""))) {
      const amount = transaction.Income !== "" ? parseInt(transaction.Income) : -parseInt(transaction.Expense);
      const newTransaction = {
        Text: transaction.Text,
        Amount: amount,
      };

      if (Fetch === "") {
        Set([newTransaction]);
      } else {
        Set([...Fetch, newTransaction]);
      }
      
      setTransaction({ Text: "", Income: "", Expense: "" });
      toast.success("Transaction Added");
    } else {
      toast.warning("Fields are empty or both Income and Expense are filled");
    }
  }

  return (
  
<div>
  <ToastContainer />
  <div className="design">
  <h3>Add new transaction</h3>
  <form id="form">
    <div className="form-controll">
      <label htmlFor="text">Things</label>
      <input type="text" name="Text" value={transaction.Text} onChange={handleChange} placeholder="Enter text..." />
    </div>
    <div className="form-row"> 
      <div className="form-control">
        <label htmlFor="income">Income</label>
        <input type="number" name="Income" value={transaction.Income} onChange={handleChange} placeholder="Enter income..." />
      </div>
      <div className="form-control">
        <label htmlFor="expense">Expense</label>
        <input type="number" name="Expense" value={transaction.Expense} onChange={handleChange} placeholder="Enter expense..." />
      </div>
    </div>
    <button className={`btn ${transaction.Text && (transaction.Income || transaction.Expense) ? "dark" : "light"}`} onClick={handleAdd}>Add transaction</button>
  </form>
</div>
</div>

  );
}

export default AddTransaction;
