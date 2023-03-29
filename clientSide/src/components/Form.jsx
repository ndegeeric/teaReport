import React, { useState, useEffect } from 'react';

import { TextField, Box, Typography, Button, FormControl,FormHelperText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createPick, updatePick } from '../actions/picking';

const Form = ({ currentId, setCurrentId }) => {
  const initialState = { weight: '' }
  const [ pickData, setPickData ] = useState(initialState);
  const dispatch = useDispatch();

  
  
  const data = useSelector( state => currentId ? state?.picks.find( p =>  p._id === currentId ) : null );

  // console.log(currentId,data?.weight)

  useEffect(()=> {
    if( currentId ) {
      setPickData(data)
    }
  },[data]);

  const clearForm = () => {
    setCurrentId(0);
  }

  
  const handleSubmit = () => {
    if(currentId){
      dispatch(updatePick(pickData, currentId));  
    }else{
      dispatch(createPick(pickData));
    }
    setPickData(initialState);
    clearForm();
  }
  
  const handleKeyPress = (e)=>{
    if( e.key === 'Enter' ){
      e.preventDefault();
      handleSubmit();
    }else {
      return
    }
  };

  return (
    <Box className='md:m-5 m-1 w-full'>
      <Typography fontSize={25} fontWeight={700} color='#11142d'marginLeft={2} >{currentId ? 'Edit' : 'Enter' } the Picking data.</Typography>
      <Box mt={2.5} borderRadius='15px' padding='20px' bgcolor='#fcfcfc'>
        <form style={{ 
          md:{marginTop: '20px'}, marginTop: '0', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px'
        }}>
          <FormControl>
            <FormHelperText  sx={{
              fontWeight:500, margin:'10px 0', fontSize:16, color:'#11142d'
            }}>Enter the Daily Harvest Weight: <span className='text-red-500 text-xl'>*</span></FormHelperText>
            <TextField onKeyPress={(e)=>handleKeyPress(e)} sx={{
              width: '100%',

            }} name='weight' value={pickData.weight} onChange={(e)=> setPickData({ ...pickData, weight: e.target.value })} placeholder='123.50'/>
          </FormControl>
          <Button variant='contained' onClick={handleSubmit}>Save</Button>
        </form>
      </Box>
    </Box>
  )
}

export default Form