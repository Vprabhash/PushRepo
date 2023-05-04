import {createSlice} from '@reduxjs/toolkit';

const clubLocationSlice = createSlice({
  name: 'clubLocation',
  initialState: {locationLatLong: {latitude: 19.136326, longitude: 72.82766}},
  reducers: {
    addCoordinates: (state, action) => {
      state.locationLatLong = action.payload;
    },
  },
});
export const {addCoordinates} = clubLocationSlice.actions;
export default clubLocationSlice.reducer;
