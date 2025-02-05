import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const authApi = axios.create({
  baseURL: 'https://watertracker-app-if0o.onrender.com/api',
});

export const setToken = token => {
  authApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  authApi.defaults.headers.common.Authorization = '';
};

export const register = createAsyncThunk(
  'auth/register',
  async (formData, thunkAPI) => {
    try {
      const { data } = await authApi.post('/auth/register', formData);
      console.log('Data received from server:', data);
      setToken(data.token);
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
    console.log(formData);
    try {
      const { data } = await authApi.post('/auth/login', formData);
      console.log('Data: ', data);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const { data } = await authApi.post('/auth/logout');
    clearToken();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

//?
export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const savedToken = thunkAPI.getState().auth.token;
    if (savedToken) {
      return thunkAPI.rejectWithValue('Token is not exist!');
    }
    try {
      setToken(savedToken);
      const { data } = await authApi.get('users/current');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
