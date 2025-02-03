import { createSlice } from '@reduxjs/toolkit';

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
    error: false,
    activeDay: localDate(),
    currentDate: Date.now(),
  },
  reducers: {
    setActiveDay(state, action) {
      state.activeDay = action.payload;
    },
    setCurrentDate(state, action) {
      state.currentDate = action.payload;
    },
  },
});







export const waterReducer = waterSlice.reducer;
export const { setActiveDay, setCurrentDate } = waterSlice.actions;