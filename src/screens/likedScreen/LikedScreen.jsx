import React, { useEffect } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import SkeletonVideo from "../../components/skeletons/SkeletonVideo"
import Video from "../../components/video/Video"
import { accessToken } from "../../redux/authReducer"
import { getLikedVideos } from "../../utils"

const LikedScreen = () => {
	const dispatch = useDispatch()
	const token = useSelector(accessToken)
	const { loading, videos } = useSelector((state) => state.likedVideos)
	useEffect(() => {
		dispatch(getLikedVideos(token))
	}, [dispatch, token])
	return (
		<>
			<Container>
				<Row>
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
				</Row>
			</Container>
		</>
	)
}

export default LikedScreen
