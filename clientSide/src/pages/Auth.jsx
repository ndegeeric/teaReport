import React, { useState , useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { signIn, signUp } from '../actions/auth';
import { Box, Grid, Typography, TextField, Button, } from '@mui/material';
import ErrorAuth  from '../components/ErrorAuth';

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

    const handleEmailChange = async(e) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(re.test(e.target.value)) {
            setErrorHandler({ hasError: false, message: ''})
            return setFormData({ ...formData, email: e.target.value }) 
        } else {
            setErrorHandler({ hasError: true, message: 'You must enter a valid email' });
            return
        }       
        
    }
    // console.log(formData)

    const handleSubmit = (e) => {
        e.preventDefault();
        // if(handleEmailChange()) {
        //     console.log(formData.email)
        // }

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
                    <TextField required name="firstname" placeholder='First Name' onChange={(e)=> setFormData({ ...formData, firstname: e.target.value })} variant='outlined' value={formData.firstname} fullWidth />
                    <TextField required name="lastname" placeholder='Last Name' onChange={(e)=> setFormData({ ...formData, lastname: e.target.value })} variant='outlined' value={formData.lastname} fullWidth />                
                </> : ''
                
            }
            <TextField autoComplete='false' required name="email" placeholder='Email' onChange={ e => setFormData({ ...formData, email: e.target.value })} variant='outlined' value={formData.email} fullWidth />
            <TextField required onKeyPress={(e)=> handleKeyPress(e)} type="password" name="password" placeholder='Password' onChange={(e)=> setFormData({ ...formData, password: e.target.value })} variant='outlined' value={formData.password} fullWidth/>
            {
                isSignup ? <>
                    <TextField required type="password" name="cpassword" placeholder='Confirm Password' onChange={(e)=> setFormData({ ...formData, cpassword: e.target.value})} variant='outlined' value={formData.cpassword} fullWidth />                
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