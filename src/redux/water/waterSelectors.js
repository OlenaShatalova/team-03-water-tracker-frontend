export const selectCurrentDate = state => state.water.currentDate;

export const selectIsWaterRateModalOpen = state => state.water.isWaterRateOpen;

export const selectIsAddWaterModalOpen = state => state.water.isAddWaterOpen;

// export const selectWaterRateNumber = state => state.water.dailyNorm;

export const selectWaterPerMonth = state => state.water.waters.waterPerMonth;

export const selectWaterToday = state =>
  state.water.waters.waterPerDay.waterRecord;

export const selectPercentTodayWater = state => state.water.percentTodayWater;
