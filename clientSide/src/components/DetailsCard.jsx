import React from 'react';
import { Card, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import teaImage from '../assets/tea_plantation.jpg';
import { dateFormatter } from '../util/dateFormatter';

const DetailsCard = ({ handlePaid, handleEdit, handleDelete, data }) => {
  const { weight } = data;
  const navigate = useNavigate();
  
  const handleClick = (e) => {
    if(weight){
      navigate('/pickings');
    } else {
      handlePaid();
    }
  }
  
  return (
    <Card className={`p-4 `}>
        <img className='h-[250px]  w-full' src={teaImage} alt="ontimeTMS" />
        <div className='flex justify-between py-6 sm:py-3'>
          <Typography sx={{ fontWeight: 'bold', fontSize: '18px'}}>{`${ weight ? 'Pickings' : data.expenseType}`}</Typography>
          <Typography sx={{ fontWeight: 'bold', fontSize: '18px'}}>{dateFormatter(data.createdAt)}</Typography>
        </div>
        <div className="pt-10 sm:pt-0">
          <Typography className='text-center pb-3' sx={{ fontWeight: 'bold', fontSize: '25px' }}>Details Of the {`${ weight? 'Dairy Picking' : 'Expense' }`}</Typography>
          <Typography><span className='font-[400] text-xl mt-4'>{`${ weight ? 'Weight' : 'Narration'}`}:</span> {weight ? `${ weight } Kgs.` : data.narration}</Typography>
          <Typography><span className='font-[400] text-xl'>Amount: </span> Ksh {`${weight ? weight * 21 : data.amount }.`}</Typography>
          <Typography><span className='font-[400] text-xl'>{`${ weight ? 'Picking Wages' : 'Status'}`}: </span>{ weight ? `Ksh ${ weight * 12 }` : <span className={`${data.status === 'PENDING' ? 'bg-red-200' : 'bg-lime-200'} px-2 py-1 `}>{data.status}</span>}.</Typography>
        </div>
        <div className="flex justify-between pt-12 sm:py-3">
          <div className="">
            <Button onClick={ handleClick } variant='primary' sx={{ color: '#ffffff', fontWeight: 'bold', backgroundColor: `${weight ? '#ffbf00':'#00ff00'}`, '&:hover': {color: `${weight ? '#ffbf00' : '#00ff00'}`}}}>{`${ weight ? 'Close' : 'Paid'}`}</Button>
          </div>
          <div className="flex gap-3 ">
            <Button onClick={ handleEdit } variant='' sx={{ color: '#ffffff', fontWeight: 'bold', backgroundColor: '#0000ff', '&:hover': {color: '#0000ff'}}}>Edit</Button>
            <Button onClick={ handleDelete } variant='secondary' sx={{ color: '#ffffff', fontWeight: 'bold', backgroundColor: '#ff0000', '&:hover': {color: '#ff0000'}}} >Delete</Button>
          </div>
        </div>
      </Card>
  )
}

export default DetailsCard