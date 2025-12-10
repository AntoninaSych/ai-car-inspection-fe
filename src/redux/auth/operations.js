import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCurrentUser, usersLogin, usersLogout, usersSignup } from '../../api/authApi';

export const register = createAsyncThunk('auth/register', async (user, { rejectWithValue }) => {
  try {
    return await usersSignup(user);
  } catch (error) {
    if (error.status === 400) {
      if (error.response?.data?.keyPattern) {
        const { email } = error.response.data.keyPattern;
        if (email) {
          return rejectWithValue('The email is already taken');
        }
      }
      return rejectWithValue('User creation error');
    }

    return rejectWithValue(error.response?.data || error);
  }
});

export const login = createAsyncThunk('auth/login', async (user, { rejectWithValue }) => {
  try {
    return await usersLogin(user);
  } catch (error) {
    return rejectWithValue(error.response?.data || error);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await usersLogout();
  } catch (error) {
    return rejectWithValue(error.response?.data || error);
  }
});

export const refreshUser = createAsyncThunk('auth/refresh', async (_, { rejectWithValue }) => {
  try {
    const data = await fetchCurrentUser();

    if (typeof data !== 'object' || data === null || Array.isArray(data)) {
      return rejectWithValue('Invalid response format');
    }

    return data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error);
  }
});
