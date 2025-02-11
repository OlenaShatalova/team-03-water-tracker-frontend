import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import api from '../../api/api';

export const fetchWaterToday = createAsyncThunk(
  'water/fetchWaterToday',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/water/today');

      // console.log('API Response:', response.data.data);

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Error fetching water data'
      );
    }
  }
);

export const updateWaterVolume = createAsyncThunk(
  'water/updateWaterVolume',
  async ({ id, waterData }, thunkAPI) => {
    try {
      const response = await api.patch(`/water/${id}`, waterData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Error updating water data'
      );
    }
  }
);

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
      // console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchWaterRate = createAsyncThunk(
  'water/fetchWaterRate',
  async (dailyNorm, thunkAPI) => {
    try {
      console.log(dailyNorm);
      if (dailyNorm === 0) return;

      const response = await api.patch('/water/water-rate', { dailyNorm });
      console.log('Response from API:', response.data.data);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/////  ADD WATER
export const addWater = createAsyncThunk('today/addWater', async waterData => {
  try {
    console.log('waterData:', waterData);

    await api.post('/water/', waterData);
    // console.log(res);

    const { data } = await api.get('/water/today');
    // console.log(data.data);

    return data.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

////   WATER TODAY
// export const fetchWaterToday = createAsyncThunk(
//   'today/fetchWaterToday',
//   async () => {
//     console.log('Dispatching fetchWaterToday...');

//     try {
//       const response = await api.get('/water/today/');
//       console.log('API Response Data:', response.data); // Логування API відповіді
//       return response.data.data;
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   }
// );

///// DELETE WATER
export const deleteWater = createAsyncThunk(
  'today/deleteWater',
  async (id, thunkAPI) => {
    console.log(id);

    try {
      const response = await api.delete(`/water/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
