import React, { useEffect, useState } from "react";
import Comment from "../comment/Comment";
import "./_comments.scss";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getCommentsOfVideoById } from "../../utils";

const Comments = ({ totalComments, videoId }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const { user, accessToken } = useSelector((state) => state.auth);
  const comments = useSelector((state) => state.selectedVideo.comments);
  const _comments = comments?.map(
    (comment) => comment.snippet.topLevelComment.snippet
  );

  const handleInputValue = (e) => {
    setText(e.target.value);
  };
  const handleComment = (e) => {
    e.preventDefault();
    if (text.length === 0) return;
    dispatch(addComment(videoId, text, accessToken));
    setText("");
  };

  useEffect(() => {
    dispatch(getCommentsOfVideoById(videoId));
  }, [videoId, dispatch]);

  return (
    <div className="comments">
      {totalComments} comments
      <div className="comments__form">
        <img src={user.photo} alt="logo" />
        <form onSubmit={handleComment}>
          <input
            type="text"
            placeholder="Add a comment..."
            value={text}
            onChange={handleInputValue}
          />
          <button type="submit">COMMENT</button>
        </form>
      </div>
      <div className="comments__list">
        {_comments?.map((comment, i) => (
          <Comment comment={comment} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
