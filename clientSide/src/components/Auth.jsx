import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { signIn, signUp } from '../actions/auth';
import { Box, Grid, Typography, TextField, Button } from '@mui/material';


const Auth = () => {
    const initialState = { firstname: '', lastname: '', email: '', password: '', cpassword: '' }
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            dispatch(signUp(formData, navigate));
        } else {
            dispatch(signIn(formData, navigate));
        }
    }
    
  return (
    <Box className='bg-[#e6f2f0] flex flex-col gap-4 items-center justify-center min-h-[90vh]'>
        <Typography variant='h5' component='h4'>{ isSignup? 'Sign Up': 'Log In'}</Typography>
        <Grid width='400px' marginBottom={3}>
        <form className='flex flex-col gap-4'>
            {
                isSignup ? <>
                    <TextField name="firstname" placeholder='First Name' onChange={(e)=> setFormData({ ...formData, firstname: e.target.value })} variant='outlined' value={formData.firstname} fullWidth />
                    <TextField name="lastname" placeholder='Last Name' onChange={(e)=> setFormData({ ...formData, lastname: e.target.value })} variant='outlined' value={formData.lastname} fullWidth />                
                </> : ''
                
            }
            <TextField name="email" placeholder='Email' onChange={(e)=> setFormData({ ...formData, email: e.target.value })} variant='outlined' value={formData.email} fullWidth />
            <TextField type="password" name="password" placeholder='Password' onChange={(e)=> setFormData({ ...formData, password: e.target.value })} variant='outlined' value={formData.password} fullWidth/>
            {
                isSignup ? <>
                    <TextField type="password" name="cpassword" placeholder='Confirm Password' onChange={(e)=> setFormData({ ...formData, cpassword: e.target.value})} variant='outlined' value={formData.cpassword} fullWidth />                
                </> : ''
            }
            <Button variant='contained' onClick={handleSubmit} fullWidth>{ isSignup ? 'Save' : 'Log In'}</Button>
        </form>
        </Grid>
            <Button className='text-transform: capitalize' onClick={() => setIsSignup(prevIsSignup => !prevIsSignup)} >{
                isSignup ? 'Already a member Log In': 'Not a member Sign Up'
            }</Button>
    </Box>
  )
}

export default Auth