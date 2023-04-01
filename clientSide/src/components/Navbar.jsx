import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { Box, Typography, Avatar } from '@mui/material';

import { LOGOUT } from '../util/constants';

const Navbar = () => {

    const navigate = useNavigate();
    const dispatch =  useDispatch();
    const location = useLocation();

    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')));
    
    const logout = () => {
        dispatch({ type: LOGOUT });

        navigate('/');
        setProfile(null);
    }

    useEffect(()=> {
        const token = profile && profile.token;

        if(token) {
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        // eslint-disable-next-line 
    },[ location ]);


  return (
    <Box className='bg-[#fcfcfc] flex flex-col-reverse sm:flex-row items-center md:justify-end  p-4'>
        <Box className="flex flex-row sm:gap-4 mt-5 sm:mt-0 items-center justify-center w-full">
            <div className="flex">
                <img className='w-[70px] h-[60px]' src="https://llamdodu.sirv.com/icodeThis/ontime.png" alt='ontime'/>
            </div>
            <div className=" flex justify-center w-full">
            <Typography className='text-[35px] w-[100vw] sm:w-auto text-center '  >Tea Picking Record</Typography>
            </div>
        </Box>
        <Box className="flex gap-4 items-center sm:justify-end justify-between w-full">
            <div className="flex flex-row-reverse sm:flex-row gap-4 items-center font-semibold">
                <p>{profile?.user.name }</p>
               <Avatar className='bg-[#1e36e8] '>{profile?.user.name.charAt(0)}</Avatar>
            </div>             
             <button className='bg-red-500 px-5 py-1 rounded-lg text-white font-semibold' onClick={logout}>Logout</button> 
        </Box>
    </Box>
  )
}

export default Navbar;