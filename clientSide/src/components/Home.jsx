import React, { useState, useEffect } from 'react';

import { Form, Table } from '../components';
import { Grid } from '@mui/material';
import {getPicks} from '../actions/picking.js';
import { useDispatch } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(0);

  // setCurrentId(1)
  useEffect(() => {
    dispatch(getPicks())
   
  }, [dispatch])
  
 
  return (
    <>
    {
      <Grid container >
      {
      /* <Picks currentId={currentId} setCurrentId={setCurrentId} /> */}
      <Form currentId={currentId} setCurrentId={setCurrentId} />
      <Table/>
      </Grid>
    }
    </>    
  )
}

export default Home;