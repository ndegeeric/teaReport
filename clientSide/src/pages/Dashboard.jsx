import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchExpenses } from '../actions/expenses';
import { getMonthlyPicks } from '../actions/analysis';
import { getPicks } from '../actions/picking';

import { Feature,  PieChart, PickingsAnalysis, Loading } from '../components';
import { ErrorAuth } from '../components';
import { currencyFormatter } from '../../utils';

const Dashboard = () => {
  
  const dispatch =useDispatch();
  const [isMonthlyGain, setIsMonthlyGain] = useState(true);
  const [errorHandler, setErrorHandler] = useState({ hasError: false, message: '' });
  const analysis = useSelector(state => state.analysis) || {};
  const rangeData  = useSelector( state =>state?.rangeData.map(item => item.weight));
  const eachMonthExpenses = useSelector(state => state?.analysis?.eachMonthExpenses?.map(item => item.amount)) || [];
  const eachYearPicks = useSelector(state => state?.analysis?.eachYearPicks?.map(item => item.weight)) || [];
  const eachYearExpenses = useSelector(state => state?.analysis?.eachYearExpenses?.map(item => item.amount)) || [];

  
  const [monthlyPicks] = analysis.data?.map(item => item.monthlyPicks) || [];
  const [annualPicks] = analysis.lastOneYear?.map(item => item.lastOneYear) || [];
  const [monthlyExpenses] = analysis.monthlyExpenses?.map(item => item.monthlyExpenses) || [];
  const [annualExpenses] = analysis.annualExpenses?.map(item => item.annualExpenses) || [];
  
  
  const lastMonth = rangeData[rangeData.length - 2] || 0;
  const thisMonth = rangeData[rangeData.length - 1] || 0;
  const lastMonthExpenses = eachMonthExpenses[eachMonthExpenses.length -2] || 0;
  const thisMonthExpenses = eachMonthExpenses[eachMonthExpenses.length -1] || 0;
  const thisYearPicks = eachYearPicks[eachYearPicks.length -1] || 0;
  const lastYearPicks = eachYearPicks[eachYearPicks.length -2] || 0;
  const thisYearExpenses = eachYearExpenses[eachYearExpenses.length -1] || 0;
  const lastYearExpenses = eachYearExpenses[eachYearExpenses.length -2] || 0;
  
  const change = Math.floor(((thisMonth - lastMonth)/lastMonth) * 100 ) || 0;
  const incomeChange = Math.floor((((thisMonth * 25 )- (lastMonth * 25))/(lastMonth * 25)) * 100 || 0);
  const annualChange = Math.floor(((thisYearPicks - lastYearPicks)/lastYearPicks) * 100 ) || 0;
  const expenseChange = Math.floor(((thisMonthExpenses - lastMonthExpenses)/lastMonthExpenses) * 100) || 0;
  const annualExpenseChange = Math.floor(((thisYearExpenses - lastYearExpenses)/lastYearExpenses) * 100) || 0;
  const bonusChange = Math.floor((((thisYearPicks * 50)-(lastYearPicks * 50))/lastYearPicks) * 100) || 0;
  
  
  const monthlyPercentageIncome = Math.floor((monthlyPicks * 25)/((monthlyPicks * 25) + monthlyExpenses)* 100) || 0;
  const annualPercentageIncome = Math.floor((annualPicks * 25)/((annualPicks * 25) + annualExpenses)* 100) || 0;
  const monthlyValue = monthlyPicks * 15 > monthlyExpenses ? currencyFormatter(parseInt(monthlyPicks * 15)) : currencyFormatter(parseInt(monthlyPicks));
  const annualValue = annualPicks * 15 > annualExpenses ? currencyFormatter(parseInt(annualPicks * 15)) : currencyFormatter(parseInt(annualPicks));
  
  // console.log('test' + monthlyValue, monthlyExpenses);
  useEffect(()=> {
    dispatch(getPicks(setErrorHandler));
    dispatch(fetchExpenses(setErrorHandler));
    dispatch(getMonthlyPicks(setErrorHandler));  
  },[dispatch]);

  const isExpense = true;
  
  return (
    <>
    { !analysis.data ? <Loading /> : (
      <>
      <ErrorAuth errorHandler={errorHandler} setErrorHandler={setErrorHandler} />
      <div className="grid md:grid-cols-[3fr_minmax(auto,_1fr)] p-3 ">
        <div className="grid md:grid-rows-[1fr_minmax(auto,_2.19fr),1fr] h-full">
          <div className='grid grid-row-1 md:grid-cols-3 gap-2 items-center justify-center  md:gap-4 pb-3'>
            <Feature subsValue={`Monthly`} value={currencyFormatter(parseInt(monthlyPicks))}  title={'Monthly Picked'} percentage={ change } addStyles={'bg-sky-50'} />
            <Feature title='Monthly Income' subsValue='monthly' value={currencyFormatter(parseInt(monthlyPicks) * 25)} percentage={ incomeChange } addStyles={'bg-green-50'} />
            <Feature isExpense={isExpense} subsValue={`Monthly`} value={currencyFormatter(parseInt(monthlyExpenses))} title={'Monthly Expenses'} percentage={ expenseChange } addStyles={'bg-orange-50'} />
          </div>
          <div className="max-h-[280px] overflow-auto mb-2">
            <PickingsAnalysis
              bodyData={analysis.eachMonthTotal}
            />
          </div>
          <div className="grid grid-row-1 md:grid-cols-3 gap-2 items-center justify-center  md:gap-4 pb-3">
            <Feature subsValue={`Year to Date`} value={currencyFormatter(parseInt(annualPicks))} title={`Annual Picked`} percentage={ annualChange } addStyles={'bg-sky-50'} />
            <Feature title='Expected Bonus' subsValue='year to date' value={currencyFormatter(parseInt(annualPicks) * 50)} percentage={ bonusChange } addStyles={`bg-green-50`} />
            <Feature isExpense={isExpense}  title='Annual Expenses' subsValue='year to date' value={currencyFormatter(parseInt(annualExpenses))} percentage={ annualExpenseChange } addStyles={`bg-orange-50`} />
          </div>
        </div>
        <div className="grid grid-rows-2  h-full">
            <div className=" max-h-full">
              <PieChart monthlyExpenses={monthlyExpenses} monthlyPicks={monthlyPicks} title='Monthly Income Vs Expenses' value={ monthlyValue } series={[  monthlyPercentageIncome, 100 - monthlyPercentageIncome]} colors={[ '#a4f264', '#ff7a63' ]} />
            </div>
            <div className=" max-h-full">
            <div className=" max-h-full"> 
              <PieChart  annualExpenses={annualExpenses} annualPicks={annualPicks} title='Annual Income Vs Expenses' value={ annualValue } series={[ annualPercentageIncome, 100 - annualPercentageIncome]} colors={[ '#a4f264', '#ff7a63' ]} />
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