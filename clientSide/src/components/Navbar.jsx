import React, { useState, useEffect } from 'react';
import { Avatar } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

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
    <div className='navbar'>
        <div className="left">
            <div className="logo">
                <img src="" alt='ontime'/>
            </div>
            <h1>Tea Picking Record</h1>
        </div>
        <div className="right">
            <div className="profile">
                <p>{profile?.user.name }</p>
                <Avatar className='avatar'>{profile?.user.name.charAt(0)}</Avatar>
            </div>
            { 
                profile ? <button onClick={logout}>Logout</button> : null
            }
        </div>
    </div>
  )
}

export default Navbar;