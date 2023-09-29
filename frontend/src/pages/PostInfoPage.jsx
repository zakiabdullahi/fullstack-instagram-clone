import { useParams } from "react-router-dom";
import { useGetPostInfoQuery } from "../features/apiSlice/postSlice";

const PostInfoPage = () => {
  const { id } = useParams();
  console.log(id);
  const { data, isLoading, error } = useGetPostInfoQuery(id);
  console.log(data);

  if (error) return <h2>{error?.data?.message}</h2>;

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>{data?.content}</h1>
      <img src={data?.image} alt="image" />
    </div>
  );
};

export default PostInfoPage;
