import * as api from '../api/index.js';
import { GETPICKS, CREATE, UPDATE, DELETE, AUTH_ERROR } from '../util/constants.js';

export const getPicks = (setErrorHandler) => async(dispatch) => {
    try {
        const { data } = await api.getPicks();
        // console.log(data)

        dispatch({ type: GETPICKS, data });
    } catch (error) {
        if (error?.response?.data) {
            dispatch({ type: AUTH_ERROR, message: error?.response?.data})
            setErrorHandler({ hasError: true, message: error?.response?.data})
        }else {
            setErrorHandler({ hasError: true, message: `A Server Error occurred. Please try again later.` });
        };
    }
}

export const createPick = (pickData, setErrorHandler) => async(dispatch) => {
    try {
        const { data } = await api.createPick(pickData);
        // console.log(data)
        dispatch({ type: CREATE, data });
    } catch (error) {
        if(error?.response?.data){
            dispatch({
                type: AUTH_ERROR,
                message: error?.response?.data
            })
            setErrorHandler({ hasError: true, message: error?.response?.data});
        }else{
            setErrorHandler({ hasError: true, message: `Server can not be reachedA Server Error occurred. Please try again later.`});
        }
    }
}

export const updatePick = (updatedPickData, _id, setErrorHandler) => async (dispatch ) => {
    try {
        const { data } = await api.updatePick(updatedPickData, _id);
        // console.log(data);

        dispatch({ type: UPDATE, data });
    } catch (error) {
        if(error?.response?.data?.message){
            dispatch({
                type: AUTH_ERROR,
                message: error?.response?.data
            })
            setErrorHandler({ hasError: true, message: error?.response?.data});
        }else {
            setErrorHandler({ hasError: true, message: `A Server Error occurred. Please try again later.` })
        }
    }
}

export const deleteCurrentPick = (_id, setErrorHandler) => async (dispatch) => {
    try {
        await api.deletePick(_id);

        dispatch({ type: DELETE, data: _id });
        
    } catch (error) {
        if (error?.response?.data?.message) {
            dispatch({ type: AUTH_ERROR, message: error?.response?.data });
            setErrorHandler({ hasError: true, message: error?.response?.data });
        } else {
            setErrorHandler({ hasError: true, message:`A Server Error occurred. Please try again later.`})
        }
    }
}