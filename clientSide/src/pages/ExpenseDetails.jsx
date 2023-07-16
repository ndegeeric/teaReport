import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Typography, Button } from '@mui/material';

import { fetchExpense } from '../actions/expenses';
import teaImage from '../assets/tea_plantation.jpg';
import { dateFormatter } from '../util/dateFormatter';
import { deleteExpense, updateExpense } from '../actions/expenses';

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
      <Card className={`p-4 `}>
        <img className='h-[250px]  w-full' src={teaImage} alt="ontimeTMS" />
        <div className='flex justify-between py-6 sm:py-3'>
          <Typography sx={{ fontWeight: 'bold', fontSize: '18px'}}>{data.expenseType}</Typography>
          <Typography sx={{ fontWeight: 'bold', fontSize: '18px'}}>{dateFormatter(data.createdAt)}</Typography>
        </div>
        <div className="pt-10 sm:pt-0">
          <Typography className='text-center pb-3' sx={{ fontWeight: 'bold', fontSize: '25px' }}>Details Of the Expense</Typography>
          <Typography><span className='font-[400] text-xl mt-8'>Narration:</span> {data.narration}</Typography>
          <Typography><span className='font-[400] text-xl'>Amount: </span>{data.amount}</Typography>
          <Typography><span className='font-[400] text-xl'>status: </span><span className={`${data.status === 'PENDING' ? 'bg-red-200' : 'bg-lime-200'} px-2 py-1 `}>{data.status}</span></Typography>
        </div>
        <div className="flex justify-between pt-12 sm:py-3">
          <div className="">
            <Button onClick={ handlePaid } variant='primary' sx={{ color: '#ffffff', fontWeight: 'bold', backgroundColor: '#00ff00', '&:hover': {color: '#00ff00'}}}>Paid</Button>
          </div>
          <div className="flex gap-3 ">
            <Button onClick={ handleEdit } variant='' sx={{ color: '#ffffff', fontWeight: 'bold', backgroundColor: '#0000ff', '&:hover': {color: '#0000ff'}}}>Edit</Button>
            <Button onClick={ handleDelete } variant='secondary' sx={{ color: '#ffffff', fontWeight: 'bold', backgroundColor: '#ff0000', '&:hover': {color: '#ff0000'}}} >Delete</Button>
          </div>
        </div>
      </Card>
    }
    </div>
  )
}

export default ExpenseDetails