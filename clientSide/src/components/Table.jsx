import React from 'react';
import { dateFormatter } from '../util/dateFormatter'; 

import { Link } from 'react-router-dom';

const Table = ({ tableHeader, bodyData }) => {
   
  return (
    <>
        <table className='w-full md:pr-10 mt-7'>
            <thead><tr className='bg-blue-400 text-white sticky top-0 '>{ tableHeader }</tr></thead>
            <tbody className='' >
            {
                bodyData?.map( (item, i) => (
                        <tr key={item._id} className='w-full even:bg-blue-100 text-sm'>
                            <td className='text-right  py-1'><Link to={`/expenseDetails/${item?._id}`}>{i+1}</Link></td>
                            <td className='text-center py-1'><Link to={`/expenseDetails/${item?._id}`}>{dateFormatter(item.createdAt)}</Link></td>
                            <td className='text-left py-1 text-ellipsis overflow-hidden'><Link to={`/expenseDetails/${item?._id}`}>{item.expenseType}</Link></td>
                            <td className='text-left py-1 text-ellipsis overflow-hidden'><Link to={`/expenseDetails/${item?._id}`}>{item.narration}</Link></td> 
                            <td className='text-right p-1'><Link to={`/expenseDetails/${item?._id}`}>{new Intl.NumberFormat(undefined, { style: 'currency', currency: 'ksh' }).format(item.amount).replace("KSH", " ").trim()}</Link></td>
                            <td className='text-center py-1'><Link to={`/expenseDetails/${item?._id}`}>{item.status}</Link></td>
                        </tr>
                ))
            }
            </tbody>                    
        </table>
    </>
  )
}

export default Table