import React, { useState, useEffect } from 'react';

import { Form, Table } from '../components';
import { Grid, Button } from '@mui/material';
import {getPicks} from '../actions/picking.js';
import { useDispatch } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(0);
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    dispatch(getPicks())
   
  }, [dispatch])
   
  return (
    <>
    <Button className='mt-5 align-right' onClick={()=>setShowForm((prevState) => !prevState)}>{ showForm ? 'Hide Form' : 'Show Form' }</Button>
    {
      <Grid container >
      { showForm ? <Form currentId={currentId} setCurrentId={setCurrentId} /> : ''}
      <Table setCurrentId={setCurrentId}/>
      </Grid>
    }
    </>    
  )
}

export default Home;