import { createSlice } from '@reduxjs/toolkit';
import {
  login,
  logout,
  refreshUser,
  register,
  setToken,
  updateAvatar,
  updateUser,
  sendResetEmail,
  resetPassword,
} from './operations';

const initialState = {
  user: {
    name: null,
    email: null,
    dailyNorm: 1500,
    gender: 'female',
    avatar: null,
  },
  token: null, // Отримуємо токен із localStorage
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        // console.log(action.payload);

        state.loading = false;
        state.isLoggedIn = true;
        state.error = null;
        state.token = action.payload.token || action.payload.accessToken;
        state.user = action.payload.user;

        if (action.payload.accessToken) {
          setToken(action.payload.accessToken);
          localStorage.setItem('token', action.payload.accessToken);
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        // console.log('login', action.payload);

        state.loading = false;
        state.error = null;
        state.isLoggedIn = true;
        state.token = action.payload.accessToken;
        state.user = action.payload.user;

        if (action.payload.accessToken) {
          setToken(action.payload.accessToken);
          localStorage.setItem('token', action.payload.accessToken);
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, () => {
        localStorage.removeItem('persist:userToken');

        return initialState;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        // console.log('ref.ful', action.payload);

        state.isRefreshing = false;
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        // console.log(action.payload);

        state.isRefreshing = false;
        state.loading = false;
        state.error = action.payload;
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(updateUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        // console.log(action.payload);

        state.loading = false;
        state.error = null;
        state.user = action.payload.data;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateAvatar.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAvatar.fulfilled, (state, action) => {
        console.log(action.payload);

        state.loading = false;
        state.error = null;
        state.user.avatar = action.payload.avatarUrl;
      })
      .addCase(updateAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendResetEmail.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendResetEmail.fulfilled, state => {
        state.loading = false;
        state.error = null;
      })
      .addCase(sendResetEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, state => {
        state.loading = false;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const auth = authSlice.reducer;

//const authSlice = createSlice({
//  name: 'auth',
//  initialState,
//  reducers: {
//    loginSuccess: (state, action) => {
//      state.token = action.payload; // Зберігаємо токен
//    },
//    logout: state => {
//      state.token = null; // Видаляємо токен при виході
//    },
//  },
//});

//export const { loginSuccess, logout } = authSlice.actions;
