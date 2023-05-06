import {createSlice} from '@reduxjs/toolkit';

const clubLocationSlice = createSlice({
  name: 'clubLocation',
  initialState: {locationLatLong: {latitude: '', longitude: ''}},
  reducers: {
    addCoordinates: (state, action) => {
      state.locationLatLong = action.payload;
    },
  },
});
export const {addCoordinates} = clubLocationSlice.actions;
export default clubLocationSlice.reducer;
