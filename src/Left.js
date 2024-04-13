import React, { useContext } from 'react';
import Context from './Context';

const Left = () => {
  const { Fetch } = useContext(Context);
  let balance = 0;
  Fetch.map(function (Obj) {
    balance = balance + parseInt(Obj.Amount);
    return null; // Add a return statement to satisfy the array-callback-return rule
  });
  return (
    <div>
      <h4 className='balance-container'>Your Balance</h4>
      <h1 className='balance-container'>₹{balance}</h1>
    </div>
  );
}

export default Left;
