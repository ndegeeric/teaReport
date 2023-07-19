import axios from "axios";

// const API = axios.create({ baseURL: 'http://localhost:5000'});
const API = axios.create({ baseURL: 'https://ontime-tea-report.vercel.app/'});

API.interceptors.request.use((req)=> {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
});

export const signIn = (formData) => API.post('/api/user/login', formData);
export const signUp = (formData) => API.post('/api/user/signup', formData);
export const getPicks = () => API.get('/api/rcd');
export const createPick = (pickData) => API.post('/api/rcd', pickData);
export const updatePick = (updatedPick, _id) => API.patch(`/api/rcd/${ _id }`, updatedPick);
export const deletePick = (_id) => API.delete(`api/rcd/${_id}`);
export const fetchExpenses= () => API.get('/api/expenses');
export const createExpense = (expenseData) => API.post('/api/expenses', expenseData); 
export const fetchExpense = (id) => API.get(`/api/expenses/${id}`);
export const updateExpense = (expenseData, _id) => API.patch(`/api/expenses/${_id}`, expenseData);
export const deleteExpense = (id) => API.delete(`/api/expenses/${id}`);
export const fetchRangePicks = (range) => API.post(`/api/analytics/monthlyPicks`, range);
export const getMonthlyPicks = () => API.get(`/api/analytics/groupByMonth`); 
// export const getAnnualPicks = () => API.get(`/api/analytics/annualPicks`); 
// export const getMonthlyExpenses = () => API.get(`/api/analytics/monthlyExpenses`); 