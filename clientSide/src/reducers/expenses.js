

const expensesReducer= (expenses = [], action) => {
    switch (action.type) {
        case "FETCHEXPENSES":
            return action.data

        case 'FETCHEXPENSES': 
            return action.data
        
        case 'CREATEEXPENSE':
            return [ ...expenses, action.data ]

        case 'UPDATEEXPENSE':
            return expenses.map(expense => expense._id === action.data._id ? action.data : expense)

        case 'DELETEEXPENSE':
            return expenses.filter(expense => expense._id !== action.data);

        default: 
            return expenses;
    }
}

export default expensesReducer;