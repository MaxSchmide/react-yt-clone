import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    loading: false,
    results: [],
    nextPageToken: null,
  },
  reducers: {
    searchingRequest: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    searchingSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        results: action.payload.items,
        nextPageToken: action.payload.token,
      };
    },
    searchingFail: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
});

export default searchSlice.reducer;

export const { searchingRequest, searchingSuccess, searchingFail } =
  searchSlice.actions;
