import { combineReducers } from "redux";

import auth from './auth';
import picks from './pickings';
import expenses from './expenses';

export default combineReducers({
    auth, picks, expenses
});