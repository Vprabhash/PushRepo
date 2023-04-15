import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../services/restService';
import {FORGEPASSWORD} from '../../services/Apis';

//forgetPasword
export const forgetPasword = createAsyncThunk(
  'auth/forgetPasword',
  async otpDetails => {
    const response = await api.post(FORGEPASSWORD, otpDetails);
    console.log(response);
    return response.data;
  },
);
const forgetSlice = createSlice({
  name: 'auth',
  initialState: {user: null, status: 'idle', error: null},
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(forgetPasword.pending, state => {
        state.status = 'loading';
      })
      .addCase(forgetPasword.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(forgetPasword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export default forgetSlice.reducer;
