import { AUTH, LOGOUT, AUTH_ERROR } from "../util/constants";

const authReducer = (state = {authData: null}, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action.data }));
            
            return{ ...state, authData: action.data, loading: false, errors: null };
            
        case LOGOUT:
            localStorage.clear();
            return{ ...state, authData: null};

        case AUTH_ERROR:
            return state;
    
        default:
            return state;
    }
}

export default authReducer;