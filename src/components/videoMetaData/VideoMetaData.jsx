import React, { useEffect } from "react"
import "./_videoMetaData.scss"
import moment from "moment"
import numeral from "numeral"
import { MdThumbUp } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { checkSubscriptionStatus, getChannelDetails } from "../../utils"
import { useNavigate } from "react-router-dom"
import HelmetCustom from "../helmetCustom/HelmetCustom"

const VideoMetaData = ({ video: { snippet, statistics } }) => {
	const { channelId, channelTitle, tags, title, publishedAt, description } =
		snippet
	const { viewCount, likeCount } = statistics
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { channel, subscriptionStatus } = useSelector((state) => state.channel)
	const { accessToken } = useSelector((state) => state.auth)

	const handleChannelClick = () => {
		navigate(`/channel/${channelId}`)
	}

	useEffect(() => {
		dispatch(getChannelDetails(channelId))
		dispatch(checkSubscriptionStatus(channelId, accessToken))
	}, [channelId, accessToken, dispatch])
	return (
		<div className="metaData">
			<HelmetCustom title={title} description={description} />
			<div className="metaData__top">
				<div className="hashtag">
					{tags.map((tag) => (
						<a href="/search">#{tag}</a>
					))}
				</div>
				<div className="title">{title}</div>
				<div className="info">
					<div className="info__views">
						{numeral(viewCount).format("0.aa")} views • {""}
						{moment(publishedAt).fromNow()}
					</div>
					<div className="info__buttons">
						<span>
							<MdThumbUp size={28} />
							{numeral(likeCount).format("0.aa")}
						</span>
					</div>
				</div>
			</div>
			<div className="metaData__channel">
				<div className="icon">
					<LazyLoadImage
						onClick={handleChannelClick}
						src={channel?.snippet?.thumbnails?.default?.url}
						effect="blur"
					/>
				</div>
				<div className="details">
					<div onClick={handleChannelClick} className="channelTitle">
						{channelTitle}
					</div>
					<div className="channelSub">
						{numeral(channel?.statistics?.subscriberCount).format("0.aa")}{" "}
						subscribers
					</div>
					<div className="description">{description}</div>
				</div>
				<div className="buttons">
					{subscriptionStatus ? (
						<button className="unsubscribe">Subscribed</button>
					) : (
						<button className="subscribe">Subscribe</button>
					)}
				</div>
			</div>
		</div>
	)
}

export default VideoMetaData
