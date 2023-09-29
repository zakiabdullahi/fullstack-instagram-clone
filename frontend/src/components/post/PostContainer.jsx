/* eslint-disable react/prop-types */
import ActionBar from "./ActionBar";
import ImageContainer from "./ImageContainer";
import UserProfile from "./UserProfile";
import CommentSection from "./CommentSection";
import AddComment from "./AddComment";
const PostContainer = ({ post }) => {
  return (
    <div className="pl-4 md:p-0  w-1/2 md:w-full  ">
      <UserProfile author={post.author} />

      <ImageContainer image={post.image} />

      <ActionBar post={post} />

      <CommentSection comments={post.comments} />

      <AddComment post={post} />
    </div>
  );
};

export default PostContainer;
