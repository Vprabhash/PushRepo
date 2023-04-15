import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../services/restService';
import {LIST} from '../../services/Apis';

export const listApi = createAsyncThunk('home/listApi', async userDetails => {
  const response = await api.post(LIST, userDetails);
  console.log(response);
  return response.data;
});

const listSlice = createSlice({
  name: 'home',
  initialState: {user: null, status: 'idle', error: null},
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(listApi.pending, state => {
        state.status = 'loading';
      })
      .addCase(listApi.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(listApi.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export default listSlice.reducer;
