import React from "react";
import "./_comment.scss";
import moment from "moment";
const Comment = ({ comment }) => {
  const {
    authorDisplayName,
    authorProfileImageUrl,
    textOriginal,
    publishedAt,
  } = comment;
  return (
    <div className="comment">
      <img src={authorProfileImageUrl} alt="logo" />
      <div className="comment__body">
        <div className="comment__body__header">
          <div className="title">{authorDisplayName}</div>
          <div className="date">{moment(publishedAt).fromNow()}</div>
        </div>
        <div className="comment__body__content">{textOriginal}</div>
      </div>
    </div>
  );
};

export default Comment;
