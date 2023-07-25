import { MONTHLYPICKS } from '../util/constants';

const analysisReducer = (analysis=[], action) => {
    switch (action.type) {
        case MONTHLYPICKS:
            return action.payload;          
        
        // case 'GANGEPICKS':
        //     return  action.data ;

        // case 'MONTHLYEXPENSIS':
        //     return [ ...analysis, action.payload ];

        default:
            return analysis
    }
}

export default analysisReducer;