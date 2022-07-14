import React from "react"
import { Col, Row } from "react-bootstrap"
import "./_channelAbout.scss"
import numeral from "numeral"
import moment from "moment"
import { useSelector } from "react-redux"
const ChannelAbout = () => {
	const { channel } = useSelector((state) => state.channel)
	return (
		<div>
			<Row className="about">
				<Col md={7} lg={8} className="about__description">
					<h3 className="title">Description</h3>
					<p className="description__details">
						{channel?.snippet?.description}
					</p>
				</Col>
				<Col md={5} lg={4} className="about__stats">
					<h3 className="title">Stats</h3>
					<p className="stats__details">
						Joined{" "}
						{moment(channel?.snippet?.publishedAt).format("MMM DD, YYYY")}
					</p>
					<p className="stats__details">
						{numeral(channel?.statistics?.viewCount).format("0,0,0")} views
					</p>
				</Col>
			</Row>
		</div>
	)
}

export default ChannelAbout
