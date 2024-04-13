import React from 'react'; // Remove useEffect import since it's not used
import { useContext } from 'react';
import Context from './Context';
import './Style.css'

const Balance = () => {
  const { Fetch } = useContext(Context);
  let income = 0;
  let expense = 0;

  Fetch.map(function (Obj) {
    if (parseInt(Obj.Amount) > 0) {
      income = income + parseInt(Obj.Amount);
    } else {
      expense = expense - parseInt(Obj.Amount);
    }
    return null; // Add a return statement to satisfy the array-callback-return warning
  });

  return (
    <div>
      <div className="inc-exp-container">
        <div>
          <h4>Income</h4>
          <p id="money-plus" className="money plus">+₹{income}</p>
        </div>
        <div>
          <h4>Expense</h4>
          <p id="money-minus" className="money minus">-₹{expense}</p>
        </div>
      </div>
    </div>
  );
}

export default Balance;
