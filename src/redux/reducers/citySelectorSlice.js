import {createSlice} from '@reduxjs/toolkit';

const citySelectorSlice = createSlice({
  name: 'citySelector',
  initialState: {
    selectedCity: 'Mumbai',
    userBaseCity: 'Mumbai',
    isSelected: false,
  },
  reducers: {
    currentCity: (state, action) => {
      state.selectedCity = action.payload;
    },
    userCurrentCity: (state, action) => {
      state.userBaseCity = action.payload;
    },
    setSelected: (state, action) => {
      state.isSelected = action.payload;
    },
  },
});
export const {currentCity, userCurrentCity, setSelected} =
  citySelectorSlice.actions;
export default citySelectorSlice.reducer;
