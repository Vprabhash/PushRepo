import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../services/restService';
import {BASE_URL, SPOTLIGHT} from '../../services/Apis';

// Async thunk to fetch the spotLightApi
export const spotLightApi = createAsyncThunk(
  'spotLight/spotLightApi',
  async userId => {
    try {
      console.log('--Complete url---', BASE_URL, SPOTLIGHT);
      const response = await api.get(`${BASE_URL}${SPOTLIGHT}`);
      console.log('------response.data-----', response.data);
      return response.data;
    } catch (error) {
      console.log('list/spotLightApi error:', error);
    }
  },
);
const spotLightSlice = createSlice({
  name: 'spotLight',
  initialState: {data: {}, isLoading: false, status: 'idle', error: null},
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(spotLightApi.pending, state => {
        state.isLoading = true;
        state.status = 'loading';
      })
      .addCase(spotLightApi.fulfilled, (state, action) => {
        state.isLoading = true;
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(spotLightApi.rejected, (state, action) => {
        state.isLoading = false;
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export default spotLightSlice.reducer;
