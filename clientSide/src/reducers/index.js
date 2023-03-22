import { combineReducers } from "redux";

import auth from './auth';
import picks from './pickings';

export default combineReducers({
    auth, picks,
});