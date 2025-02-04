import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: true,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload; // Зберігаємо токен
    },
    logout: (state) => {
      state.token = null; // Видаляємо токен при виході
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export const auth = authSlice.reducer;
