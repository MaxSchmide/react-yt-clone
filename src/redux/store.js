import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authReducer"
import styleReducer from "./styleReducer"
import homeVideoReducer from "./homeVideoReducer"
import selectedVideoReducer from "./selectedVideoReducer"
import channelReducer from "./channelReducer"
import relatedVideoReducer from "./relatedVideoReducer"
import searchReducer from "./searchReducer"
import subsChannelReducer from "./subsChannelReducer"
import channelVideosReducer from "./channelVideosReducer"
import likedVideosReducer from "./likedVideosReducer"

const store = configureStore({
	reducer: {
		style: styleReducer,
		auth: authReducer,
		homeVideos: homeVideoReducer,
		selectedVideo: selectedVideoReducer,
		channel: channelReducer,
		channelVideos: channelVideosReducer,
		relatedVideos: relatedVideoReducer,
		search: searchReducer,
		subscriptions: subsChannelReducer,
		likedVideos: likedVideosReducer,
	},
})

export default store
