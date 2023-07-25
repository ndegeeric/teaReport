import * as api from '../api';
import { RANGEPICKS } from '../util/constants';

export const getRangeData = (range) => async (dispatch) => {
    try {        
        const { data } = await api.fetchRangePicks(range);
    
        dispatch({ type: RANGEPICKS, payload: data });
    } catch (error) {
        console.log(error);
    }
}