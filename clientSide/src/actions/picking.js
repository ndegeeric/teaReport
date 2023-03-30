import * as api from '../api/index.js';
import { GETPICKS, CREATE, UPDATE, DELETE, AUTH_ERROR } from '../util/constants.js';

export const getPicks = () => async(dispatch) => {
    try {
        const { data } = await api.getPicks();
        // console.log(data)

        dispatch({ type: GETPICKS, data });
    } catch (error) {
        console.log(error);
    }
}

export const createPick = (pickData, setErrorHandler) => async(dispatch) => {
    try {
        const { data } = await api.createPick(pickData);
        // console.log(data)
        dispatch({ type: CREATE, data });
    } catch (error) {
        if(error?.response?.data?.message){
            dispatch({
                type: AUTH_ERROR,
                message: error?.response?.data?.message
            })
            setErrorHandler({ hasError: true, message: error?.response?.data?.message});
        }else{
            setErrorHandler({ hasError: true, message: `Server can not be reached.`});
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
                message: error?.response?.data?.message
            })
            setErrorHandler({ hasError: true, message: error?.response?.data?.message});
        }else {
            setErrorHandler({ hasError: true, message: `Server can not be reached` })
        }
    }
}

export const deleteCurrentPick = (_id) => async (dispatch) => {
    try {
        await api.deletePick(_id);

        dispatch({ type: DELETE, data: _id });
        
    } catch (error) {
        console.log(error);
    }
}