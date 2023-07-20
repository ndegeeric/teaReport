import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './app.css';

import "react-datepicker/dist/react-datepicker.css";
import { Auth, Aside, Navbar } from './components';
import { Dashboard, Expenses, ExpenseDetails, Pickings, Settings, ExpensesForm, PickingsForm, PickingDetails } from './pages';

const App = () => {
  const [activeLink, setActiveLink] = useState('Overview');
  const [notification, setNotification] = useState(false)

  const navigate = useNavigate();

  useEffect(()=>{

    console.log(!JSON.parse(localStorage.getItem('profile')))
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
  
  return (
    <div className='flex text-[#141545]'>
    { user ? <Aside activeLink={activeLink} setActiveLink={setActiveLink} /> : ''}
    <div className='w-full h-screen'>
      {user? <Navbar notification={ notification} setNotification={setNotification} activeLink={activeLink} setActiveLink={setActiveLink} /> : ''}
      <Routes>
        <Route path='/' element={!user && <Auth />} />
        <Route path='/dashboard' element={ <Dashboard />} />
        <Route path='/pickings' element={<Pickings />} />
        <Route path='/expenses' element={<Expenses />} />
        <Route path='/expenseDetails/:id' element={ <ExpenseDetails />} />
        <Route path='/settings' element={ <Settings />} />
        <Route path='/form' element={ <ExpensesForm /> } />
        <Route path= '/pickingsForm' element={ <PickingsForm /> } />
        <Route path='/pickingDetails/:id' element={ <PickingDetails />} />
      </Routes>
    </div>
    </div>
  )
}

export default App