import { createSlice } from "@reduxjs/toolkit";

const homeVideoSlice = createSlice({
  name: "homeVideos",
  initialState: {
    videos: [],
    loading: false,
    nextPageToken: null,
    activeCategory: "All",
  },
  reducers: {
    videoRequest: (state) => {
      return { ...state, loading: true };
    },
    videoSuccess: (state, action) => {
      return {
        ...state,
        videos:
          state.activeCategory === action.payload.category
            ? [...state.videos, ...action.payload.videos]
            : action.payload.videos,
        loading: false,
        nextPageToken: action.payload.nextPageToken,
        activeCategory: action.payload.category,
      };
    },
    videoFail: (state, action) => {
      return { ...state, loading: false, error: action.payload.message };
    },
  },
});

export default homeVideoSlice.reducer;

export const { videoFail, videoSuccess, videoRequest } = homeVideoSlice.actions;
