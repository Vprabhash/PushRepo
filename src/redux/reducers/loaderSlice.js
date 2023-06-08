import {createSlice} from '@reduxjs/toolkit';

const loaderSlice = createSlice({
  name: 'loader',
  initialState: {isLoading: false},
  reducers: {
    showLoader: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
export const {showLoader} = loaderSlice.actions;
export default loaderSlice.reducer;
