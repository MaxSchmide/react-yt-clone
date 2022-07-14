import { createSlice } from "@reduxjs/toolkit";

const channelSlice = createSlice({
  name: "channel",
  initialState: {
    loading: true,
    channel: {},
    subscriptionStatus: false,
  },
  reducers: {
    channelDataRequest: (state) => {
      return { ...state, loading: true };
    },
    channelDataSuccess: (state, action) => {
      return { ...state, loading: false, channel: action.payload };
    },
    channelDataFail: (state, action) => {
      return { ...state, channel: null, error: action.payload };
    },
    setSubscriptionStatus: (state, action) => {
      return {
        ...state,
        subscriptionStatus: action.payload,
      };
    },
  },
});

export default channelSlice.reducer;
export const {
  setSubscriptionStatus,
  channelDataFail,
  channelDataRequest,
  channelDataSuccess,
} = channelSlice.actions;
