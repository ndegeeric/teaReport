import * as api from '../api/index.js';
import { AUTH, AUTH_ERROR } from '../util/constants';


export const signIn = (formData, navigate, setErrorHandler) => async(dispatch) => {
    try {
        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });

        navigate('/dashboard')
        
    } catch (error) {
        if(error?.response?.data?.message){
            dispatch({
                type:AUTH_ERROR,
                data: error.response.data.message,
            }) 
            setErrorHandler({ hasError: true, message: error?.response?.data?.message})
        }else {
            setErrorHandler({ hasError: true, message: `The server can not be reached`});
        }
    }
}

export const signUp = (formData, navigate, setErrorHandler) => async(dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data });

        navigate('/dashboard');
    
    } catch (error) {
       if (error?.response?.data?.message) {
        dispatch({
            type: AUTH_ERROR,
            data: error?.response?.data?.message
        })
        setErrorHandler({ hasError: true, message: error?.response?.data?.message });
       } else {
        setErrorHandler({ hasError: true, message: `The Server can not be reached.` })
       }
    }
}

export const logout = (navigate) => async(dispatch) => {
    dispatch({ type: 'LOGOUT' })
    navigate('/')
}