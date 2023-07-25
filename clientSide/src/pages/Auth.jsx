import React, { useState , useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { signIn, signUp } from '../actions/auth';
import { Box, Typography, TextField, Button, Stack, } from '@mui/material';
import ErrorAuth  from '../components/ErrorAuth';

const Auth = () => {
    useEffect(() => {
      localStorage.clear();     
    }, [])
    
    const initialState = { firstname: '', lastname: '', email: '', password: '', cpassword: '' }
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [errorHandler, setErrorHandler] = useState({ hasError: false, message: ""});
    const [buttonActive, setButtonActive] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const enableButton = () => buttonRef.current.disabled = true;

    const validateEmail = (e) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(re.test(e.target.value)) {
            setErrorHandler({ hasError: false, message: ''});
            return;
        } else {
            return setErrorHandler({ hasError: true, message: 'You must enter a valid email' });
        }       
        
    }

    const validatePassword = (e) => {
        const re =  /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/
        
        if (re.test(e.target.value)) {
            setErrorHandler({ hasError: false, message: '' });
            setButtonActive(e.currentTarget.disabled = false);
            return;

        } else {
            return setErrorHandler({ hasError: true, message: `Password must contain uppercase and special characters`})
        }
    }
    // console.log(formData)

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
    <Box className='bg-[#e6f2f0] w-screen flex flex-col gap-4 items-center justify-center min-h-screen p-5'>
        <Typography variant='h5' component='h4'>{ isSignup? 'Sign Up': 'Log In'}</Typography>
        <Stack className='flex flex-col w-full md:max-w-md' marginBottom={3}>
            <Box>
                <ErrorAuth errorHandler={errorHandler} setErrorHandler={setErrorHandler} />
            </Box>
        <form className='flex flex-col w-full gap-4'>
            { 
                isSignup ? <>
                    <TextField required name="firstname" placeholder='First Name' onChange={(e)=> setFormData({ ...formData, firstname: e.target.value })} variant='outlined' value={formData.firstname} fullWidth />
                    <TextField required name="lastname" placeholder='Last Name' onChange={(e)=> setFormData({ ...formData, lastname: e.target.value })} variant='outlined' value={formData.lastname} fullWidth />                
                </> : ''
                
            }
            <TextField autoComplete='false' required name="email" placeholder='Email' onChange={ e => setFormData({ ...formData, email: e.target.value })} onBlur={ validateEmail } variant='outlined' value={formData.email} fullWidth />
            <TextField required onKeyPress={(e)=> handleKeyPress(e)} type="password" name="password" placeholder='Password' onChange={(e)=> setFormData({ ...formData, password: e.target.value })} variant='outlined' onBlur={ validatePassword } value={formData.password} fullWidth/>
            {
                isSignup ? <>
                    <TextField required type="password" name="cpassword" placeholder='Confirm Password' onChange={(e)=> setFormData({ ...formData, cpassword: e.target.value})} variant='outlined' value={formData.cpassword} fullWidth />                
                </> : ''
            }
            <Button disabled={isSignup && buttonActive } variant='contained' onClick={handleSubmit} fullWidth>{ isSignup ? 'Save' : 'Log In'}</Button>
        </form>
        </Stack>
            <Button className='text-transform: capitalize' onClick={() => setIsSignup(prevIsSignup => !prevIsSignup)} >{
                isSignup ? 'Already a member Log In': 'Not a member Sign Up'
            }</Button>
    </Box>
  )
}

export default Auth