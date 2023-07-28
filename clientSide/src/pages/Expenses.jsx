import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpenses } from '../actions/expenses';
// import { useLocation } from 'react-router-dom';
import { ErrorAuth } from '../components';

import { Table } from '../components';

const Expenses = () => {
  const dispatch = useDispatch();
  // const location = useLocation();
  const [errorHandler, setErrorHandler] = useState({ hasError: false, message: '' });
  
  const tableHeaderData = [' ', 'Date', 'Expense', 'Details', 'Amount', 'Status' ]
  const tHeader = tableHeaderData.map((thd, i) => ( <th key={ i } className='text-center p-2' >{ thd }</th>));
  
  
  useEffect(()=> {
    dispatch(fetchExpenses(setErrorHandler));
  },[dispatch]);
  
  const expenses = useSelector( state =>  state.expenses );
  // console.log(expenses);
  return (
    <div className='w-screen md:w-full p-3 text-sm md:text-lg md:h-[570px] overflow-y-auto'>
      <ErrorAuth errorHandler={errorHandler} setErrorHandler={setErrorHandler} />
      <Table
        tableHeader={tHeader}
        bodyData={expenses}
      />
    </div>
  )
}

export default Expenses