// resetSlice
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../services/restService';
import {RESETPASSWORD} from '../../services/Apis';

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async userDetails => {
    const response = await api.post(RESETPASSWORD, userDetails);
    console.log(response);
    return response.data;
  },
);

const resetSlice = createSlice({
  name: 'auth',
  initialState: {user: null, status: 'idle', error: null},
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(resetPassword.pending, state => {
        state.status = 'loading';
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export default resetSlice.reducer;
