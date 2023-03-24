import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPicks, deleteCurrentPick } from '../actions/picking';
import Form from './Form';


const Home = () => {

  const [isUpdate, setIsUpdate] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const dispatch = useDispatch();
  const  { picks, loading }  = useSelector(state => state.picks);

  const handleUpdate = (id) => {
    setIsUpdate(true);
    setCurrentId(id);
  }

  const handleDelete = (id) => {
    dispatch(deleteCurrentPick(id));
  } 
  
  useEffect(()=>{
    dispatch(getPicks())
  },[dispatch]);

  return (
    <>
    { 
    loading ? <div>Loading...</div>:<>{
       picks?.map(pick => (
        <div key={pick._id}>
        <p>{pick.createdAt}</p>
        <p>{pick.weight}</p>
        <button onClick={()=> handleUpdate(pick._id)}>update</button>
        <button onClick={() => handleDelete(pick._id)}>Delete</button>
        </div>
       ))
      }
      <Form isUpdate= {isUpdate} currentId={currentId} setCurrentId={setCurrentId} setIsUpdate={setIsUpdate} />
    </>

    }
    </>    
  )
}

export default Home;