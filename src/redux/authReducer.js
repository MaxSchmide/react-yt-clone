import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: sessionStorage.getItem("ytc-access-token") || null,
    user: JSON.parse(sessionStorage.getItem("ytc-profile")) || null,
    loading: false,
  },
  reducers: {
    Request: (state) => {
      return { ...state, loading: true };
    },
    Success: (state, action) => {
      return {
        ...state,
        loading: false,
        accessToken: action.payload,
      };
    },
    Fail: (state, action) => {
      return {
        ...state,
        laoding: false,
        accessToken: null,
        error: action.payload,
      };
    },
    AddProfile: (state, action) => {
      return { ...state, user: action.payload };
    },
    LogOut: (state) => {
      return { ...state, user: null, accessToken: null };
    },
  },
});
export const loading = (state) => state.auth.loading;
export const accessToken = (state) => state.auth.accessToken;
export const { Request, Success, Fail, LogOut, AddProfile } = authSlice.actions;
export default authSlice.reducer;
