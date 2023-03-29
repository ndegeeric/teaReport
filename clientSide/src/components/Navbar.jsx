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

    },[ location ]);


  return (
    <Box className='bg-[#fcfcfc] flex flex-col-reverse md:flex-row items-center justify-between p-4'>
        <Box className="flex gap-4 mt-5 md:mt-0 items-center">
            <div className="w-[50px]">
                <img className='w-[40px] h-[40px]' src="https://llamdodu.sirv.com/icodeThis/ontime.png" alt='ontime'/>
            </div>
            <Typography className='text-xs md:text-xl font-[10px]' variant='h4' component='h2' >Tea Picking Record</Typography>
        </Box>
        <Box className="flex gap-4 items-center justify-between w-full">
            <div className="flex gap-4 items-center font-semibold">
                <p>{profile?.user.name }</p>
               {profile && <Avatar className='bg-[#1e36e8] '>{profile?.user.name.charAt(0)}</Avatar>}
            </div>
            { 
                profile?.user ? <button className='bg-red-500 px-5 py-1 rounded-lg text-white font-semibold' onClick={logout}>Logout</button> : null
            }
        </Box>
    </Box>
  )
}

export default Navbar;