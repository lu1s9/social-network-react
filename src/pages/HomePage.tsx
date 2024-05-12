import { useEffect } from "react";
import { getPosts } from "../api/posts";
import { usePostsContext } from "../hooks/usePostsContext";
import { useAuthContext } from "../hooks/useAuthContext";

import axios from "axios";
import PostDetail from "../components/PostDetail";
import PostForm from "../components/PostForm";

function HomePage() {
  const { state, dispatch } = usePostsContext();
  const { state: authState } = useAuthContext();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getPosts();
        console.log(res);
        dispatch({ type: "SET_POSTS", payload: res.data });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error.message);
        }
      }
    };
    if (authState) {
      fetchPosts();
    }
  }, [authState, dispatch]);

  return (
    <div className="grid grid-cols-3 gap-20">
      <div className="posts col-span-2">
        {state &&
          state.posts.map((post) => <PostDetail key={post._id} post={post} />)}
      </div>

      <PostForm />
    </div>
  );
}

export default HomePage;
