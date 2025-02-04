export const selectIsLoggedIn = state => state.auth.isLoggedIn;

export const selectUser = state => state.auth.user;

export const selectIsRefreshing = state => state.auth.isRefreshing;

export const selectToken = state => state.auth.token;

export const selectError = state => state.auth.error;

export const selectLoading = state => state.auth.loading;

export const selectAuthError = state => state.auth.error;
