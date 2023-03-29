import { GETPICKS, CREATE, UPDATE, DELETE } from "../util/constants";

const picksReducer = (picks = [], action) => {
    // console.log(action.data)
    switch (action.type) {
        case GETPICKS:
            return  action.data;

        case CREATE:
            return [ ...picks, action.data ];

        case UPDATE:
            return picks.map((pick) => pick._id === action.data._id ? action.data : pick);

        case DELETE:
            return picks.filter(pick => pick._id !== action.data);
    
        default:
            return picks;
    }

}

export default picksReducer;