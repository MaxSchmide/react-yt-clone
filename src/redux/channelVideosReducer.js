import { createSlice } from "@reduxjs/toolkit"

const channelVideosSlice = createSlice({
	name: "channelVidoes",
	initialState: {
		loading: true,
		videos: [],
		nextPageToken: null,
	},
	reducers: {
		channelVideosRequest: (state) => {
			return { ...state, loading: true }
		},
		channelVideosSuccess: (state, action) => {
			return {
				...state,
				loading: false,
				videos: action.payload.items,
				nextPageToken: action.payload.nextPageToken,
			}
		},
		channelVideosFail: (state, action) => {
			return {
				...state,
				loading: false,
				error: action.payload,
			}
		},
	},
})

export default channelVideosSlice.reducer

export const { channelVideosFail, channelVideosSuccess, channelVideosRequest } =
	channelVideosSlice.actions
