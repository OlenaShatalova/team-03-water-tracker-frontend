import { createSlice } from '@reduxjs/toolkit';
import {
  addWater,
  deleteWater,
  fetchWaterPerMonth,
  fetchWaterRate,
  fetchWaterToday,
  updateWaterVolume,
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
  state.loading = false;
  state.error = action.payload;
  // state.error = action.error.message;
}

const waterSlice = createSlice({
  name: 'water',
  initialState: {
    waters: {
      waterPerMonth: {},
      waterPerDay: {
        waterRecord: [],
      },
    },
    loading: false,
    error: null,
    activeDay: localDate(),
    currentDate: Date.now(),

    isWaterRateOpen: false,
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
      /// FETCH WATER PER MONTH
      .addCase(fetchWaterPerMonth.pending, handleLoading)
      .addCase(fetchWaterPerMonth.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.waters.waterPerMonth = action.payload.data;
        // console.log('per month:', action.payload.data);
      })
      .addCase(fetchWaterPerMonth.rejected, handleError)
      /// FETCH WATER RATE
      .addCase(fetchWaterRate.pending, handleLoading)
      // .addCase(fetchWaterRate.fulfilled, (state, action) => {
      //   state.dailyNorm = action.payload;
      // })
      .addCase(fetchWaterRate.rejected, handleError)
      ////FETCH WATER TODAY
      .addCase(fetchWaterToday.pending, handleLoading)
      .addCase(fetchWaterToday.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // console.log('Redux обновился с percentTodayWater:', action.payload);
        state.percentTodayWater = action.payload.percentTodayWater;
        state.waters.waterPerDay.waterRecord = action.payload.todayRecord;
      })
      .addCase(fetchWaterToday.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ////ADD WATER
      .addCase(addWater.pending, handleLoading)
      .addCase(addWater.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // console.log(action.payload);

        state.waters.waterPerDay.waterRecord = action.payload.todayRecord;
        state.percentTodayWater = action.payload.percentTodayWater;
      })
      .addCase(addWater.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      ////  DELETE WATER
      .addCase(deleteWater.pending, handleLoading)
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        // console.log(action.payload);

        state.waters.waterPerDay.waterRecord =
          state.waters.waterPerDay.waterRecord.filter(
            record => record._id !== action.payload
          );
      })
      .addCase(deleteWater.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //// UPDATE WATER VOLUME
      .addCase(updateWaterVolume.pending, handleLoading)
      .addCase(updateWaterVolume.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        // Обновляем запись в массиве
        const index = state.waters.waterPerDay.waterRecord.findIndex(
          record => record._id === action.payload._id
        );

        if (index !== -1) {
          state.waters.waterPerDay.waterRecord[index] = action.payload;
        }
      })
      .addCase(updateWaterVolume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const waterReducer = waterSlice.reducer;
export const { setActiveDay, setCurrentDate, openModal, closeModal } =
  waterSlice.actions;
