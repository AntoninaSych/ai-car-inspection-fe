export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectUser = state => state.auth.user;
export const selectToken = state => state.auth.token;
export const selectIsRefreshing = state => state.auth.isRefreshing;
export const selectUserDetails = state => state.auth.userDetails;

export const selectUserLoading = state => state.auth.isLoadingUser;
export const selectUserError = state => state.auth.userError;
