import { combineReducers } from 'redux';
import authReducer from './authSlice';
import profileReducer from './profileSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
});

export default rootReducer;