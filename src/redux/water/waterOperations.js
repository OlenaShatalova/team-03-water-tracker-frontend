import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// https://watertracker-app-if0o.onrender.com/api/water/
axios.defaults.baseURL = 'https://watertracker-app-if0o.onrender.com/api';
axios.defaults.withCredentials = true;

export const fetchWaterPerMonth = createAsyncThunk(
  'water/fetchWater',
  async ({ month, year }, thunkAPI) => {

    try {
      const state = thunkAPI.getState(); 
      const token = state.auth.token; 
      const response = await axios.get('/water/month', {
        params: {
          month,
          year,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchWaterRate = createAsyncThunk(
  'water/fetchWaterRate',
  async (waterRate, thunkAPI) => {
    try {
      if (waterRate === 0) return;
      const response = await axios.patch('/water/water-rate', { waterRate });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const fetchWaterPerDay = createAsyncThunk(
  'water/fetchWaterDay',
  async ({ month, year }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      const response = await axios.get('/water/month', {
        params: {
          month,
          year,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);