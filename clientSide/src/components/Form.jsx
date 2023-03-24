import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { TextField, Typography, Button, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createPick, updatePick } from '../actions/picking';

const Form = ({ currentId, setCurrentId, isUpdate, setIsUpdate}) => {
  const initialState = { weight: '' }
  const [ pickData, setPickData ] = useState(initialState);
  const dispatch = useDispatch();
  const location = useLocation();

  // const formState = location?.state;

  // setIsUpdate(formState?.isUpdate);
  // setCurrentId(formState?.currentId);
  
  const data = useSelector( state => currentId ? state?.picks?.picks.find( p =>  p._id === currentId ) : null );

  // console.log(data)

  useEffect(()=> {
    if( isUpdate ) {
      setPickData({ ...pickData, weight: data.weight })
    }
  },[data]);

  const clearForm = () => {
    setIsUpdate(false);
    setCurrentId('');
  }

  const handleSubmit = () => {
    if(isUpdate){
      dispatch(updatePick(pickData, currentId));
      
    }else{
      dispatch(createPick(pickData));
    }
    setPickData(initialState);
    clearForm();
  }

  return (
    <Paper>
      <Typography>Pick Entries</Typography>
      <form>
        <label htmlFor="weight">Enter the Daily Harvest:</label>
        <TextField name='weight' value={pickData.weight} onChange={(e)=> setPickData({ ...pickData, weight: e.target.value })} placeholder='Weight'/>
        <Button onClick={handleSubmit}>Save</Button>
      </form>
    </Paper>
  )
}

export default Form