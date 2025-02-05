import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isWaterRateOpen: false,
  numberOfLiters: 0,
  isAddWaterOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state[action.payload] = true;
    },
    closeModal: (state, action) => {
      state[action.payload] = false;
    },
  },
  extraReducers: builder => {
    builder;
    // для отримання данних типу waterRate і тп
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const modal = modalSlice.reducer;
