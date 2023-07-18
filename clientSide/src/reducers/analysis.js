

const analysisReducer = (analysis=[], action) => {
    switch (action.type) {
        case 'MONTHLYPICKS':
            return action.payload;          
        
        case 'ANNUALPICKS':
            return [ ...analysis, action.data ];

        case 'MONTHLYEXPENSIS':
            return [ ...analysis, action.payload ];

        default:
            return analysis
    }
}

export default analysisReducer;