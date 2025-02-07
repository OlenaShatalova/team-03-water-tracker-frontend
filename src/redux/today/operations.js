import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = 'https://watertracker-app-if0o.onrender.com/api';

export const fetchWaterToday = createAsyncThunk(
  'water/fetchWaterToday',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/water/today');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteWater = createAsyncThunk(
  'water/deleteWater',
  async (_id, thunkAPI) => {
    try {
      const response = await axios.delete(`/water/${_id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);