import React from 'react';
import  { dateFormatter } from '../util/dateFormatter';
// import {  MoreHorizOutlined } from '@mui/icons-material';
// import  { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Loading } from '../components';
// import { deleteCurrentPick } from '../actions/picking';


const PickingsTable = ({ setCurrentId, setShowForm,  bodyData }) => {
    // const dispatch = useDispatch();                                                                                                                                                                                          useDispatch()

    // const setId =(id) => {
    //   setCurrentId(id);
    //   setShowForm(true);
    // }
    const tableHeaderData = ['','Date', 'Weight', 'Picking Costs'];

    const tableHeader =  tableHeaderData.map((item, i) => ( <th className='bg-blue-400 px-1.5 py-1 text-right' key={i}>{item}</th> ));
      
  return (
    <>
    {
    !bodyData ? <Loading /> :
    <div className='sm:m-7 m-3 w-full sm:text-[16px] text-[12px] overflow-auto md:overflow-y-auto md:h-[480px]'>
        <table className='w-full relative'>
            <thead><tr className=' w-full text-white bg-sky-600 py-2 sticky top-0'>{tableHeader}</tr></thead>
            <tbody>
                {
                    bodyData?.map((item,i) => (
                      <tr className='w-full even:bg-blue-100 px-3' key={item._id}>
                        <td className='text-right py-1 px-1.5' ><Link to={`/pickingDetails/${item._id}`}>{i+1}</Link></td>
                        <td className='text-right py-1 px-1.5'><Link to={`/pickingDetails/${item._id}`}>{dateFormatter(item.createdAt)}</Link></td>
                        <td className='text-right py-1 px-1.5'><Link to={`/pickingDetails/${item._id}`}>{item.weight}</Link></td>
                        <td className='text-right py-1 px-7 md:p-50'><Link to={`/pickingDetails/${item._id}`}>{(item.weight*12).toFixed(2)}</Link></td>
                        {/* <td className='text-center py-1 px-1.5'> */}
                          {/* <button onClick={()=>dispatch(deleteCurrentPick(item._id))}>delete</button> */}
                        {/* </td> */}
                        {/* <td className='py-1 px-1.5'><button onClick={()=> {setId(item._id)}}>{<MoreHorizOutlined/>}</button></td> */}
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

export default PickingsTable;