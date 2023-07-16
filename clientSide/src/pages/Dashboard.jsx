import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPicks } from '../actions/picking';
import { fetchExpenses } from '../actions/expenses';
import { ArrowUpwardOutlined, ArrowDownwardOutlined } from '@mui/icons-material';

import { Feature, Table } from '../components';

const Dashboard = () => {
  

  const dispatch =useDispatch();
  // const pickings = useSelector(state => state.picks);
  const expenses = useSelector(state => state.expenses);

  // console.log(pickings, expenses);

  const tableHeaderData = [' ', 'Date', 'Expense', 'Description', 'Amount', 'Status' ]
  const tHeader = tableHeaderData.map((thd, i) => ( <th key={i} className='text-center p-2'>{thd}</th>));

useEffect(()=>{
  dispatch(getPicks);
  dispatch(fetchExpenses());
},[dispatch])

  return (
    <div className="grid md:grid-cols-[3fr_minmax(auto,_1fr)] p-3 ">
      <div className="grid md:grid-rows-[1fr_minmax(auto,_2.19fr),1fr] h-full">
        <div className='grid grid-row-1 md:grid-cols-3 gap-2 items-center  md:gap-4 pb-3'>
           <Feature  title={`Monthly`} value={`Kgs${'1000'}`} icon={<ArrowUpwardOutlined />} subsValue={`Picked`} percentage={'+15%'} addStyles={'bg-sky-100'} />
           <Feature  title={`Year to Date`} value={`Kgs${'1000'}`} icon={<ArrowDownwardOutlined />} subsValue={`Picked`} percentage={'-2%'} addStyles={'bg-green-100'} />
           <Feature  title={`Year to Date`} value={`Ksh ${'1000'}`} icon={<ArrowDownwardOutlined />} subsValue={'Expenses'} percentage={'-7%'} addStyles={'bg-indigo-100'} />
        </div>
        <div className="max-h-[280px] overflow-auto">
          <Table 
            tableHeader={tHeader}
            bodyData={expenses}
          />
        </div>
        <div className="grid grid-row-1 md:grid-cols-3 gap-2 items-center  md:gap-4 pb-3">
          <Feature />
          <Feature />
          <Feature />
        </div>
      </div>
      <div className="grid grid-rows-2 md:ml-3 h-full">
          <div className="bg-gray-100  max-h-full"></div>
          <div className="bg-slate-100 max-h-full"></div>
      </div>
    </div>
    // repeat(2, minmax(0, 1fr))
    // <div className="flex flex-col w-screen sm:w-full">  
    // <div className=" flex w-full flex-col">
    //   
    //  
    // </div>
    // </div>
  )
}

export default Dashboard