import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { getPicks } from '../actions/picking';
import { fetchExpenses } from '../actions/expenses';
import { getMonthlyPicks, getAnnualPicks, getMonthlyExp } from '../actions/analysis';
import { ArrowUpwardOutlined, ArrowDownwardOutlined } from '@mui/icons-material';

import { Feature,  PieChart, PickingsAnalysis } from '../components';

const Dashboard = () => {
  

  const dispatch =useDispatch();
  const pickings = useSelector(state => state?.picks);
  // const [expenses] = useSelector(state => state?.expenses);
  const analysis = useSelector(state => state?.analysis) || {};

  const [ monthlyPicks, lastOneYear, monthlyExpenses ] =  analysis.flat();
  // let dashFigures = [];
  // dashFigures.push(monthlyExpenses?.monthlyExpenses, monthlyPicks?.monthlyPicks, lastOneYear?.lastOneYear)
  // console.log(dashFigures)
useEffect(()=>{
  // dispatch(getPicks());
  dispatch(fetchExpenses());
  dispatch(getMonthlyPicks());
  dispatch(getAnnualPicks());
  dispatch(getMonthlyExp());
},[dispatch])

  return (
    <div className="grid md:grid-cols-[3fr_minmax(auto,_1fr)] p-3 ">
      <div className="grid md:grid-rows-[1fr_minmax(auto,_2.19fr),1fr] h-full">
        <div className='grid grid-row-1 md:grid-cols-3 gap-2 items-center  md:gap-4 pb-3'>
           <Feature  title={`Monthly`} value={`Kgs${ monthlyPicks?.monthlyPicks }`} icon={<ArrowUpwardOutlined />} subsValue={`Picked`} percentage={'+15%'} addStyles={'bg-sky-100'} />
           <Feature  title={`Year to Date`} value={`Kgs${ lastOneYear?.lastOneYear }`} icon={<ArrowDownwardOutlined />} subsValue={`Picked`} percentage={'-2%'} addStyles={'bg-green-100'} />
           <Feature  title={`Year to Date`} value={`Ksh ${ monthlyExpenses?.monthlyExpenses }`} icon={<ArrowDownwardOutlined />} subsValue={'Expenses'} percentage={'-7%'} addStyles={'bg-indigo-100'} />
        </div>
        <div className="max-h-[280px] overflow-auto">
          <PickingsAnalysis
            bodyData={pickings}
          />
        </div>
        <div className="grid grid-row-1 md:grid-cols-3 gap-2 items-center  md:gap-4 pb-3">
          <Feature />
          <Feature />
          <Feature />
        </div>
      </div>
      <div className="grid grid-rows-2  h-full">
          <div className=" max-h-full">
            <PieChart title='Expenses' value={  monthlyExpenses?.monthlyExpenses } series={[ 60, 40]} colors={['#475be8', '#e4e8ef']} />
          </div>
          <div className=" max-h-full">
          <div className=" max-h-full">
            <PieChart title='Income' value={ lastOneYear?.lastOneYear * 21 } series={[ 70, 30]} colors={['#275be8', '#ffe8e1']} />
          </div>
          </div>
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