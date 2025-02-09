// import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import api from '../../api/api';

export const setToken = token => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  api.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
  'auth/register',
  async (formData, thunkAPI) => {
    try {
      const {
        data: { data },
      } = await api.post('/auth/register', formData);
      console.log('Data received from server:', data);
      setToken(data.token);
      // Токен зберігається в LocalStorage інтерсептором в API
      return data;
    } catch (error) {
      console.error(
        'Error response from server:',
        error.response?.data || error.message
      );
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (formData, thunkAPI) => {
    // {
    //     //     "name": "11111@gmail.com",
    //     //     "email": "aaaaaaaa",
    // }
    try {
      const {
        data: { data },
      } = await api.post('/auth/login', formData);
      console.log('Login successful, data:', data);

      setToken(data.accessToken);
      // Токен зберігається в LocalStorage інтерсептором в API

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const { data } = await api.post('/auth/logout');
    // Очищення токену з LocalStorage (це не потрібно робити в інтерсепторі, бо API автоматично додає токен)
    // localStorage.removeItem('userToken');
    clearToken();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// export const refreshUser = createAsyncThunk(
//   'auth/refresh',
//   async (_, thunkAPI) => {
//     const savedToken = thunkAPI.getState().auth.token;
//     if (savedToken) {
//       return thunkAPI.rejectWithValue('Token is not exist!');
//     }
//     try {
//       setToken(savedToken);
//       const { data } = await api.get('users/current');
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    // Reading the token from the state via getState()
    console.log('start refresh');

    const state = thunkAPI.getState();
    console.log({ state });

    const persistedToken = state.auth.token;
    console.log({ persistedToken });

    if (!persistedToken) {
       console.warn('No token found');
      // If there is no token, exit without performing any request
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      // If there is a token, add it to the HTTP header and perform the request
      setToken(persistedToken);
      const { data } = await api.get('/users/current');
      console.log(data);

      return data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
