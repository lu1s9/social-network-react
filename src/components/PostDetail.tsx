import { deletePost } from "../api/posts";
import { usePostsContext } from "../hooks/usePostsContext";
import axios from "axios";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function PostDetail({ post }: any) {
  const { dispatch } = usePostsContext();
  const { state } = useAuthContext();

  const handleClick = async () => {
    if (!state.token) {
      return;
    }
    try {
      const res = await deletePost(post._id);
      console.log(res);
      dispatch({ type: "DELETE_POST", payload: res.data });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };

  return (
    <div className="bg-white rounded-md mx-auto my-10 p-10 relative shadow-md">
      <p>{post.content}</p>
      <p>
        {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
      </p>
      <span
        onClick={handleClick}
        className="absolute top-5 right-5 cursor-pointer rounded bg-slate-300 p-1"
      >
        Delete
      </span>
    </div>
  );
}

export default PostDetail;
