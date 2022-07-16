/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react"
import { Container, Col } from "react-bootstrap"
import Spinner from "react-bootstrap/Spinner"
import { useDispatch, useSelector } from "react-redux"
import CategoriesBar from "../../components/categoriesBar/CategoriesBar"
import Video from "../../components/video/Video"
import InfiniteScroll from "react-infinite-scroll-component"
import SkeletonVideo from "../../components/skeletons/SkeletonVideo"
import { getPopularVideos, getVideosByCategory } from "../../utils"
const HomeScreen = () => {
	const dispatch = useDispatch()

	const { loading, videos, activeCategory, nextPageToken } = useSelector(
		(state) => state.homeVideos
	)

	const fetchData = () => {
		if (activeCategory === "All") {
			dispatch(getPopularVideos(nextPageToken))
		} else {
			dispatch(getVideosByCategory(activeCategory, nextPageToken))
		}
	}
	useEffect(() => {
		dispatch(getPopularVideos(nextPageToken))
	}, [])

	return (
		<>
			<CategoriesBar />
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
						: [...Array(20)].map((i) => (
								<Col lg={3} md={4}>
									<SkeletonVideo key={i} />
								</Col>
						  ))}
				</InfiniteScroll>
			</Container>
		</>
	)
}

export default HomeScreen
