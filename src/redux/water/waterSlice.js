import { createSlice } from '@reduxjs/toolkit';
import { fetchWaterPerMonth, fetchWaterRate } from './waterOperations';

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
    dailyNorm: 0,
    isAddWaterOpen: false,
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
      })
      .addCase(fetchWaterPerMonth.rejected, handleError)
      .addCase(fetchWaterRate.pending, handleLoading)
      .addCase(fetchWaterRate.fulfilled, (state, action) => {
        state.dailyNorm = action.payload;
      })
      .addCase(fetchWaterRate.rejected, handleError);
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
