import React, { useEffect } from "react"
import Spinner, { Col, Container } from "react-bootstrap"
import InfiniteScroll from "react-infinite-scroll-component"
import { useDispatch, useSelector } from "react-redux"
import SkeletonVideo from "../../components/skeletons/SkeletonVideo"
import Video from "../../components/video/Video"
import { getLikedVideos } from "../../utils"

const LikedScreen = () => {
	const dispatch = useDispatch()
	const { loading, videos, nextPageToken } = useSelector(
		(state) => state.homeVideos
	)
	const fetchData = () => {
		dispatch(getLikedVideos(nextPageToken))
	}
	useEffect(() => {
		dispatch(getLikedVideos(nextPageToken))
	}, [nextPageToken, dispatch])
	return (
		<>
			<Container>
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
					{!loading
						? videos.map((video) => (
								<Col lg={3} md={4}>
									<Video video={video} key={video.id} />
								</Col>
						  ))
						: [...Array(20)].map(() => (
								<Col lg={3} md={4}>
									<SkeletonVideo />
								</Col>
						  ))}
				</InfiniteScroll>
			</Container>
		</>
	)
}

export default LikedScreen
