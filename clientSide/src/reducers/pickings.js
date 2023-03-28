import { GETPICKS, CREATE, UPDATE, DELETE } from "../util/constants";

const picksReducer = (state=[], action) => {
    
    switch (action.type) {
        case GETPICKS:
            // return console.log(state)
            return { ...state, picks: action.data }

        case CREATE:
            // return console.log(state)
            return [ ...state.picks, action.data ];

        case UPDATE:
            return state.map((pick) => pick._id === action.data ? action.data : pick);

        case DELETE:
            return state.filter(pick => pick._id !== action.data);
    
        default:
            return state;
    }

}

export default picksReducer;