import {combineReducers} from 'redux';
import authReducer from './authSlice';
import profileReducer from './profileSlice';
import artistListReducer from './artistSlice';
import spotLightReducer from './spotLightSlice';
import clubLocationReducer from './clubLocationSlice';
import upComingEventSlice from './upComingEventSlice';
import citySelectorSlice from './citySelectorSlice';
import loaderSlice from './loaderSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  artist: artistListReducer,
  spotLight: spotLightReducer,
  clubLocation: clubLocationReducer,
  upComingEvent: upComingEventSlice,
  citySelector: citySelectorSlice,
  loader: loaderSlice,
});

export default rootReducer;
