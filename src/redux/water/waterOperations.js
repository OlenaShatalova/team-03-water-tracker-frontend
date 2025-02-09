import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../api/api';

export const fetchWaterPerMonth = createAsyncThunk(
  'water/fetchWater',
  async ({ month, year }, thunkAPI) => {
    try {
      const response = await api.get('/water/month', {
        params: {
          month,
          year,
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
      console.log(waterRate);
      console.log(response.data);
      const response = await api.patch('/water/water-rate', { waterRate });

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
      const response = await api.get('/water/month', {
        params: {
          month,
          year,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
