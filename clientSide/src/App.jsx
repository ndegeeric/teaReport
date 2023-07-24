import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './app.css';

import "react-datepicker/dist/react-datepicker.css";
import { Aside, Navbar } from './components';
import { Dashboard, Auth, Expenses, ExpenseDetails, Pickings, Settings, ExpensesForm, PickingsForm, PickingDetails } from './pages';

const App = () => {
  const [activeLink, setActiveLink] = useState('Overview');
  const [notification, setNotification] = useState(false)

  const navigate = useNavigate();
  
  useEffect(()=>{  
    if(!JSON.parse(localStorage.getItem('profile'))){
      localStorage.clear();
      navigate('/');
    }

    const unLoad = (e)=> {
      e.preventDefault();
      e.returnValue = '';
      return '';
    };
    
    window.addEventListener("beforeunload", unLoad);
    return () => window.removeEventListener("beforeunload", unLoad)
    // eslint-disable-next-line 
  },[]);
  
  const user = JSON.parse(localStorage.getItem('profile'));
  // console.log(user);
  
  return (
    <div className='flex text-[#141545]'>
    { user ? <Aside activeLink={activeLink} setActiveLink={setActiveLink} /> : '' }
    <div className='w-full h-screen'>
      { user ? <Navbar notification={ notification} setNotification={setNotification} activeLink={activeLink} setActiveLink={setActiveLink} /> : ''}
      <Routes>
        <Route path='/' element={ <Auth />} />
        <Route path='/dashboard' element={ <Dashboard />} />
        <Route path='/pickings' element={<Pickings />} />
        <Route path='/expenses' element={<Expenses />} />
        <Route path='/expenseDetails/:id' element={ <ExpenseDetails />} />
        <Route path='/settings' element={ <Settings />} />
        <Route path='/form' element={ <ExpensesForm setActiveLink={setActiveLink} /> } />
        <Route path= '/pickingsForm' element={ <PickingsForm setActiveLink={setActiveLink} /> } />
        <Route path='/pickingDetails/:id' element={ <PickingDetails />} />
      </Routes>
    </div>
    </div>
  )
}

export default App