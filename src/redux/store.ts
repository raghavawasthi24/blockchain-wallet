import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './slices/token-slice';

export const store = configureStore({
  reducer: {
    token: tokenReducer
  },
});
