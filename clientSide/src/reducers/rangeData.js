import { RANGEPICKS } from '../util/constants';

const rangeDataReducer  = (rangeData=[] , action ) => {

    switch (action.type) {
        case RANGEPICKS:
            return action.payload;
    
        default:
           return rangeData
    }
}

export default rangeDataReducer;