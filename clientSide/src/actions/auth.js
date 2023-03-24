import * as api from '../api/index.js';
import { AUTH } from '../util/constants';

export const signIn = (formData, navigate) => async(dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        // console.log(formData)

        dispatch({ type: AUTH, data });

        navigate('/home')
        
    } catch (error) {
        console.log(error);
    }
}

export const signUp = (formData, navigate) => async(dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data });

        navigate('/home')
    
    } catch (error) {
        console.log(error);
    }
}
