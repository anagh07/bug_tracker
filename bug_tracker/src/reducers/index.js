import { combineReducers } from 'redux';

import alertReducer from './alert';
import auth from './auth';
import ticket from './ticket';
import project from './project';

export default combineReducers({ alertReducer, auth, ticket, project });
