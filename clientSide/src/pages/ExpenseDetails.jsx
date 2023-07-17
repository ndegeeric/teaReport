import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchExpense } from '../actions/expenses';
import { deleteExpense, updateExpense } from '../actions/expenses';
import { DetailsCard } from '../components';

const ExpenseDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const  [ data ] = useSelector( state => state.expenses.filter(exp => exp._id === id) );

  const handleEdit = (e) => {
    e.preventDefault();
    navigate('/form', { state: { id } })
  }

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteExpense(id));
    navigate('/expenses');
  }
  
  const handlePaid = (e) => {
    e.preventDefault();
    dispatch(updateExpense({ ...data, status: 'PAID'}, id))
  }

  useEffect(()=> {
    dispatch(fetchExpense(id));
  }, [dispatch, id]);

  return (
    <div className='flex items-center h-[90%] md:h-auto p-3 sm:px-10 py-5'>
    {
      <DetailsCard data={ data } handlePaid={ handlePaid } handleEdit={ handleEdit } handleDelete={ handleDelete } />
    }
    </div>
  )
}

export default ExpenseDetails