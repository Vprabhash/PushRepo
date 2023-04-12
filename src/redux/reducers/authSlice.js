import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/restService';
import { SIGN_UP } from '../../services/Apis';

export const signUp = createAsyncThunk('auth/signUp', async (userDetails) => {
  const response = await api.post(SIGN_UP, userDetails);
  console.log(response)
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;