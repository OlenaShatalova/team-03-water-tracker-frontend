// import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import api from '../../api/api';

// export const authApi = axios.create({
//   baseURL: 'https://watertracker-app-if0o.onrender.com/api',
// });

// export const setToken = token => {
//   authApi.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

// export const clearToken = () => {
//   authApi.defaults.headers.common.Authorization = '';
// };

export const register = createAsyncThunk(
  'auth/register',
  async (formData, thunkAPI) => {
    try {
      const { data } = await api.post('/auth/register', formData);
      console.log('Data received from server:', data);
      // setToken(data.token);
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

      // setToken(data.accessToken);
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
    localStorage.removeItem('userToken');
    // clearToken();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

//?
// export const refreshUser = createAsyncThunk(
//   'auth/refresh',
//   async (_, thunkAPI) => {
//     const savedToken = thunkAPI.getState().auth.token;
//     if (savedToken) {
//       return thunkAPI.rejectWithValue('Token is not exist!');
//     }
//     try {
//       setToken(savedToken);
//       const { data } = await authApi.get('users/current');
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );
export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const savedToken = localStorage.getItem('userToken');
    if (!savedToken) {
      return thunkAPI.rejectWithValue('Token does not exist!');
    }
    try {
      // Якщо токен є, додаємо його в заголовок автоматично через інтерсептор
      const { data } = await api.get('/users/current');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
