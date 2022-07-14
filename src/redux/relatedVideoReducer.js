import { createSlice } from "@reduxjs/toolkit";

const relatedVideoSlise = createSlice({
  name: "relatedVideo",
  initialState: {
    videos: [],
    loading: true,
  },
  reducers: {
    relatedRequest: (state) => {
      return { ...state, loading: true };
    },
    relatedSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        videos: action.payload,
      };
    },
    relatedFail: (state, action) => {
      return {
        ...state,
        videos: null,
        loading: false,
        error: action.payload,
      };
    },
  },
});

export default relatedVideoSlise.reducer;
export const { relatedRequest, relatedSuccess, relatedFail } =
  relatedVideoSlise.actions;
