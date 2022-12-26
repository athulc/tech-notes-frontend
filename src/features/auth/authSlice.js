import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { accesstoken } = action.payload;
      state.token = accesstoken;
    },
    logout: (state) => {
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectCurrentToken = (state) => state.auth.token;

export default authSlice.reducer;
