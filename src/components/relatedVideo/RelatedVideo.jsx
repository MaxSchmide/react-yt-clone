/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./_relatedVideo.scss";
import numeral from "numeral";
import moment from "moment";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Col, Row } from "react-bootstrap";
import request from "../../api";
const VideoList = ({ video }) => {
  const {
    id,
    snippet: {
      title,
      channelTitle,
      publishedAt,
      thumbnails: { medium },
    },
  } = video;
  const _videoId = id?.videoId || id;
  const navigate = useNavigate();
  const [duration, setDuration] = useState(null);
  const [views, setViews] = useState(null);
  const seconds = moment.duration(duration).asSeconds();
  const _duration =
    seconds >= 3600
      ? moment.utc(seconds * 1000).format("HH:mm:ss")
      : moment.utc(seconds * 1000).format("mm:ss");

  const getVideosDetails = async () => {
    try {
      await request("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: _videoId,
        },
      }).then(({ data: { items } }) => {
        setDuration(items[0].contentDetails.duration);
        setViews(items[0].statistics.viewCount);
      });
    } catch (error) {}
  };

  const handleVideoClick = () => {
    navigate(`/watch/${_videoId}`);
  };

  useEffect(() => {
    getVideosDetails();
  }, [_videoId]);

  return (
    <Row className="videoList" onClick={handleVideoClick}>
      <Col xs={6} md={5}>
        <div className="videoList__preview">
          <LazyLoadImage src={medium?.url} effect="blur" />
          <span className="videoList__preview__duration">{_duration}</span>
        </div>
      </Col>
      <Col xs={6} md={7}>
        <div className="videoList__info">
          <div className="title">{title}</div>
          <div className="channelTitle"> {channelTitle}</div>
          <div className="details">
            {numeral(views).format("0.aa")} views • {""}
            {moment(publishedAt).fromNow()}
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default VideoList;
