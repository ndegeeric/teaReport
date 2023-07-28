import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { Box, Typography, Avatar } from '@mui/material';
import { MenuOutlined, CloseOutlined, SearchOutlined, NotificationAddOutlined } from '@mui/icons-material';

import { logout } from '../actions/auth.js'
import { AsideLink } from '../components';

const Navbar = ({ activeLink, setActiveLink, notification, setNotification }) => {

    const [profile] = useState(JSON.parse(localStorage.getItem('profile')));
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{

        if (profile?.token) {
            const decodedToken = decode(profile.token);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                console.log('Expired token: ' + decodedToken);
                dispatch(logout(navigate));
                localStorage.clear();
            }

        } else {
            logout(navigate);
        }
    //  eslint-disable-next-line
    },[location, navigate]);
    
    
    const MobileMenu = () => {
        const dispatch = useDispatch();
        
        const handleLogout = (e) => {
            e.preventDefault();
            dispatch(logout(navigate));
            // navigate('/');
        };

        const openExpenseForm = (e) => {
            e.preventDefault();
            navigate('/form');
            setShowMobileMenu(false);
            setActiveLink('Expense Form');
        }

        const openPickingForm = (e) => {
            e.preventDefault();
            navigate('/pickingsForm');
            setShowMobileMenu(false);
            setActiveLink('Picking Form');
        }

        return (
            <>
            { showMobileMenu ? (
            <div className='absolute right-0 w-screen sm:w-[50%] md:hidden h-full overflow-hidden text-white  bg-gray-700 z-[100] text-right text-4xl p-3'>
              <AsideLink title='Overview' activeLink={activeLink} setActiveLink={setActiveLink} setShowMobileMenu={setShowMobileMenu} showMobileMenu={showMobileMenu} to={'/dashboard'} addStyles={'justify-end'} />
              <AsideLink title='Pickings' activeLink={activeLink} setActiveLink={setActiveLink} setShowMobileMenu={setShowMobileMenu} showMobileMenu={showMobileMenu} to={'/pickings'} addStyles={'justify-end'} />
              <AsideLink title='Expenses' activeLink={activeLink} setActiveLink={setActiveLink} setShowMobileMenu={setShowMobileMenu} showMobileMenu={showMobileMenu} to={'/expenses'} addStyles={'justify-end'} />
              <AsideLink title='Settings' activeLink={activeLink} setActiveLink={setActiveLink} setShowMobileMenu={setShowMobileMenu} showMobileMenu={showMobileMenu} to={'/settings'}  addStyles={'justify-end'} />
              <button className='px-4 mt-2 w-full text-right' onClick = { openPickingForm }>Enter Picking</button>
              <button className='px-4 mt-2 w-full text-right' onClick = { openExpenseForm }>Enter Expense</button>
              <button className='px-4 mt-2 w-full text-right' onClick = { handleLogout }>Logout</button>
            </div>
            ): ''}
            </>
        )
    }
    
  return (
    <>
    <Box className='bg-[#fcfcfc] flex flex-col-reverse sm:flex-row items-center md:justify-end  w-full px-10 py-4'>
        <Box className="flex flex-row sm:gap-4 mt-5 sm:mt-0 items-center justify-center w-full">
            <div className=" flex justify-between w-full">
                <Typography className='w-screen sm:w-full text-center md:text-left text-xl'>{ activeLink }</Typography>
            </div>
        </Box>
        <Box className="flex gap-2 items-center sm:justify-end justify-between w-full">
            <div className="flex flex-row sm:flex-row gap-4 items-center font-semibold">
                    <SearchOutlined />
                    <NotificationAddOutlined sx={{ color: `${ notification && '#ff0000' }`}} />
                    <Avatar className='bg-[#1e36e8] '>{ profile?.user.name.charAt(0) }</Avatar>
                <div className='flex justify-center flex-col'>
                    <p>{profile?.user.name }</p>
                    <p className='text-xs font-thin text-[#666] leading-3 text-ellipsis '>{profile?.user.email }</p>
                </div>
            </div>    
            <div className="flex md:hidden ">
                <button onClick={() => setShowMobileMenu((prevState)=>!prevState)}>{ showMobileMenu ? <CloseOutlined /> : <MenuOutlined /> }</button>
            </div>         
        </Box>
    </Box>
        <MobileMenu />
    </>
  )
}

export default Navbar;