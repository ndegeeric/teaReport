import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './app.css';


import { Auth, Home, Navbar } from './components';

const App = () => {

  const navigate = useNavigate();

  useEffect(()=>{
    if(JSON.parse(localStorage.getItem('profile')) ){
      localStorage.clear();
      navigate('/');
    }
    // eslint-disable-next-line 
  },[]);

  const user = JSON.parse(localStorage.getItem('profile'));
  
  return (
    <>
   {user ? <Navbar /> : ''}
    <Routes>
      <Route path='/' element={!user && <Auth />} />
      <Route path='/home' element={<Home />} />
    </Routes>
    </>
  )
}

export default App