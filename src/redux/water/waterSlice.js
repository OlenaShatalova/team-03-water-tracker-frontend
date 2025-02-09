import { createSlice } from '@reduxjs/toolkit';
import {
  fetchWaterPerMonth,
  fetchWaterRate,
  fetchWaterToday,
} from './waterOperations';

const localDate = () => {
  const milliseconds = Date.now();
  const date = new Date(milliseconds);

  return date.toLocaleDateString();
};

function handleLoading(state) {
  state.loading = true;
  state.error = null;
}

function handleError(state, action) {
  state.error = action.payload;
  state.loading = false;
}

const waterSlice = createSlice({
  name: 'water',
  initialState: {
    waters: {
      waterPerMonth: {},
      waterPerDay: {
        waterRate: {},
        waterRecord: [],
      },
    },
    loading: false,
    error: null,
    activeDay: localDate(),
    currentDate: Date.now(),

    isWaterRateOpen: false,
    waterRate: 0,
    isAddWaterOpen: false,
    percentTodayWater: 0,
  },
  reducers: {
    setActiveDay(state, action) {
      state.activeDay = action.payload;
    },
    setCurrentDate(state, action) {
      state.currentDate = action.payload;
    },
    openModal: (state, action) => {
      state[action.payload] = true;
    },
    closeModal: (state, action) => {
      state[action.payload] = false;
    },
    // setWaterRate: (state, action) => {
    //   state.waterRate = action.payload;
    // },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchWaterPerMonth.pending, handleLoading)
      .addCase(fetchWaterPerMonth.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.waters.waterPerMonth = action.payload.data;
        console.log('per month:', action.payload.data);
      })
      .addCase(fetchWaterPerMonth.rejected, handleError)
      .addCase(fetchWaterRate.pending, handleLoading)
      .addCase(fetchWaterRate.fulfilled, (state, action) => {
        state.waterRate = action.payload;
      })
      .addCase(fetchWaterRate.rejected, handleError)
      .addCase(fetchWaterToday.pending, state => {
        state.loading = true;
      })
      .addCase(fetchWaterToday.fulfilled, (state, action) => {
        state.loading = false;
        console.log(
          'Redux обновился с percentTodayWater:',
          action.payload.percentTodayWater
        );
        state.percentTodayWater = action.payload.percentTodayWater || 0;
      })
      .addCase(fetchWaterToday.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const waterReducer = waterSlice.reducer;
export const {
  setActiveDay,
  setCurrentDate,
  openModal,
  closeModal,
  // setWaterRate,
} = waterSlice.actions;
