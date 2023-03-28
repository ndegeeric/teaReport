import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import  moment from 'moment';
import {  MoreHorizOutlined } from '@mui/icons-material';

import { Loading } from '../components';
import { deleteCurrentPick } from '../actions/picking';


const Table = () => {
    const dispatch = useDispatch();                                                                                                                                                                                          useDispatch()
    const {picks} = useSelector(state => state.picks);
    const tableHeaderData = ['','Date', 'Weight', 'Picking Costs', 'Other expenses',''];

    const tableHeader =  tableHeaderData.map((item, i) => ( <th className='bg-blue-700 px-1.5 py-1' key={i}>{item}</th> ));
  
  return (
    <>
    {
    !picks ? <Loading /> :
    <div className='m-10 w-full'>
        <table className='w-[100%]'>
            <thead><tr className=' w-full text-white'>{tableHeader}</tr></thead>
            <tbody>
                {
                    picks?.map((item,i) => (
                      <tr className='w-full even:bg-blue-100 px-3 ' key={item._id}>
                        <td className='py-1 px-1.5' >{i+1}</td>
                        <td className='py-1 px-1.5'>{item.createdAt}</td>
                        <td className='py-1 px-1.5'>{item.weight}</td>
                        <td className='py-1 px-1.5'>{item.weight*12}</td>
                        <td className='py-1 px-1.5'>
                          <button onClick={() =>{}}>delete</button>
                        </td>
                        <td className='py-1 px-1.5'>{<MoreHorizOutlined/>}</td>
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