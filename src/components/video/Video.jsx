/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./_video.scss"
import { AiFillEye } from "react-icons/ai"
import { LazyLoadImage } from "react-lazy-load-image-component"
import request from "../../api"
import moment from "moment"
import numeral from "numeral"

const Video = ({ video, channelVideo }) => {
	const {
		id,
		snippet: {
			channelId,
			title,
			channelTitle,
			publishedAt,
			thumbnails: { medium },
		},
		contentDetails,
	} = video
	const [channelIcon, setChannelIcon] = useState(null)
	const [duration, setDuration] = useState(null)
	const [views, setViews] = useState(null)
	const seconds = moment.duration(duration).asSeconds()
	const _duration =
		seconds >= 3600
			? moment.utc(seconds * 1000).format("HH:mm:ss")
			: moment.utc(seconds * 1000).format("mm:ss")
	const _videoId = id?.videoId || contentDetails?.videoId || id
	const navigate = useNavigate()

	const handleVideoClick = () => {
		navigate(`/watch/${_videoId}`)
	}
	const handleChannelClick = () => {
		navigate(`/channel/${channelId}`)
	}
	const getChannelIcon = async () => {
		try {
			await request("/channels", {
				params: {
					part: "snippet",
					id: channelId,
				},
			}).then(({ data: { items } }) => {
				setChannelIcon(items[0].snippet.thumbnails.default)
			})
		} catch (error) {}
	}

	const getVideosDetails = async () => {
		try {
			await request("/videos", {
				params: {
					part: "contentDetails,statistics",
					id: _videoId,
				},
			}).then(({ data: { items } }) => {
				setDuration(items[0].contentDetails.duration)
				setViews(items[0].statistics.viewCount)
			})
		} catch (error) {}
	}
	useEffect(() => {
		getChannelIcon()
		getVideosDetails()
	}, [channelId, _videoId])

	return (
		<>
			<div className="video">
				<div onClick={handleVideoClick} className="video__preview">
					<LazyLoadImage src={medium.url} effect="blur" />
					<span className="video__preview__duration">{_duration}</span>
				</div>
				<div className="video__content">
					{!channelVideo && (
						<div className="video__channel">
							<LazyLoadImage
								onClick={handleChannelClick}
								src={channelIcon?.url}
								effect="blur"
							/>
						</div>
					)}

					<div className="video__description">
						<div className="video__title" onClick={handleVideoClick}>
							{title}
						</div>
						<div className="video__details">
							{!channelVideo && (
								<p onClick={handleChannelClick}>{channelTitle}</p>
							)}
							<span>
								<AiFillEye /> {numeral(views).format("0.aa")} views • {""}
								{moment(publishedAt).fromNow()}
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Video
