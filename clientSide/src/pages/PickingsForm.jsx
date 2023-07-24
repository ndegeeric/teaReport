import React, { useState, useEffect } from 'react';
import { TextField, Box, Typography, Button, FormControl,FormHelperText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createPick, updatePick } from '../actions/picking';
import { useNavigate, useLocation } from 'react-router-dom';

import { createExpense } from '../actions/expenses';
import {ErrorAuth} from '../components';

const Form = ({ setActiveLink }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = state || {};
  const initialState = { weight: '' }
  const [ pickData, setPickData ] = useState(initialState);
  const dispatch = useDispatch();
  const [errorHandler, setErrorHandler] = useState({hasError: false, message: ""})
  
  const data = useSelector( state => id ? state?.picks.find( p =>  p._id === id ) : null );
  // console.log(data)

  useEffect(()=> {
    if( id ) {
      setPickData(data)
    }
  },[ data, id ]);

  const clearForm = () => {
    setPickData(initialState);
    setActiveLink('Pickings');
    navigate('/pickings');
  }
  
  const handleSubmit = () => {
    if(id){
      dispatch(updatePick(pickData, id, setErrorHandler));
    }else{
      dispatch(createPick(pickData, setErrorHandler));
      dispatch(createExpense({  expenseType: 'Picking Wage', narration: `${pickData.weight} kgs @ Ksh 12/kg.`, amount: pickData.weight * 12, status: undefined}, setErrorHandler))
    }
    setPickData(initialState);
    setActiveLink('Pickings');
    navigate('/pickings');
    clearForm();
  }
  
  // const handleKeyPress = (e)=>{
  //   if( e.key === 'Enter' ){
  //     e.preventDefault();
  //     handleSubmit();
  //   }
  // };

  return (
    <Box className='flex flex-col items-center md:m-5 m-1 mb-5 w-[96%]'>
      <Typography fontSize={25} fontWeight={700} color='#11142d'marginLeft={2} >{ id ? 'Edit' : 'Enter' } the Picking data.</Typography>
      <ErrorAuth errorHandler={errorHandler} setErrorHandler={setErrorHandler} />
      <Box className='sm:mt-2.5 flex items-center w-full mt-1 sm:p-[20px]' borderRadius='15px' bgcolor='#fcfcfc'>
        <form style={{ 
          md:{marginTop: '20px'}, marginTop: '0', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px'
        }}>
          <FormControl>
            <FormHelperText  sx={{
              fontWeight:500, margin:'10px 0', fontSize:16, color:'#11142d'
            }}>Enter the Daily Harvest Weight: <span className='text-red-500 text-xl'>*</span></FormHelperText>
            <TextField fullWidth name='weight' value={pickData.weight} onChange={(e)=> setPickData({ ...pickData, weight: e.target.value })} placeholder='123.50' />
          </FormControl>
          <Button variant='contained' onClick={handleSubmit} fullWidth>Save</Button>
          <Button fullWidth onClick={clearForm}>Clear Form</Button>
        </form>
      </Box>
    </Box>
  )
}

export default Form