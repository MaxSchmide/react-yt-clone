import { createSlice } from "@reduxjs/toolkit"

const subsChannelSlice = createSlice({
	name: "subscriptions",
	initialState: {
		loading: true,
		channels: {},
	},
	reducers: {
		subsChannelsRequest: (state) => {
			return { ...state, loading: true }
		},
		subsChannelSuccess: (state, action) => {
			return { ...state, loading: false, channels: action.payload }
		},
		subsChannelFail: (action, state) => {
			return { ...state, loading: false, error: action.payload }
		},
	},
})

export default subsChannelSlice.reducer

export const { subsChannelFail, subsChannelSuccess, subsChannelsRequest } =
	subsChannelSlice.actions
