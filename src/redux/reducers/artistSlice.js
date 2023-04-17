import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../services/restService';
import {BASE_URL, ARTIST} from '../../services/Apis';

// Async thunk to fetch the artistApi
export const artistApi = createAsyncThunk('artist/artistApi', async userId => {
  try {
    const response = await api.get(`${BASE_URL}${ARTIST}`);
    return response.data;
  } catch (error) {
    console.log('list/artistApi error:', error);
  }
});
const artistSlice = createSlice({
  name: 'artist',
  initialState: {data: {}, isLoading: false, status: 'idle', error: null},
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(artistApi.pending, state => {
        state.isLoading = true;
        state.status = 'loading';
      })
      .addCase(artistApi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(artistApi.rejected, (state, action) => {
        state.isLoading = false;
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export default artistSlice.reducer;
