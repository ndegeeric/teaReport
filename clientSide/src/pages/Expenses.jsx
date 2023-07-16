import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpenses } from '../actions/expenses';

import { Table } from '../components';
// import { ExpensesForm } from '../pages';

const Expenses = () => {
  const dispatch = useDispatch();
  const expenses = useSelector( state =>  state.expenses );

  const tableHeaderData = [' ', 'Date', 'Expense', 'Description', 'Amount', 'Status' ]
  const tHeader = tableHeaderData.map((thd, i) => ( <th key={ i } className='text-center p-2' >{ thd }</th>));

  useEffect(()=> {
    dispatch(fetchExpenses());
  },[])
  return (
    <div className='w-full pl-5 pb-5 md:h-[570px] overflow-y-auto'>
      {/* <ExpensesForm /> */}
      <Table
        tableHeader={tHeader}
        bodyData={expenses}
      />
    </div>
  )
}

export default Expenses