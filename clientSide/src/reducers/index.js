import { combineReducers } from "redux";

import auth from './auth';
import picks from './pickings';
import expenses from './expenses';
import analysis from './analysis';
import rangeData from './rangeData';

export default combineReducers({
    auth, picks, expenses, analysis, rangeData
});