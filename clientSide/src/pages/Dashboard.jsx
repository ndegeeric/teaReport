import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExpenses } from '../actions/expenses';
import { getMonthlyPicks } from '../actions/analysis';
import { getPicks } from '../actions/picking';
import {  ArrowCircleDownOutlined, ArrowCircleUpOutlined } from '@mui/icons-material';

import { Feature,  PieChart, PickingsAnalysis, Loading } from '../components';

const Dashboard = () => {
  
  const [isIncrease] = useState(true);
  const dispatch =useDispatch();
  const pickings = useSelector(state => state.picks) || {};
  const analysis = useSelector(state => state.analysis) || {};
  
  // console.log(analysis.data)
  const [monthlyPicks] = analysis.data?.map(item => item.monthlyPicks) || [];
  const [annualPicks] = analysis.lastOneYear?.map(item => item.lastOneYear) || [];
  const [monthlyExpenses] = analysis.monthlyExpenses?.map(item => item.monthlyExpenses) || [];
  const [annualExpenses] = analysis.annualExpenses?.map(item => item.annualExpenses) || [];

  useEffect(()=>{
  dispatch(getPicks());
  dispatch(fetchExpenses());
  dispatch(getMonthlyPicks());
},[dispatch])
  
  const monthlyPercentageIncome = Math.floor((monthlyPicks * 21)/((monthlyPicks * 21) + monthlyExpenses)* 100) || 0;
  const annualPercentageIncome = Math.floor((annualPicks * 21)/((annualPicks * 21) + annualExpenses)* 100) || 0;

  return (
    <>
    { !analysis.data ? <Loading /> : (
      <div className="grid md:grid-cols-[3fr_minmax(auto,_1fr)] p-3 ">
        <div className="grid md:grid-rows-[1fr_minmax(auto,_2.19fr),1fr] h-full">
          <div className='grid grid-row-1 md:grid-cols-3 gap-2 items-center justify-center  md:gap-4 pb-3'>
             <Feature  subsValue={`Monthly`} value={`Kgs: ${ monthlyPicks }`} icon={isIncrease ? <ArrowCircleUpOutlined sx={{color: '#26ca71'}} /> : <ArrowCircleDownOutlined sx={{color: '#ff3d3d'}} />} title={'monthly Picked'} percentage={'+15%'} addStyles={'bg-sky-50'} />
             <Feature  subsValue={`Year to Date`} value={`Kgs: ${ annualPicks }`} icon={isIncrease ? <ArrowCircleUpOutlined sx={{color: '#26ca71'}} /> : <ArrowCircleDownOutlined sx={{color: '#ff3d3d'}} />} title={`Annual Picked`} percentage={'-2%'} addStyles={'bg-green-50'} />
             <Feature  subsValue={`Monthly`} value={`Ksh: ${ new Intl.NumberFormat({ style: 'currency' }).format(monthlyExpenses) }`} icon={isIncrease ? <ArrowCircleUpOutlined sx={{color: '#26ca71'}} /> : <ArrowCircleDownOutlined sx={{color: '#ff3d3d'}} />} title={'Monthly Expenses'} percentage={'-7%'} addStyles={'bg-indigo-50'} />
          </div>
          <div className="max-h-[280px] overflow-auto mb-2">
            <PickingsAnalysis
              bodyData={pickings}
            />
          </div>
          <div className="grid grid-row-1 md:grid-cols-3 gap-2 items-center justify-center  md:gap-4 pb-3">
            <Feature title='Annual Expenses' subsValue='year to date' value={`Ksh${ new Intl.NumberFormat({ style: 'currency'}).format(annualExpenses) }`} addStyles={`bg-orange-50`} />
            <Feature title='Monthly Income' subsValue='monthly' value={`Ksh${ new Intl.NumberFormat({ style: 'currency'}).format(monthlyPicks * 21) }`} />
            <Feature title='Expected Bonus' subsValue='year to date' value={`Ksh${ new Intl.NumberFormat({ style: 'currency'}).format(annualPicks * 44) }`} addStyles={`bg-green-50`} />
          </div>
        </div>
        <div className="grid grid-rows-2  h-full">
            <div className=" max-h-full">
              <PieChart title='Monthly' value={ new Intl.NumberFormat().format(monthlyExpenses) } series={[ 100 - monthlyPercentageIncome, monthlyPercentageIncome]} colors={['#ff7a63', '#e4e8ef']} />
            </div>
            <div className=" max-h-full">
            <div className=" max-h-full">
              <PieChart title='Annually' value={ new Intl.NumberFormat().format(annualPicks * 21) } series={[ annualPercentageIncome, 100 - annualPercentageIncome]} colors={['#a4f264', '#e4e8ef']} />
            </div>
            </div>
        </div>
      </div>
    )}
    </>
  )
}

export default Dashboard