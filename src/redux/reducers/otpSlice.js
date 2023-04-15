import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../services/restService';
import {OTP} from '../../services/Apis';

export const otpApi = createAsyncThunk('auth/otpApi', async otpDetails => {
  const response = await api.post(OTP, otpDetails);
  console.log(response);
  return response.data;
});
const otpSlice = createSlice({
  name: 'auth',
  initialState: {user: null, status: 'idle', error: null},
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(otpApi.pending, state => {
        state.status = 'loading';
      })
      .addCase(otpApi.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(otpApi.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export default otpSlice.reducer;
