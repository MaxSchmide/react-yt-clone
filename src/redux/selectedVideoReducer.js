import { createSlice } from "@reduxjs/toolkit";

const selectedVideoSlice = createSlice({
  name: "selectedVideo",
  initialState: {
    video: {},
    loading: true,
    comments: null,
  },
  reducers: {
    selectedVideoRequest: (state) => {
      return { ...state, loading: true };
    },
    selectedVideoSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        video: action.payload,
      };
    },
    selectedVideoFail: (state, action) => {
      return { ...state, loading: false, error: action.payload.message };
    },
    commentsListRequest: (state) => {
      return { ...state, loading: true };
    },
    commentsListSuccess: (state, action) => {
      return { ...state, laoding: false, comments: action.payload };
    },
    commentsListFail: (state, action) => {
      return { ...state, error: action.payload };
    },
  },
});
export default selectedVideoSlice.reducer;
export const {
  commentsListRequest,
  commentsListFail,
  commentsListSuccess,
  selectedVideoFail,
  selectedVideoRequest,
  selectedVideoSuccess,
} = selectedVideoSlice.actions;
