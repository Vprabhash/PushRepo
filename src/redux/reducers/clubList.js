import {createSlice} from '@reduxjs/toolkit';

const clubsListSlice = createSlice({
  name: 'clubsList',
  initialState: {clubs:[]},
  reducers: {
    clubsList: (state, action) => {
      state.clubs = action.payload;
    },
  },
});
export const {clubsList} = clubsListSlice.actions;
export default clubsListSlice.reducer;
