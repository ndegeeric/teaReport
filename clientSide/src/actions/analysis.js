import * as api from '../api';
import { MONTHLYPICKS, AUTH_ERROR } from '../util/constants';

export const getMonthlyPicks = (setErrorHandler) => async(dispatch) => {
    try {
        
        const { data } = await api.getMonthlyPicks(); 
    
        dispatch({ type: MONTHLYPICKS, payload: data });
    } catch (error) {
        if (error?.message?.response?.data) {
            dispatch({ type: AUTH_ERROR, message: error?.response?.data })
            setErrorHandler({ hasError: true, message: error?.response?.data })
        } else {
            setErrorHandler({ hasError: `A Server Error occurred. Please try again later`});
        }
    }
} 

// export const fetchRangePicks = (range, setErrorHandler) => async(dispatch) => {
//     const  { data }  = await api.fetchRangePicks(range);

//     try {
//         dispatch({ type: GANGEPICKS, data });
        
//     } catch (error) {
//         if (error?.response?.data) {
//             dispatch({ type: AUTH_ERROR, message: error?.response?.data })
//             setErrorHandler({ hasError: true, message: error?.response?.data});
//         } else {
//             setErrorHandler({ hasError: true, message: `Server cannot be reached` });
//         }
//     }

// }

// export const getMonthlyExp = () => async(dispatch) => {
//     const { data } = await api.getMonthlyExpenses();

//     dispatch({ type: 'MONTHLYEXPENSIS', payload: data });
// }