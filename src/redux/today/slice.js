import { createSlice } from "@reduxjs/toolkit";
import { logout } from '../auth/operations';
import { fetchWaterToday, deleteWater } from "./operations";

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const waterSlice = createSlice({
  name: 'water',
  initialState: {
    waterRecords: [],  
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWaterToday.pending, handlePending)
      .addCase(fetchWaterToday.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.waterRecords = action.payload;  
      })
      .addCase(fetchWaterToday.rejected, handleRejected)
      
      .addCase(deleteWater.pending, handlePending)
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.waterRecords.findIndex(  
          (waterRecord) => waterRecord._id === action.payload._id
        );
        state.waterRecords.splice(index, 1);  
      })
      .addCase(deleteWater.rejected, handleRejected)
      .addCase(logout.fulfilled, (state) => {
        state.waterRecords = [];  
        state.error = null;
        state.loading = false;
      });
  },
});

export const waterRecords = waterSlice.reducer;