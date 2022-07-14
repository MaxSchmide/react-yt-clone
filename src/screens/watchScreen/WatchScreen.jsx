import React, { useEffect } from "react"
import { Col, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getRelatedVideosById, getVideoById } from "../../utils"
import Spinner from "react-bootstrap/Spinner"
import Comments from "../../components/comments/Comments"
import RelatedVideo from "../../components/relatedVideo/RelatedVideo"
import VideoMetaData from "../../components/videoMetaData/VideoMetaData"
import "./_watchScreen.scss"
import { Helmet } from "react-helmet"

const WatchScreens = () => {
	const { id } = useParams()
	const dispatch = useDispatch()
	const { video, loading } = useSelector((state) => state.selectedVideo)
	const { videos, loading: relatedVideosLoading } = useSelector(
		(state) => state.relatedVideos
	)
	useEffect(() => {
		dispatch(getVideoById(id))
		dispatch(getRelatedVideosById(id))
	}, [id, dispatch])
	return (
		<>
			<div className="watch">
				<Row>
					<Col lg={8}>
						<div className="watch__player">
							<iframe
								allowFullScreen={true}
								title={video?.snippet?.title}
								id="ytplayer"
								type="text/html"
								width="840"
								height="480"
								src={`https://www.youtube.com/embed/${id}`}
								frameBorder="0"
							></iframe>
						</div>
						{!loading ? (
							<VideoMetaData video={video} videoId={id} key={id} />
						) : (
							<Spinner
								style={{ margin: "0 auto" }}
								animation="border"
								role="status"
							>
								<span className="visually-hidden">Loading...</span>
							</Spinner>
						)}

						<Comments
							videoId={id}
							totalComments={video?.statistics?.commentCount}
						/>
					</Col>
					<Col lg={4}>
						{!relatedVideosLoading ? (
							videos
								.filter((video) => video.snippet)
								.map((video) => <RelatedVideo video={video} key={video.id} />)
						) : (
							<Spinner
								style={{ margin: "0 auto" }}
								animation="border"
								role="status"
							>
								<span className="visually-hidden">Loading...</span>
							</Spinner>
						)}
					</Col>
				</Row>
			</div>
		</>
	)
}

export default WatchScreens
