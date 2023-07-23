import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExpenses } from '../actions/expenses';
import { getMonthlyPicks } from '../actions/analysis';
import { getPicks } from '../actions/picking';
import {  ArrowCircleDownOutlined, ArrowCircleUpOutlined } from '@mui/icons-material';

import { Feature,  PieChart, PickingsAnalysis, Loading } from '../components';
import { ErrorAuth } from '../components';

const Dashboard = () => {
  
  const [isIncrease] = useState(true);
  const dispatch =useDispatch();
  const [errorHandler, setErrorHandler] = useState({ hasError: false, message: '' });
  // const pickings = useSelector(state => state.picks) || {};
  const analysis = useSelector(state => state.analysis) || {};
  
  // const [eachMonthTotal] = analysis.eachMonthTotal.map( item => [item._id.month, item.weight])
  const [monthlyPicks] = analysis.data?.map(item => item.monthlyPicks) || [];
  const [annualPicks] = analysis.lastOneYear?.map(item => item.lastOneYear) || [];
  // const [eachMonthTotal] = analysis.eachMonthTotal?.map(item => item.eachMonthTotal) || [];
  const [monthlyExpenses] = analysis.monthlyExpenses?.map(item => item.monthlyExpenses) || [];
  const [annualExpenses] = analysis.annualExpenses?.map(item => item.annualExpenses) || [];

  // console.log(eachMonthTotal)

  useEffect(()=>{
  dispatch(getPicks(setErrorHandler));
  dispatch(fetchExpenses(setErrorHandler));
  dispatch(getMonthlyPicks(setErrorHandler));
},[dispatch])
  
  const monthlyPercentageIncome = Math.floor((monthlyPicks * 21)/((monthlyPicks * 21) + monthlyExpenses)* 100) || 0;
  const annualPercentageIncome = Math.floor((annualPicks * 21)/((annualPicks * 21) + annualExpenses)* 100) || 0;
  const monthlyValue = monthlyPicks * 21 > monthlyExpenses ? new Intl.NumberFormat(undefined, {style: 'currency', currency: 'KSH'}).format(monthlyPicks * 21) : new Intl.NumberFormat().format( monthlyExpenses );
  const annualValue = annualPicks * 21 > annualExpenses ? new Intl.NumberFormat(undefined, {style: 'currency', currency: 'KSH'}).format(annualPicks * 21) : new Intl.NumberFormat().format( annualExpenses );

  return (
    <>
    { !analysis.data ? <Loading /> : (
      <>
      <ErrorAuth errorHandler={errorHandler} setErrorHandler={setErrorHandler} />
      <div className="grid md:grid-cols-[3fr_minmax(auto,_1fr)] p-3 ">
        <div className="grid md:grid-rows-[1fr_minmax(auto,_2.19fr),1fr] h-full">
          <div className='grid grid-row-1 md:grid-cols-3 gap-2 items-center justify-center  md:gap-4 pb-3'>
            <Feature  subsValue={`Monthly`} value={` ${ new Intl.NumberFormat(undefined, {style: 'currency', currency: 'KSH'}).format(monthlyPicks) }`} icon={isIncrease ? <ArrowCircleUpOutlined sx={{color: '#26ca71'}} /> : <ArrowCircleDownOutlined sx={{color: '#ff3d3d'}} />} title={'monthly Picked'} percentage={'+15%'} addStyles={'bg-sky-50'} />
            <Feature title='Monthly Income' subsValue='monthly' value={` ${ new Intl.NumberFormat(undefined, {style: 'currency', currency: 'KSH'}).format(monthlyPicks * 21) }`} icon={isIncrease ? <ArrowCircleUpOutlined sx={{color: '#26ca71'}} /> : <ArrowCircleDownOutlined sx={{color: '#ff3d3d'}} />} percentage={'-2%'} addStyles={'bg-green-50'} />
            <Feature  subsValue={`Monthly`} value={` ${ new Intl.NumberFormat(undefined, {style: 'currency', currency: 'KSH'}).format(monthlyExpenses) }`} icon={isIncrease ? <ArrowCircleUpOutlined sx={{color: '#26ca71'}} /> : <ArrowCircleDownOutlined sx={{color: '#ff3d3d'}} />} title={'Monthly Expenses'} percentage={'-7%'} addStyles={'bg-orange-50'} />
          </div>
          <div className="max-h-[280px] overflow-auto mb-2">
            <PickingsAnalysis
              bodyData={analysis.eachMonthTotal}
            />
          </div>
          <div className="grid grid-row-1 md:grid-cols-3 gap-2 items-center justify-center  md:gap-4 pb-3">
            <Feature  subsValue={`Year to Date`} value={` ${ new Intl.NumberFormat(undefined, {style: 'currency', currency: 'KSH'}).format(annualPicks) }`} icon={isIncrease ? <ArrowCircleUpOutlined sx={{color: '#26ca71'}} /> : <ArrowCircleDownOutlined sx={{color: '#ff3d3d'}} />} title={`Annual Picked`} percentage={'-2%'} addStyles={'bg-sky-50'} />
            <Feature title='Expected Bonus' subsValue='year to date' value={` ${ new Intl.NumberFormat(undefined, {style: 'currency', currency: 'KSH'}).format(annualPicks * 44) }`} icon={isIncrease ? <ArrowCircleUpOutlined sx={{color: '#26ca71'}} /> : <ArrowCircleDownOutlined sx={{color: '#ff3d3d'}} />} percentage={'-2%'} addStyles={`bg-green-50`} />
            <Feature title='Annual Expenses' subsValue='year to date' value={` ${ new Intl.NumberFormat(undefined, {style: 'currency', currency: 'KSH'}).format(annualExpenses) }`} icon={isIncrease ? <ArrowCircleUpOutlined sx={{color: '#26ca71'}} /> : <ArrowCircleDownOutlined sx={{color: '#ff3d3d'}} />} percentage={'-2%'} addStyles={`bg-orange-50`} />
          </div>
        </div>
        <div className="grid grid-rows-2  h-full">
            <div className=" max-h-full">
              <PieChart picks={ monthlyPicks * 12 } title='Monthly Income and Expenses' value={ monthlyValue } series={[  monthlyPercentageIncome, 100 - monthlyPercentageIncome]} colors={[ '#a4f264', '#ff7a63' ]} />
            </div>
            <div className=" max-h-full">
            <div className=" max-h-full">
              <PieChart picks={ annualPicks * 12 } title='Annual Income and Expenses' value={ annualValue } series={[ annualPercentageIncome, 100 - annualPercentageIncome]} colors={[ '#a4f264', '#ff7a63' ]} />
            </div>
            </div>
        </div>
      </div>
      </>
    )}
    </>
  )
}

export default Dashboard