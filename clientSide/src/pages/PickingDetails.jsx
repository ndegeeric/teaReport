import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { DetailsCard, ErrorAuth } from '../components';
import { deleteCurrentPick } from '../actions/picking';

const PickingDetails = () => {
  const [ errorHandler,  setErrorHandler] = useState({ hasError: false, message: ''});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log(id)
  const [ data ] = useSelector(state => state.picks.filter(exp => exp._id === id));
  
  const handleEdit = (e) => {
      e.preventDefault();
      navigate('/pickingsForm', { state: { id } })
    }
  
    const handleDelete = (e) => {
      e.preventDefault();
      let confirm =window.confirm('Are you sure you want to delete this picking no: ' + id +'?');
      if (confirm) {
        dispatch(deleteCurrentPick(id, setErrorHandler));
        navigate('/pickings');
      } else {
        return;
      }
    }
      
  return (
    <div className='p-5 md:px-10'>
      <ErrorAuth errorHandler={errorHandler} setErrorHandler={setErrorHandler} />
      <DetailsCard data={ data } 
          handleEdit={ handleEdit } handleDelete={ handleDelete } 
      />
    </div>
  )
}

export default PickingDetails