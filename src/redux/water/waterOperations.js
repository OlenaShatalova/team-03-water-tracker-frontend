import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// https://watertracker-app-if0o.onrender.com/api/water/
axios.defaults.baseURL = 'https://watertracker-app-if0o.onrender.com/api';

const setToken = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const fetchWaterPerMonth = createAsyncThunk(
  'water/fetchWater',
  async ({ year, month }, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    if (token) {
      setToken(token);
     
    }
    try {
      const response = await axios.get('/water/month', {
        params: {
          year,
          month,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
