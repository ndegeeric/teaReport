import { GETPICKS, CREATE, UPDATE, DELETE } from "../util/constants";

const picksReducer = (state=[], action) => {
    switch (action.type) {
        case GETPICKS:
            return { ...state, picks: action.data, loading: false, errors: null }

        case CREATE:
            return [ ...state, action.data ];

        case UPDATE:
            return state.picks.map((pick) => pick._id === action.data ? action.data : pick);

        case DELETE:
            return state.picks.filter(pick => pick._id !== action.data);
    
        default:
            return state;
    }

}

export default picksReducer;