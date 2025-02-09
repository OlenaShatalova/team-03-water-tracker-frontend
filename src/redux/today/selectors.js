export const selectWaterRecordsToday = (state) => state.today?.data?.todayRecord || [];
export const selectWaterLoading = (state) => state.today.loading;
export const selectWaterError = (state) => state.today.error;