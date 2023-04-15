import {combineReducers} from 'redux';
import authReducer from './authSlice';
import profileReducer from './profileSlice';
import otpReducer from './otpSlice';
import forgetReducer from './forgetSlice';
import resetReducer from './resetSlice';
import signInReducer from './signInSlice';
import listReducer from './listSlice';
import logOutReducer from './logOutSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  otp: otpReducer,
  forget: forgetReducer,
  reset: resetReducer,
  signIn: signInReducer,
  list: listReducer,
  logOut: logOutReducer,
});

export default rootReducer;
