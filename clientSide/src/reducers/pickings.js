import { GETPICKS, CREATE, UPDATE } from "../util/constants";

const picksReducer = (state=[], action) => {
    switch (action.type) {
        case GETPICKS:
            return { ...state, picks: action.data, loading: false, errors: null }

        case CREATE:
            return [ ...state, action.data ];

        case UPDATE:
            return state.map((pick) => pick._id === action.data ? action.data : pick);
    
        default:
            return state;
    }
}

export default picksReducer;