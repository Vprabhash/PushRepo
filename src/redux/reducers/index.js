import {combineReducers} from 'redux';
import authReducer from './authSlice';
import profileReducer from './profileSlice';
import otpReducer from './otpSlice';
import forgetReducer from './forgetSlice';
import resetReducer from './resetSlice';
import signInReducer from './signInSlice';
import listReducer from './listSlice';
import logOutReducer from './logOutSlice';
import artistListReducer from './listApi/artistList';

import spotLightReducer from './listApi/spotLightList';
import clubLocationReducer from './listApi/clubLocationList';
import upComingEventReducer from './listApi/UpComingEventList';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  otp: otpReducer,
  forget: forgetReducer,
  reset: resetReducer,
  signIn: signInReducer,
  list: listReducer,
  logOut: logOutReducer,
  artist: artistListReducer,
  spotLight: spotLightReducer,
  clubLocation: clubLocationReducer,
  upComingEvent: upComingEventReducer,
});

export default rootReducer;
