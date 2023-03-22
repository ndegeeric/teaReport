import React, { useState } from 'react';

import { TextField, Typography, Button, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createPick, updatePick } from '../actions/picking';

const Form = () => {
  const initialState = [{ weight: '' }]
  const [ pickData, setPickData ] = useState(initialState);
  const [isUpdate, setIsUpdate] = useState(false)
  const dispatch = useDispatch();
  const data = useSelector(state => state.picks);

  const handleSubmit = () => {
    if(isUpdate){
      dispatch(updatePick(FormData,_id))
    }else{
      dispatch(createPick(pickData));
    }
    setPickData(initialState);
  }

  return (
    <Paper>
      <Typography>Enter the weight harvested:</Typography>
      <form>
        <TextField value={pickData.weight} onChange={(e)=>{setPickData({ ...pickData, weight: e.target.value })}} placeholder='Weight'/>
        <Button onClick={handleSubmit}>Save</Button>
      </form>
    </Paper>
  )
}

export default Form