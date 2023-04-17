import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {BASE_URL, UPCOMINGEVENT} from '../../services/Apis';
import api from '../../services/restService';

// Async thunk to fetch the upComingEventApi
export const upComingEventApi = createAsyncThunk(
  'upComingEvent/upComingEventApi',
  async userId => {
    try {
      console.log('--Complete url---', BASE_URL, UPCOMINGEVENT);
      const response = await api.get(`${BASE_URL}${UPCOMINGEVENT}`);
      console.log('------response.data-----', response.data);
      return response.data;
    } catch (error) {
      console.log('list/upComingEventApi error:', error);
    }
  },
);
const upComingEventSlice = createSlice({
  name: 'upComingEvent',
  initialState: {data: {}, isLoading: false, status: 'idle', error: null},
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(upComingEventApi.pending, state => {
        state.isLoading = true;
        state.status = 'loading';
      })
      .addCase(upComingEventApi.fulfilled, (state, action) => {
        state.isLoading = true;
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(upComingEventApi.rejected, (state, action) => {
        state.isLoading = false;
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export default upComingEventSlice.reducer;
