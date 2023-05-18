import {createSlice} from '@reduxjs/toolkit';

const citySelectorSlice = createSlice({
  name: 'citySelector',
  initialState: { selectedCity: 'Mumbai', userBaseCity: 'Mumbai' },
  reducers: {
    currentCity: (state, action) => {
      state.selectedCity = action.payload;
    },
    userCurrentCity: (state, action) => {
      state.userBaseCity = action.payload;
    },
    
  },
});
export const {currentCity,userCurrentCity} = citySelectorSlice.actions;
export default citySelectorSlice.reducer;
