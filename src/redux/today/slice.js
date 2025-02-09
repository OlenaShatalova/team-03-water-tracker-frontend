import { createSlice } from '@reduxjs/toolkit';
import { fetchWaterToday, deleteWater, addWater } from './operations';
import { logout } from '../auth/operations';

const initialState = {
  data: {
    todayRecord: [],
  },
  loading: false,
  error: null,
};

const todaySlice = createSlice({
  name: 'today',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWaterToday.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWaterToday.fulfilled, (state, action) => {
        state.loading = false;
        state.data.todayRecord = action.payload.todayRecord;
      })
      .addCase(fetchWaterToday.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteWater.pending, state => {
        state.loading = true;
      })
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.loading = false;
        state.data.todayRecord = state.data.todayRecord.filter(
          record => record._id !== action.payload._id
        );
      })
      .addCase(deleteWater.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, state => {
        state.data.todayRecord = [];
      })
      .addCase(addWater.pending, state => {
        state.loading = true;
      })
      .addCase(addWater.fulfilled, (state, action) => {
        state.data.todayRecord = [...state.data.todayRecord, action.payload];
      })
      .addCase(addWater.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const todayReducer = todaySlice.reducer;
