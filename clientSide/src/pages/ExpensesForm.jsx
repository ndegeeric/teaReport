import React, { useState, useEffect } from 'react';
import { TextField, FormControl, FormHelperText, Select, Button, MenuItem, InputLabel, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation,useNavigate } from 'react-router-dom';

import { createExpense, updateExpense } from '../actions/expenses';

const initialState = { expenseType: '', narration: '', amount: 0, status: undefined };

const ExpensesForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = state || {};
  const dispatch = useDispatch();
  const [ data ] = useSelector( state => state.expenses.filter( expense => expense._id === id ) );
  const [expenseData, setExpenseData] = useState(initialState);
  const [isEdit, setIsEdit] = useState(false)

  useEffect(()=> {
    if(id) {
      setExpenseData( data );
      setIsEdit(true)
    }
  },[data, id])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(isEdit) {
      dispatch(updateExpense(expenseData, id ))
    } else {
      dispatch(createExpense(expenseData));
    }
    
    setExpenseData(initialState);
    navigate('/expenses')
  }

  return (
    <div>
        <form className='p-3 md:p-10'>
          <Typography sx={{ paddingBottom: '2rem', fontSize: '2rem'}}>{ isEdit ? 'Edit The Expense': 'Enter The Expense' } </Typography>
            <FormControl className='w-full' sx={{marginBottom: '10px'}}>
                {/* <FormHelperText>Expense Type</FormHelperText> */}
                <InputLabel id='expenseType' >Select Expense Type</InputLabel>
                <Select required labelId="expenseType" value={expenseData.expenseType} onChange={(e) => setExpenseData({ ...expenseData, expenseType: e.target.value })}>
                    <MenuItem value="Picking Wage">Picking Wage</MenuItem>
                    <MenuItem value="Pruning">Pruning</MenuItem>
                    <MenuItem value="Weeding">Weeding</MenuItem>
                    <MenuItem value="Top Dressing">Top Dressing</MenuItem>
                    <MenuItem value="TBC Charges">TBC Charges</MenuItem>
                    <MenuItem value="Wages">Wages</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>  
                </Select>
            </FormControl>
            <FormControl className='w-full' sx={{marginBottom: '10px'}}>
              <FormHelperText>Description</FormHelperText>
              <TextField required value={expenseData.narration} onChange={(e) => setExpenseData({ ...expenseData, narration: e.target.value })}  />
            </FormControl>
            <FormControl className='w-full' sx={{marginBottom: '10px'}}>
              <FormHelperText>Amount</FormHelperText>
              <TextField required value={expenseData.amount} onChange={(e)=> setExpenseData({ ...expenseData, amount: e.target.value })} />
            </FormControl>
            { isEdit && (
              <FormControl className='w-full' sx={{marginBottom: '10px'}}>
                <FormHelperText>Status</FormHelperText>
                <TextField value={expenseData.status} onChange={(e)=> setExpenseData({ ...expenseData, status: e.target.value })} />
              </FormControl>
            )}
            <Button className='w-full' sx={{ backgroundColor: '#0000ff', color: '#ffffff', marginTop: '20px', '&:hover': {color: '#0000ff'}}} onClick={ handleSubmit }>Submit</Button>
        </form>
    </div>
  )
}

export default ExpensesForm