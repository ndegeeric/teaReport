import * as api from '../api';

export const getMonthlyPicks = () => async(dispatch) => {
    const { data } = await api.getMonthlyPicks(); 

    // console.log(data);
    dispatch({ type: 'MONTHLYPICKS', payload: data });
} 

export const getAnnualPicks = () => async(dispatch) => {
    const { data } = await api.getAnnualPicks();

    dispatch({ type: 'ANNUALPICKS', data });
}

export const getMonthlyExp = () => async(dispatch) => {
    const { data } = await api.getMonthlyExpenses();

    dispatch({ type: 'MONTHLYEXPENSIS', payload: data });
}