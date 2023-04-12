import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/restService';
import { PROFILE } from '../../services/Apis';

// Async thunk to fetch the profile details
export const fetchProfile = createAsyncThunk('profile/fetchProfile', async (userId) => {
  try {
    const response = await api.get(`${PROFILE}${userId}`);
    return response.data;
  } catch (error) {
    console.log("profile/fetchProfile error:", error);
  }
});

const profileSlice = createSlice({
  name: 'profile',
  initialState: { data: {}, isLoading: false, status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
        state.status = 'loading';
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;