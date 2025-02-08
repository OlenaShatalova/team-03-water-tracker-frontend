import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://watertracker-app-if0o.onrender.com/api';; 

export const fetchWaterToday = createAsyncThunk(
  'water/fetchWaterToday',
  async () => {
    try {
      const response = await axios.get('/api/water/water-today'); 
      return response.data.data; 
    } catch (error) {
      throw new Error(error.message); 
    }
  }
);

export const deleteWater = createAsyncThunk(
  'water/deleteWater',
  async (id) => {
    try {
      const response = await axios.delete(`/api/water/${id}`); 
      return response.data; 
    } catch (error) {
      throw new Error(error.message); 
    }
  }
);