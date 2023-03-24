import * as api from '../api/index.js';
import { GETPICKS, CREATE, UPDATE, DELETE } from '../util/constants.js';

export const getPicks = () => async(dispatch) => {
    try {
        const { data } = await api.getPicks();

        dispatch({ type: GETPICKS, data });
    } catch (error) {
        console.log(error);
    }
}

export const createPick = (pickData) => async(dispatch) => {
    try {
        const { data } = await api.createPick(pickData);
        // console.log(data)
        dispatch({ type: CREATE, data });
    } catch (error) {
        console.log(error);
    }
}

export const updatePick = (updatedPickData, _id) => async (dispatch ) => {
    // console.log(pickData, _id);
    try {
        const { data } = await api.updatePick(updatedPickData, _id);


        dispatch({ type: UPDATE, data });
    } catch (error) {
        console.log(error);
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