export const selectWaterRecordsToday = (state) => state.water?.data?.todayRecord || [];
export const selectWaterLoading = (state) => state.water.loading;
export const selectWaterError = (state) => state.water.error;