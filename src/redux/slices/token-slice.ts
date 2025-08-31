import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TokenI } from "../../constants/constant";

const loadFromLocalStorage = (): TokenI[] => {
  try {
    const data = localStorage.getItem("tokens");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Failed to load from localStorage", err);
    return [];
  }
};

const saveToLocalStorage = (state: TokenI[]) => {
  try {
    localStorage.setItem("tokens", JSON.stringify(state));
  } catch (err) {
    console.error("Failed to save to localStorage", err);
  }
};

let initialState: TokenI[] = loadFromLocalStorage();

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    addToken: (state, action: PayloadAction<TokenI[]>) => {
      state.push(...action.payload);
      saveToLocalStorage(state);
    },
    editToken: (
      state,
      action: PayloadAction<{ id: string; field: keyof TokenI; value: any }>
    ) => {
      const token = state.find((t) => t.id === action.payload.id);
      if (token) {
        (token[action.payload.field] as any) = action.payload.value;
        token.value =
          (token.holdings ?? 0) * (token.market_data?.current_price?.usd ?? 0);
        saveToLocalStorage(state);
      }
    },
    removeToken: (state, action: PayloadAction<string>) => {
      const newState = state.filter((t) => t.id !== action.payload);
      localStorage.setItem("tokens", JSON.stringify(newState));
      return newState;
    },
  },
});

export const { addToken, editToken, removeToken } = tokenSlice.actions;
export default tokenSlice.reducer;
