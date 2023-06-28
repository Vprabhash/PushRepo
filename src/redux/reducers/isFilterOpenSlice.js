import {createSlice} from '@reduxjs/toolkit';

const isFilterOpenSlice = createSlice({
  name: 'isFilterOpen',
  initialState: {isFilterOpen: false},
  reducers: {
    showFilter: (state, action) => {
      state.isFilterOpen = action.payload;
    },
  },
});
export const {showFilter} = isFilterOpenSlice.actions;
export default isFilterOpenSlice.reducer;
