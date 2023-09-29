import { useEffect, useState } from "react";
import Stories from "../Stories";
import PostContainer from "../post/PostContainer";
import PostSkeleton from "../post/PostSkeleton";
import { useGetPostsMutation } from "../../features/apiSlice/postSlice";

const MainContent = () => {
  const [getPosts, { isLoading }] = useGetPostsMutation();
  const [posts, setPosts] = useState([]);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    fetchPosts();
  }, [skip]);
  const fetchPosts = async () => {
    try {
      const { data, error } = await getPosts(skip);

      if (error) {
        console.log(error);
        return;
      }

      // success
      setPosts([...posts, ...data]);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setSkip((prev) => prev + 1);
    }
  };

  console.log("data", posts?.length);

  return (
    <div className="bg-gray-100 w-full p-4 overflow-y-auto  ">
      <Stories />
      {isLoading
        ? // <PostSkeleton />
          ""
        : posts.length > 0 && (
            <div className=" mt-5 grid grid-cols-1 gap-4">
              {posts.map((post) => (
                <PostContainer key={post._id} post={post} />
              ))}
            </div>
          )}
    </div>
  );
};

export default MainContent;
