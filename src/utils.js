import request from "./api"
import {
	channelDataFail,
	channelDataRequest,
	channelDataSuccess,
	setSubscriptionStatus,
} from "./redux/channelReducer"
import {
	channelVideosRequest,
	channelVideosFail,
	channelVideosSuccess,
} from "./redux/channelVideosReducer"
import { videoFail, videoRequest, videoSuccess } from "./redux/homeVideoReducer"
import {
	relatedFail,
	relatedRequest,
	relatedSuccess,
} from "./redux/relatedVideoReducer"
import {
	searchingFail,
	searchingRequest,
	searchingSuccess,
} from "./redux/searchReducer"
import {
	selectedVideoSuccess,
	selectedVideoFail,
	selectedVideoRequest,
	commentsListRequest,
	commentsListFail,
	commentsListSuccess,
} from "./redux/selectedVideoReducer"
import {
	subsChannelFail,
	subsChannelsRequest,
	subsChannelSuccess,
} from "./redux/subsChannelReducer"

export const getPopularVideos = (param) => {
	return async (dispatch) => {
		try {
			dispatch(videoRequest())
			await request("/videos", {
				params: {
					part: "snippet,contentDetails,statistics",
					chart: "mostPopular",
					regionCode: "UA",
					maxResults: 20,
					pageToken: param,
				},
			}).then(({ data }) => {
				dispatch(
					videoSuccess({
						videos: data.items,
						nextPageToken: data.nextPageToken,
						category: "All",
					})
				)
			})
		} catch (error) {
			dispatch(videoFail(error.message))
		}
	}
}

export const getVideosByCategory = (keyword, param) => {
	return async (dispatch) => {
		try {
			dispatch(videoRequest())
			await request("/search", {
				params: {
					part: "snippet",
					maxResults: 20,
					pageToken: param,
					q: keyword,
					type: "video",
				},
			}).then(({ data }) => {
				dispatch(
					videoSuccess({
						videos: data.items,
						nextPageToken: data.nextPageToken,
						category: keyword,
					})
				)
			})
		} catch (error) {
			dispatch(
				videoFail({
					message: error.message,
				})
			)
		}
	}
}

export const getVideoById = (param) => {
	return async (dispatch) => {
		try {
			dispatch(selectedVideoRequest())
			await request("/videos", {
				params: {
					part: "snippet,statistics",
					id: param,
				},
			}).then(({ data }) => {
				dispatch(selectedVideoSuccess(data.items[0]))
			})
		} catch (error) {
			dispatch(
				selectedVideoFail({
					message: error.message,
				})
			)
		}
	}
}

export const getChannelDetails = (param) => {
	return async (dispatch) => {
		try {
			dispatch(channelDataRequest())
			await request("/channels", {
				params: {
					part: "snippet,contentDetails,statistics",
					id: param,
				},
			}).then(({ data }) => {
				dispatch(channelDataSuccess(data.items[0]))
			})
		} catch (error) {
			dispatch(channelDataFail(error.message))
		}
	}
}

export const checkSubscriptionStatus = (param, token) => {
	return async (dispatch) => {
		try {
			await request("/subscriptions", {
				params: {
					part: "snippet",
					forChannelId: param,
					mine: true,
				},
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}).then(({ data }) => {
				dispatch(setSubscriptionStatus(data.items.length !== 0))
			})
		} catch (error) {}
	}
}

export const getCommentsOfVideoById = (param) => {
	return async (dispatch) => {
		try {
			dispatch(commentsListRequest())
			await request("/commentThreads", {
				params: {
					part: "snippet",
					videoId: param,
				},
			}).then(({ data }) => {
				dispatch(commentsListSuccess(data.items))
			})
		} catch (error) {
			dispatch(commentsListFail(error.message))
		}
	}
}

export const addComment = (param, text, token) => {
	return async (dispatch) => {
		try {
			const obj = {
				snippet: {
					videoId: param,
					topLevelComment: {
						snippet: { textOriginal: text },
					},
				},
			}

			await request
				.post("/commentThreads", obj, {
					params: {
						part: "snippet",
					},
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then(() => {
					setTimeout(() => {
						dispatch(getCommentsOfVideoById(param))
					}, 2000)
				})
		} catch (error) {}
	}
}

export const getRelatedVideosById = (param) => {
	return async (dispatch) => {
		try {
			dispatch(relatedRequest())
			await request("/search", {
				params: {
					part: "snippet",
					relatedToVideoId: param,
					maxResults: 20,
					type: "video",
				},
			}).then(({ data }) => {
				dispatch(relatedSuccess(data.items))
			})
		} catch (error) {
			dispatch(relatedFail(error.message))
		}
	}
}

export const searchByKeyword = (keyword) => {
	return async (dispatch) => {
		try {
			dispatch(searchingRequest())
			await request("/search", {
				params: {
					part: "snippet",
					q: keyword,
					maxResults: 20,
				},
			}).then(({ data: { items, nextPageToken } }) => {
				dispatch(searchingSuccess({ items: items }))
			})
		} catch (error) {
			dispatch(searchingFail(error.message))
		}
	}
}

export const getSubscriptionChannel = (token) => {
	return async (dispatch) => {
		try {
			dispatch(subsChannelsRequest())
			await request("/subscriptions", {
				params: {
					part: "snippet,contentDetails",

					mine: true,
					maxResults: 20,
				},
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}).then(({ data }) => {
				dispatch(subsChannelSuccess(data.items))
			})
		} catch (error) {
			dispatch(subsChannelFail(error.message))
		}
	}
}

export const getVideosByChannel = (param) => {
	return async (dispatch) => {
		try {
			dispatch(channelVideosRequest())
			const {
				data: { items },
			} = await request("/channels", {
				params: {
					part: "contentDetails",
					id: param,
				},
			})
			const uploadPlaylistId = items[0].contentDetails.relatedPlaylists.uploads
			await request("/playlistItems", {
				params: {
					part: "contentDetails,snippet",
					playlistId: uploadPlaylistId,
					maxResults: 20,
				},
			}).then(({ data }) => {
				dispatch(
					channelVideosSuccess({
						items: data.items,
					})
				)
			})
		} catch (error) {
			dispatch(channelVideosFail(error.message))
		}
	}
}

export const getLikedVideos = (nextPageToken) => {
	return async (dispatch) => {
		try {
			dispatch(videoRequest())
			await request("/videos", {
				params: {
					part: "snippet,contentDetails,statistics",
					myRating: "like",
					pageToken: nextPageToken,
					maxResults: 20,
				},
			}).then(({ data }) => {
				dispatch(
					videoSuccess({
						videos: data.items,
						nextPageToken: data.nextPageToken,
					})
				)
			})
		} catch (error) {
			dispatch(videoFail(error.message))
		}
	}
}
