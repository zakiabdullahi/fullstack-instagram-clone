/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { useSelector, useDispatch } from "react-redux";
import { useLikePostMutation } from "../../features/apiSlice/postSlice";
const ActionBar = ({ post }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const hasUserLiked = post?.likes.some(
    (like) => like.user._id.toString() === userInfo._id
  );
  const likeLength = post?.likes.length || 0;
  console.log(post.user);

  const [like] = useLikePostMutation();
  const [optimistLikeCount, setOptimistLikeCount] = useState(likeLength);
  const [optimistliked, setOptimistliked] = useState(hasUserLiked);

  // console.log(hasUserLiked);
  const likeText =
    optimistLikeCount > 0
      ? optimistLikeCount === 1
        ? "1 like "
        : `${optimistLikeCount} liked`
      : "";

  const handleLikeButton = () => {
    // like(post._id);
    if (!userInfo) {
      return console.log("please login first");
    }

    handleLike();
  };
  const handleLike = () => {
    setOptimistliked(!optimistliked);
    setOptimistLikeCount(
      optimistliked ? optimistLikeCount - 1 : optimistLikeCount + 1
    );

    dispatch(like(post._id))
      .unWrap()
      .then((payload) => {
        console.log("success");
      })
      .catch((err) => {
        setOptimistliked(hasUserLiked);
        setOptimistLikeCount(likeLength);
      });
  };
  return (
    <div className="action-bar p-2 flex items-center">
      <button onClick={handleLikeButton}>
        {optimistliked ? (
          <AiFillHeart size={24} className="text-red-500" />
        ) : (
          <AiOutlineHeart size={24} className="text-gray-500" />
        )}
      </button>
      <span className="text-sm text-gray-700">{likeText}</span>
    </div>
  );
};

export default ActionBar;
