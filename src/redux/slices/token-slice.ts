import { createSlice } from '@reduxjs/toolkit';
import type { TokenI } from '../../constants/constant';

let initialState: TokenI[] = []

const tokenSlice = createSlice({
  name: 'token',
  initialState: initialState,
  reducers: {
    addToken: (state, action) => {
      state.push(...action.payload);
      console.log(state)
    }
  },
});

export const { addToken } = tokenSlice.actions;
export default tokenSlice.reducer;
