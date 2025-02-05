import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// https://watertracker-app-if0o.onrender.com/api/water/
axios.defaults.baseURL = 'http://localhost:3000/api';
axios.defaults.withCredentials = true;


export const fetchWaterPerMonth = createAsyncThunk(
  'water/fetchWater',
  async ({ month, year }, thunkAPI) => {
    try {
      const response = await axios.get('/water/month', {
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
