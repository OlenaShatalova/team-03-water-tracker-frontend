import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  numberOfLiters: 0,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: state => {
      state.isOpen = true;
    },
    closeModal: state => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const modal = modalSlice.reducer;
