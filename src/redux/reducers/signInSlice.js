//signInSlice
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../services/restService';
import {SIGN_IN} from '../../services/Apis';

export const signIn = createAsyncThunk('auth/signIn', async userDetails => {
  const response = await api.post(SIGN_IN, userDetails);
  console.log(response);
  return response.data;
});
const signInSlice = createSlice({
  name: 'auth',
  initialState: {user: null, status: 'idle', error: null},
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(signIn.pending, state => {
        state.status = 'loading';
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export default signInSlice.reducer;
