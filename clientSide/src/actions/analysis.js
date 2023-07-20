import * as api from '../api';

export const getMonthlyPicks = () => async(dispatch) => {
    const { data } = await api.getMonthlyPicks(); 

    // console.log(data);
    dispatch({ type: 'MONTHLYPICKS', payload: data });
} 

export const fetchRangePicks = () => async(dispatch) => {
    const { data } = await api.fetchRangePicks();

    dispatch({ type: 'GANGEPICKS', data });
}

// export const getMonthlyExp = () => async(dispatch) => {
//     const { data } = await api.getMonthlyExpenses();

//     dispatch({ type: 'MONTHLYEXPENSIS', payload: data });
// }