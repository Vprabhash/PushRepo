import {combineReducers} from 'redux';
import authReducer from './authSlice';
import profileReducer from './profileSlice';
import artistListReducer from './artistSlice';
import spotLightReducer from './spotLightSlice';
import clubLocationReducer from './clubLocationSlice';
import upComingEventSlice from './upComingEventSlice';
import citySelectorSlice from './citySelectorSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  artist: artistListReducer,
  spotLight: spotLightReducer,
  clubLocation: clubLocationReducer,
  upComingEvent: upComingEventSlice,
  citySelector: citySelectorSlice,
});

export default rootReducer;
