import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import api from '../../api/api';

// axios.defaults.baseURL = 'https://watertracker-app-if0o.onrender.com/api';

export const fetchWaterToday = createAsyncThunk(
  'today/fetchWaterToday',
  async () => {
    try {
      const response = await api.get('/api/water/water-today');
      return response.data.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const deleteWater = createAsyncThunk('today/deleteWater', async id => {
  try {
    const response = await api.delete(`/api/water/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const addWater = createAsyncThunk('today/addWater', async waterData => {
  try {
    console.log('waterData:', waterData);
    const response = await api.post('/water/', waterData);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});
