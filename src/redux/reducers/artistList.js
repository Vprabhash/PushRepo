import {createSlice} from '@reduxjs/toolkit';

const artistListSlice = createSlice({
  name: 'artistList',
  initialState: {artist:[]},
  reducers: {
    artistDataList: (state, action) => {
      state.clubs = action.payload;
    },
  },
});
export const {artistDataList} = artistListSlice.actions;
export default artistListSlice.reducer;
