import { combineReducers } from "redux";

import auth from './auth';
import picks from './pickings';
import expenses from './expenses';
import analysis from './analysis';

export default combineReducers({
    auth, picks, expenses, analysis
});