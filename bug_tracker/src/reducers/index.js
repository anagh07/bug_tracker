import { combineReducers } from 'redux';

import alertReducer from './alert';
import auth from './auth';

export default combineReducers({ alertReducer, auth });
