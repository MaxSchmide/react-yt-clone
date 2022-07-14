/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./_searchedVideo.scss";
import numeral from "numeral";
import moment from "moment";
import request from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { checkSubscriptionStatus, getChannelDetails } from "../../utils";
import { useNavigate } from "react-router-dom";

const SearchedVideo = ({ result }) => {
  const [channelIcon, setChannelIcon] = useState(null);
  const [duration, setDuration] = useState(null);
  const [views, setViews] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accessToken } = useSelector((state) => state.auth);
  const { channel, subscriptionStatus } = useSelector((state) => state.channel);
  const {
    id,
    snippet: {
      channelId,
      title,
      thumbnails: { medium },
      publishedAt,
      description,
      channelTitle,
    },
  } = result;
  const _videoId = id?.videoId || id;
  const seconds = moment.duration(duration).asSeconds();
  const _duration =
    seconds >= 3600
      ? moment.utc(seconds * 1000).format("HH:mm:ss")
      : moment.utc(seconds * 1000).format("mm:ss");
  const isVideo = id.kind === "youtube#video";
  const getChannelIcon = async () => {
    try {
      await request("/channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      }).then(({ data: { items } }) => {
        setChannelIcon(items[0].snippet.thumbnails.default);
      });
    } catch (error) {}
  };
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
  const handleClick = () => {
    isVideo ? navigate(`/watch/${_videoId}`) : navigate(`channel/${channelId}`);
  };

  useEffect(() => {
    getChannelIcon();
    getVideosDetails();
    if (id?.kind === "youtube#channel") {
      dispatch(checkSubscriptionStatus(channelId, accessToken));
      dispatch(getChannelDetails(channelId));
    }
  }, [channelId, _videoId, accessToken]);
  return (
    <Container className="searchedVideo">
      <Row onClick={handleClick}>
        {isVideo ? (
          <>
            <Col lg={4} md={6} className="searchedVideo__thumbnail">
              <LazyLoadImage src={medium?.url} effect="blur" />
              <span className="searchedVideo__thumbnail__duration">
                {_duration}
              </span>
            </Col>
            <Col lg={8} md={6} className="searchedVideo__info">
              <div className="box">
                <div className="title">{title}</div>
                <div className="details">
                  {numeral(views).format("0.aa")} views • {""}
                  {moment(publishedAt).fromNow()}
                </div>
                <div className="channel">
                  <div className="channel__icon">
                    <LazyLoadImage src={channelIcon?.url} effect="blur" />
                  </div>
                  <div className="channel__title">{channelTitle}</div>
                </div>
                <div className="description">{description}</div>
              </div>
            </Col>
          </>
        ) : (
          <>
            <Col lg={4} md={6} className="searchedVideo__thumbnail">
              <div className="searchedVideo__thumbnail__channelIcon">
                <LazyLoadImage src={medium?.url} effect="blur" />
              </div>
            </Col>
            <Col lg={8} md={6} className="searchedVideo__info">
              <div className="container">
                <div className="channel">
                  <div className="channel__title">{title}</div>
                  <div className="channel__details">
                    {numeral(channel?.statistics?.subscriberCount).format(
                      "0.aa"
                    )}{" "}
                    subscribers •{" "}
                    {numeral(channel?.statistics?.videoCount).format("0.aa")}{" "}
                    videos
                  </div>
                  <div className="channel__description">{description}</div>
                </div>
                <div className="buttons">
                  {subscriptionStatus ? (
                    <button className="unsubscribe">Subscribed</button>
                  ) : (
                    <button className="subscribe">Subscribe</button>
                  )}
                </div>
              </div>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default SearchedVideo;
