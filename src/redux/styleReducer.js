import { createSlice } from "@reduxjs/toolkit";
export const styleSlice = createSlice({
  name: "style",
  initialState: {
    sidebar: false,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebar = !state.sidebar;
    },
  },
});
export const sidebarValue = (state) => state.style.sidebar;
export const { toggleSidebar } = styleSlice.actions;
export default styleSlice.reducer;
