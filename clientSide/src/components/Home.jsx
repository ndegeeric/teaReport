import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPicks } from '../actions/picking';


const Home = () => {
  
  const dispatch = useDispatch();
  // const [isLoading, setIsLoading] = useState(true);
  const  { picks, loading, errors }  = useSelector(state => state.picks);


  useEffect(()=>{
    dispatch(getPicks())
  },[dispatch])
  
  return (
    <>
    { 
    loading ? <div>Loading</div>:<div>{
       picks?.map(pick => (
        <div key={pick._id}>
        <p>{pick.createdAt}</p>
        <p>{pick.weight}</p>
        </div>
       ))
      }
    </div>

    }
    </>    
  )
}

export default Home;