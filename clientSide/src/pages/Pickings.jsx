import React, { useState, useEffect } from 'react';

import { Form } from '../components';
import { PickingsTable } from '../pages'
import { Grid, Button } from '@mui/material';
import {getPicks} from '../actions/picking.js';
import { useDispatch,useSelector } from 'react-redux';

// import { Navbar } from '../components';

const Home = () => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const { picks } = useSelector(state => state);

  useEffect(() => {
    dispatch(getPicks())
   
  }, [dispatch])
  
  return (
    <div className='flex flex-col w-full'>
      {/* <Navbar /> */}
    <Button className='mt-5 align-right' onClick={()=>setShowForm((prevState) => !prevState)}>{ showForm ? 'Hide Form' : 'Show Form' }</Button>
    {
      <Grid container className='flex flex-col' > 
      { showForm ? <Form currentId={currentId} setCurrentId={setCurrentId} setShowForm={setShowForm} /> : ''}
      <PickingsTable 
        setCurrentId={setCurrentId} 
        setShowForm={ setShowForm} 
        bodyData={ picks } />
      </Grid>
    }
    </div>    
  )
}

export default Home;