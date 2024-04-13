import React, { useState } from 'react'
import Left from './Left'
import Balance from './Balance'
import History from './History'
import AddTransaction from './AddTransaction'
import "./Style.css"
import Context from './Context'
const App = () => {
  const[Array,SetArray]=useState([])
  return (
    <div>
    <h2 className='tracker-container'>Expense Tracker</h2>
    <Context.Provider value={{"Fetch":Array,"Set":SetArray}}>

    <Left/>
    <Balance/>
    <History/>
    <AddTransaction/>

    </Context.Provider>
   
    </div>
  )
}

export default App
