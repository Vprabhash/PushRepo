import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../services/restService';
import {BASE_URL, CLUBLOCATION} from '../../services/Apis';

// Async thunk to fetch the LocationApi
export const LocationApi = createAsyncThunk(
  'clubLocation/LocationApi',
  async userId => {
    try {
      const response = await api.get(`${BASE_URL}${CLUBLOCATION}`);
      return response.data;
    } catch (error) {
      console.log('list/LocationApi error:', error);
    }
  },
);
const clubLocationSlice = createSlice({
  name: 'clubLocation',
  initialState: {data: {}, isLoading: false, status: 'idle', error: null},
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(LocationApi.pending, state => {
        state.isLoading = true;
        state.status = 'loading';
      })
      .addCase(LocationApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(LocationApi.rejected, (state, action) => {
        state.isLoading = false;
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export default clubLocationSlice.reducer;
