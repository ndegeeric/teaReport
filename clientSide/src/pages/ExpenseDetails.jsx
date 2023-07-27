import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchExpenses } from '../actions/expenses';
import { deleteExpense, updateExpense } from '../actions/expenses';
import { DetailsCard, ErrorAuth } from '../components';

const ExpenseDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorHandler, setErrorHandler] = useState({ hasError: false, message: ' '})
  const [ data ] = useSelector( state => state.expenses.filter(exp => exp._id === id ) );
  // console.log(id);

  const handleEdit = (e) => {
    e.preventDefault();
    navigate('/form', { state: { id } })
  }

  const handleDelete = (e) => {
    e.preventDefault();
    let confirm = window.confirm('Are you sure you want to delete Expenditure no: '  + id + '?');
    if (confirm) {
      dispatch(deleteExpense(id));
      navigate('/expenses');
    } else {
      return;
    }
  }
  
  const handlePaid = (e) => {
    e.preventDefault();
    dispatch(updateExpense({ ...data, status: 'PAID'}, id));
  }

  useEffect(()=> {
    dispatch(fetchExpenses());
  }, [dispatch, id]);

  return (
    <>
    <ErrorAuth errorHandler={errorHandler} setErrorHandler={setErrorHandler} />
    <div className='p-5 md:px-10'>
    {
      <DetailsCard data={ data } handlePaid={ handlePaid } handleEdit={ handleEdit } handleDelete={ handleDelete } />
    }
    </div>
    </>
  )
}

export default ExpenseDetails