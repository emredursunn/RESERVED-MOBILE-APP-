// tokenSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TokenState {
  token: string | null;
  role: number | null
}

const initialState: TokenState = {
  token: null,
  role: null
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<TokenState>) {
      state.token = action.payload.token; // Tokenı ayarlamak için action
      state.role = action.payload.role; // rolü ayarlamak için action
    },
    clearToken(state) {
      state.token = null; // Tokenı temizlemek için action
      state.role = null
    },
  },
});

export const { setToken, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;
