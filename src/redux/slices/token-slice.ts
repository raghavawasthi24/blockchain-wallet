import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TokenI } from '../../constants/constant';

let initialState: TokenI[] = []

const tokenSlice = createSlice({
  name: 'token',
  initialState: initialState,
  reducers: {
    addToken: (state, action) => {
      state.push(...action.payload);
      console.log(state)
    },
    editToken: (state, action: PayloadAction<string>) => {
      const token = state.find(t => t.id === action.payload);
      if (token) {
        token.isEditing = true;
      }

      console.log(state);
    },
  },
});

export const { addToken, editToken } = tokenSlice.actions;
export default tokenSlice.reducer;
