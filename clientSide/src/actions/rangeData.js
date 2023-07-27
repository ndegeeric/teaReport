import * as api from '../api';
import { RANGEPICKS, AUTH_ERROR } from '../util/constants';

export const getRangeData = (range, setErrorHandler) => async (dispatch) => {
    try {        
        const { data } = await api.fetchRangePicks(range);
    
        dispatch({ type: RANGEPICKS, payload: data });
    } catch (error) {
        if(error?.response?.data){
            dispatch({ type: AUTH_ERROR, message: error.response.data });
            setErrorHandler({ hasError: true, message: error.response.data });
        } else {
            setErrorHandler({ hasError: true, message: `A Server Error occurred. Please try again later`})
        }
    }
}