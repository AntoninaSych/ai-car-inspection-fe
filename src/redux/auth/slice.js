import { createSlice } from '@reduxjs/toolkit';
import { login, logout, refreshUser, register } from './operations';

const initialState = {
  user: null,
  userDetails: null,
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authorizationCase = (state, action) => {
  const { token, user } = action.payload;
  if (token) {
    state.user = user;
    state.token = token;
    state.isLoggedIn = true;
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
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
      });
  },
});

export const authReducer = authSlice.reducer;
