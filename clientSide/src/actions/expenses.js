import * as api from '../api/index.js';

export const fetchExpense = (id) => async(dispatch) => {
    try {
        const { data } = await api.fetchExpense(id);
    
        dispatch({ type: "FETCHEXPENSE", data})
        
    } catch (error) {
        console.log(error);
    }
}

export const fetchExpenses = () => async(dispatch) => {
    try {
        const { data } = await api.fetchExpenses();

        dispatch({ type: 'FETCHEXPENSES', data })
    } catch (error) {
        console.error(error);
    }
}

export const createExpense = (expenseData) => async(dispatch) => {
    try {

        const { data } = await api.createExpense(expenseData);

        dispatch({ type: 'CREATEEXPENSE', data  })
        
    } catch (error) {
        console.error(error);
    }
}

export const updateExpense = (expenseData, _id) => async(dispatch) => {
    try {
        const { data } = await api.updateExpense(expenseData, _id);

        dispatch({ type: 'UPDATEEXPENSE', data })
        
    } catch (error) {
        console.log(error);
    }
}

export const deleteExpense = (id) => async (dispatch) => {
    try {
        await api.deleteExpense(id);
        // console.log('id: ' + id);
        dispatch({ type: 'DELETEEXPENSE', data: id })
    } catch (error) {
        console.log(error);
    }
}