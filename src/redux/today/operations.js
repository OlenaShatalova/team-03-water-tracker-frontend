import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import api from '../../api/api';

// axios.defaults.baseURL = 'https://watertracker-app-if0o.onrender.com/api';

// export const fetchWaterToday = createAsyncThunk(
//   'today/fetchWaterToday',
//   async () => {
//     try {
//       const response = await api.get('/water/today/');
//       return response.data.data;
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   }
// );

export const fetchWaterToday = createAsyncThunk(
  'today/fetchWaterToday',
  async () => {
    console.log('Dispatching fetchWaterToday...');

    try {
      const response = await api.get('/water/today/');
      console.log('API Response Data:', response.data); // Логування API відповіді
      return response.data.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const deleteWater = createAsyncThunk('today/deleteWater', async id => {
  try {
    const response = await api.delete(`/water/${id}`);
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
