//logOutSlice
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../services/restService';
import {LOGOUT} from '../../services/Apis';

export const logOutApi = createAsyncThunk(
  'auth/logOutApi',
  async userDetails => {
    const response = await api.post(LOGOUT, userDetails);
    console.log(response);
    return response.data;
  },
);

const logOutSlice = createSlice({
  name: 'auth',
  initialState: {user: null, status: 'idle', error: null},
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(logOutApi.pending, state => {
        state.status = 'loading';
      })
      .addCase(logOutApi.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(logOutApi.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export default logOutSlice.reducer;
