import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:62854'});

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