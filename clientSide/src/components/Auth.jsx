import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { signIn, signUp } from '../actions/auth';
import { Paper, Grid, Typography, TextField, Button } from '@mui/material';


const Auth = () => {
    const initialState = [{ firstname: '', lastname: '', email: '', password: '', cpassword: '' }];
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
    <Paper>
        <Typography>{ isSignup? 'Sign Up': 'Log In'}</Typography>
        <Grid width='400px' marginBottom={3}>
        <form>
            {
                isSignup ? <>
                    <TextField name="firstname" placeholder='First Name' onChange={(e)=> setFormData({ ...formData, firstname: e.target.value })} variant='outlined' value={formData.firstname} fullWidth />
                    <TextField name="lastname" placeholder='Last Name' onChange={(e)=> setFormData({ ...formData, lastname: e.target.value })} variant='outlined' value={formData.lastname} fullWidth />                
                </> : ''
                
            }
            <TextField name="email" placeholder='Email' onChange={(e)=> setFormData({ ...formData, email: e.target.value })} variant='outlined' value={formData.email} fullWidth />
            <TextField name="password" placeholder='Password' onChange={(e)=> setFormData({ ...formData, password: e.target.value })} variant='outlined' value={formData.password} fullWidth/>
            {
                isSignup ? <>
                    <TextField name="cpassword" placeholder='Confirm Password' onChange={(e)=> setFormData({ ...formData, cpassword: e.target.value})} variant='outlined' value={formData.cpassword} fullWidth />                
                </> : ''
            }
            <Button onClick={handleSubmit} fullWidth>{ isSignup ? 'Save' : 'Log In'}</Button>
        </form>
        </Grid>
            <button onClick={() => setIsSignup(prevIsSignup => !prevIsSignup)} >{
                isSignup ? 'Already a member Log In': 'Not a member Sign Up'
            }</button>
    </Paper>
  )
}

export default Auth