import {createSlice} from '@reduxjs/toolkit';

const citySelectorSlice = createSlice({
  name: 'citySelector',
  initialState: {selectedCity: 'Mumbai'},
  reducers: {
    currentCity: (state, action) => {
      state.selectedCity = action.payload;
    },
  },
});
export const {currentCity} = citySelectorSlice.actions;
export default citySelectorSlice.reducer;
