import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null, // 'auth' | 'login' | 'register' etc.
  props: null, // extra props for the modal
};

const globalModalSlice = createSlice({
  name: 'globalModal',
  initialState,
  reducers: {
    openModal(state, action) {
      state.type = action.payload.type;
      state.props = action.payload.props || null;
    },
    closeModal(state) {
      state.type = null;
      state.props = null;
    },
  },
});

export const { openModal, closeModal } = globalModalSlice.actions;
export const globalModalReducer = globalModalSlice.reducer;
