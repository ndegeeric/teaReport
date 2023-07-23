import React, { useState , useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { signIn, signUp } from '../actions/auth';
import { Box, Grid, Typography, TextField, Button, } from '@mui/material';
import ErrorAuth  from './ErrorAuth';

const Auth = () => {
    useEffect(() => {
      localStorage.clear();     
    }, [])
    
    const initialState = { firstname: '', lastname: '', email: '', password: '', cpassword: '' }
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [errorHandler, setErrorHandler] = useState({ hasError: false, message: ""})

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            dispatch(signUp(formData, navigate, setErrorHandler));
        } else {
            dispatch(signIn(formData, navigate, setErrorHandler));
        }
    }
    
    const handleKeyPress = (e) => {
        if(e.key==='Enter'){
            handleSubmit(e);
        }
    }

  return (
    <Box className='bg-[#e6f2f0] w-full flex flex-col gap-4 items-center justify-center min-h-screen'>
        <Typography variant='h5' component='h4'>{ isSignup? 'Sign Up': 'Log In'}</Typography>
        <Grid className='md:w-[400px] width:[100%]' marginBottom={3}>
            <ErrorAuth errorHandler={errorHandler} setErrorHandler={setErrorHandler} />
        <form className='flex flex-col w-full gap-4 p-2'>
            {
                isSignup ? <>
                    <TextField name="firstname" placeholder='First Name' onChange={(e)=> setFormData({ ...formData, firstname: e.target.value })} variant='outlined' value={formData.firstname} fullWidth />
                    <TextField name="lastname" placeholder='Last Name' onChange={(e)=> setFormData({ ...formData, lastname: e.target.value })} variant='outlined' value={formData.lastname} fullWidth />                
                </> : ''
                
            }
            <TextField name="email" placeholder='Email' onChange={(e)=> setFormData({ ...formData, email: e.target.value })} variant='outlined' value={formData.email} fullWidth />
            <TextField onKeyPress={(e)=> handleKeyPress(e)} type="password" name="password" placeholder='Password' onChange={(e)=> setFormData({ ...formData, password: e.target.value })} variant='outlined' value={formData.password} fullWidth/>
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