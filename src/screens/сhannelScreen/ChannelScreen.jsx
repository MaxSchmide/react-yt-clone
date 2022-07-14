import { React, useEffect, useState } from "react"
import "./_channelScreen.scss"
import { Col, Container, Row } from "react-bootstrap"
import ChannelAbout from "../../components/channelAbout/ChannelAbout"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
	checkSubscriptionStatus,
	getChannelDetails,
	getVideosByChannel,
} from "../../utils"
import Spinner from "react-bootstrap/Spinner"
import InfiniteScroll from "react-infinite-scroll-component"
import { MdNotifications } from "react-icons/md"
import { LazyLoadImage } from "react-lazy-load-image-component"
import numeral from "numeral"
import Video from "../../components/video/Video"
const barSections = ["Videos", "About"]

const ChannelScreen = () => {
	const { channelId } = useParams()
	const dispatch = useDispatch()
	const { accessToken } = useSelector((state) => state.auth)
	const { channel, subscriptionStatus } = useSelector((state) => state.channel)
	const { loading, videos, nextPageToken } = useSelector(
		(state) => state.channelVideos
	)
	const [activeElement, setActiveElement] = useState("Videos")

	const handleActiveElement = (value) => setActiveElement(value)
	const fetchData = () => {
		// dispatch(getVideosByChannel(channelId, nextPageToken))
	}
	useEffect(() => {
		dispatch(getChannelDetails(channelId))
		dispatch(getVideosByChannel(channelId, nextPageToken))
		dispatch(checkSubscriptionStatus(channelId, accessToken))
	}, [channelId, accessToken, nextPageToken, dispatch])
	return (
		<div className="channel">
			<div className="channel__header">
				<div className="channel__header__logo">
					<LazyLoadImage
						src={channel?.snippet?.thumbnails?.default?.url}
						effect="blur"
					/>
				</div>
				<div className="channel__header__title">
					<h4>{channel?.snippet?.title}</h4>
					<p>
						{numeral(channel?.statistics?.subscriberCount).format("0.aa")}{" "}
						subscriptions
					</p>
				</div>
				<div className="channel__header__button">
					{subscriptionStatus ? (
						<>
							<button className="unsubscribe">Subscribed</button>{" "}
							<MdNotifications color="white" size={28} />
						</>
					) : (
						<button className="subscribe">Subscribe</button>
					)}
				</div>
			</div>
			<div className="channel__bar">
				{barSections.map((item, index) => {
					return (
						<div
							key={index}
							onClick={() => handleActiveElement(item)}
							className={activeElement === item && "active"}
						>
							{item}
						</div>
					)
				})}
			</div>
			<Container>
				<Row>
					<InfiniteScroll
						style={{
							overflow: "none",
							display: "flex",
							flexWrap: "wrap",
						}}
						dataLength={videos.length}
						next={fetchData}
						hasMore={true}
						loader={
							<Spinner
								style={{ margin: "0 auto" }}
								animation="border"
								role="status"
							>
								<span className="visually-hidden">Loading...</span>
							</Spinner>
						}
					>
						{activeElement === "Videos" &&
							!loading &&
							videos.map((video) => (
								<>
									<Col md={4} lg={3}>
										<Video video={video} channelVideo />
									</Col>
								</>
							))}
					</InfiniteScroll>
					{activeElement === "About" && <ChannelAbout />}
				</Row>
			</Container>
		</div>
	)
}

export default ChannelScreen
