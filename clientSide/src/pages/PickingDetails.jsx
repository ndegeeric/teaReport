import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { DetailsCard } from '../components';
import { deleteCurrentPick } from '../actions/picking';

const PickingDetails = () => {
  // const [isPickingDetails, setIsPickingDetails] = useState(false);
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
      dispatch(deleteCurrentPick(id));
      navigate('/pickings');
    }
      
  return (
    <div>
        <DetailsCard data={ data } 
            handleEdit={ handleEdit } handleDelete={ handleDelete } 
        />
    </div>
  )
}

export default PickingDetails