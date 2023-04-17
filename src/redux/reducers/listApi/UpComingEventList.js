import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../../services/restService';
import {BASE_URL, UPCOMINGEVENT} from '../../../services/Apis';
// Async thunk to fetch the UpComingEventApi
export const UpComingEventApi = createAsyncThunk(
  'list/UpComingEventApi',
  async userId => {
    try {
      const response = await api.get(`${BASE_URL}${UPCOMINGEVENT}`);
      return response.data;
    } catch (error) {
      console.log('list/UpComingEventApi error:', error);
    }
  },
);
const UpComingEventList = createSlice({
  name: 'list',
  initialState: {data: {}, isLoading: false, status: 'idle', error: null},
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(UpComingEventApi.pending, state => {
        state.isLoading = true;
        state.status = 'loading';
      })
      .addCase(UpComingEventApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(UpComingEventApi.rejected, (state, action) => {
        state.isLoading = false;
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export default UpComingEventList.reducer;
