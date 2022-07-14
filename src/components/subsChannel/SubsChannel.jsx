/* eslint-disable react-hooks/exhaustive-deps */
import numeral from "numeral"
import React, { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { useNavigate } from "react-router-dom"
import request from "../../api"
import "./_subsChannel.scss"

const SubsChannel = ({ item }) => {
	const [videoCount, setVideoCount] = useState()
	const [subscriberCount, setSubscriberCount] = useState()
	const navigate = useNavigate()
	const {
		snippet: {
			thumbnails,
			title,
			description,
			resourceId: { channelId },
		},
	} = item

	const clickHandler = () => {
		navigate(`/channel/${channelId}`)
	}
	const getChannelDetails = async () => {
		try {
			await request("/channels", {
				params: {
					part: "statistics",
					id: channelId,
				},
			}).then(({ data: { items } }) => {
				setVideoCount(items[0].statistics.videoCount)
				setSubscriberCount(items[0].statistics.subscriberCount)
			})
		} catch (error) {}
	}

	useEffect(() => {
		getChannelDetails()
	}, [channelId])

	return (
		<Row className="subs">
			<Col lg={4} md={6} className="subs__thumbnail">
				<div className="subs__thumbnail__channelIcon">
					<LazyLoadImage
						onClick={clickHandler}
						src={thumbnails?.default?.url}
						effect="blur"
					/>
				</div>
			</Col>
			<Col lg={8} md={6} className="subs__info">
				<div className="container">
					<div className="channel">
						<div onClick={clickHandler} className="channel__title">
							{title}
						</div>
						<div className="channel__details">
							{numeral(subscriberCount).format("0.aa")} subscribers •{" "}
							{numeral(videoCount).format("0.aa")} videos
						</div>
						<div className="channel__description">{description}</div>
					</div>
				</div>
			</Col>
		</Row>
	)
}

export default SubsChannel
