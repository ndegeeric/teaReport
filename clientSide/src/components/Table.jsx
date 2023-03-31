import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import  { dateFormatter } from '../util/dateFormatter';
import {  MoreHorizOutlined } from '@mui/icons-material';

import { Loading } from '../components';
import { deleteCurrentPick } from '../actions/picking';


const Table = ({ setCurrentId }) => {
    const dispatch = useDispatch();                                                                                                                                                                                          useDispatch()
    const { picks } = useSelector(state => state);
    const tableHeaderData = ['','Date', 'Weight', 'Picking Costs', 'Other expenses',''];

    const tableHeader =  tableHeaderData.map((item, i) => ( <th className='bg-blue-700 px-1.5 py-1' key={i}>{item}</th> ));
   
  return (
    <>
    {
    !picks ? <Loading /> :
    <div className='sm:m-7 m-1 w-full sm:text-[16px] text-[12px]'>
        <table className='w-[100%]'>
            <thead><tr className=' w-full text-white'>{tableHeader}</tr></thead>
            <tbody>
                {
                    picks?.map((item,i) => (
                      <tr className='w-full even:bg-blue-100 px-3 ' key={item._id}>
                        <td className='text-center py-1 px-1.5' >{i+1}</td>
                        <td className='text-center py-1 px-1.5'>{dateFormatter(item.createdAt)}</td>
                        <td className='text-center py-1 px-1.5'>{item.weight}</td>
                        <td className='text-right py-1 px-7 md:p-50'>{(item.weight*12).toFixed(2)}</td>
                        <td className='text-center py-1 px-1.5'>
                          <button onClick={()=>dispatch(deleteCurrentPick(item._id))}>delete</button>
                        </td>
                        <td className='py-1 px-1.5'><button onClick={()=> setCurrentId(item._id)}>{<MoreHorizOutlined/>}</button></td>
                      </tr>
                    ))
                    }
            </tbody>
        </table>
    </div>
  }
    </>
  )
}

export default Table