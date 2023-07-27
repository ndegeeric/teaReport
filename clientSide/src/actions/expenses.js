import * as api from '../api/index.js';
import { FETCHEXPENSE, FETCHEXPENSES, CREATEEXPENSE, UPDATEEXPENSE, DELETEEXPENSE, AUTH_ERROR } from '../util/constants.js';

export const fetchExpense = (id, setErrorHandler) => async(dispatch) => {
    try {
        const { data } = await api.fetchExpense(id);
    
        dispatch({ type: FETCHEXPENSE, data})
        
    } catch (error) {
        if (error?.response?.data) {
            dispatch({ type: AUTH_ERROR, message: error?.response?.data });
            setErrorHandler({ hasError: true, message: error?.response?.data });
        } else {
            setErrorHandler({ hasError: true, message: `A Server Error occurred. Please try again later.` });
        }
    }
}

export const fetchExpenses = (setErrorHandler) => async(dispatch) => {
    try {
        const { data } = await api.fetchExpenses();

        dispatch({ type: FETCHEXPENSES, data })
    } catch (error) {
        if (error?.response?.data) {
            // console.error(error.response)
            dispatch({ type: AUTH_ERROR, message: error?.response?.data });
            setErrorHandler({ hasError: true, message: error?.response?.data });
        } else {
            setErrorHandler({ hasError: true, message: `A Server Error occurred. Please try again later.` })
        }
    }
}

export const createExpense = (expenseData, setErrorHandler) => async(dispatch) => {
    try {

        const { data } = await api.createExpense(expenseData);

        dispatch({ type: CREATEEXPENSE, data  })
        
    } catch (error) {
        if( error?.response?.data) {
            dispatch({ type: AUTH_ERROR, message: error?.response?.data });
            setErrorHandler({ hasError: true, message: error?.response?.data });
        } else {
            setErrorHandler({ hasError: true, message: `A Server Error occurred. Please try again later.` });
        }
    }
}

export const updateExpense = (expenseData, _id, setErrorHandler) => async(dispatch) => {
    try {
        const { data } = await api.updateExpense(expenseData, _id);

        dispatch({ type: UPDATEEXPENSE, data })
        
    } catch (error) {
        if( error?.response?.data) {
            dispatch({ type: AUTH_ERROR, message: error?.response?.data });
            setErrorHandler({ hasError: true, message: error?.response?.data });
        } else {
            setErrorHandler({ hasError: true, message: `A Server Error occurred. Please try again later.` });
        }
    }
}

export const deleteExpense = (id, setErrorHandler) => async (dispatch) => {
    try {
        await api.deleteExpense(id);
        dispatch({ type: DELETEEXPENSE, data: id })
    } catch (error) {
        if (error?.response?.data) {
            dispatch({ type: AUTH_ERROR, message: error?.response?.data });
            setErrorHandler({ hasError: true, message: error?.response?.data });
        } else {
            setErrorHandler({ hasError: true, message: `A Server Error occurred. Please try again later.` });
        }
    }
}