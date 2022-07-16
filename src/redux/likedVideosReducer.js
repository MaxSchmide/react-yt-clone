import { createSlice } from "@reduxjs/toolkit"

const likedVideosSlice = createSlice({
	name: "likedVideos",
	initialState: {
		videos: [],
		loading: true,
	},
	reducers: {
		likedVideosRequest: (state) => {
			return { ...state, loading: true }
		},
		likedVideosSuccess: (state, action) => {
			return { ...state, loading: false, videos: action.payload }
		},
		likedVideosFail: (state, action) => {
			return {
				...state,
				loading: false,
				error: action.payload,
			}
		},
	},
})

export default likedVideosSlice.reducer

export const { likedVideosFail, likedVideosRequest, likedVideosSuccess } =
	likedVideosSlice.actions
