import React, {  useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Grid } from '@mui/material';

import { PickingsTable } from '../pages'
import {getPicks} from '../actions/picking.js';
import { ErrorAuth } from '../components';

const Home = () => {
  const dispatch = useDispatch();
  const [errorHandler, setErrorHandler] = useState({ hasError: false, message: ''})

  const { picks } = useSelector(state => state);

  useEffect(() => {
    dispatch(getPicks(setErrorHandler))
   
  }, [dispatch])
  
  return (
    <div className='flex flex-col w-full'>
      <ErrorAuth errorHandler={errorHandler} setErrorHandler={setErrorHandler} />   
      <Grid container className='flex flex-col' >       
        <PickingsTable 
         bodyData={ picks }
        />
      </Grid>
    </div>    
  )
}

export default Home;