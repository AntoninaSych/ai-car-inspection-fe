import { createSlice } from '@reduxjs/toolkit';
import { login, logout, refreshUser, register } from './operations';

const initialState = {
  user: null,
  accessToken: null,
  isAuthorized: false,
  isRefreshing: true,
};

const authorizationCase = (state, action) => {
  const { token, user } = action.payload;
  if (token && user.emailVerified) {
    state.user = user;
    state.accessToken = token;
    state.isAuthorized = true;
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, authorizationCase)
      .addCase(register.fulfilled, authorizationCase)
      .addCase(logout.fulfilled, state => {
        state.user = null;
        state.accessToken = null;
        state.isAuthorized = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthorized = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        if (action.payload === 'UNAUTHORIZED') {
          state.accessToken = null;
          state.user = null;
          state.isAuthorized = false;
        }
        state.isRefreshing = false;
      });
  },
});

export const authReducer = authSlice.reducer;
