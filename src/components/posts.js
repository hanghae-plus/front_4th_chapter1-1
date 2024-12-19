import PostStore from "../store/post.store.js";
import Post from "./post.js";

const Posts = () => {
  const postStore = new PostStore().get();
  return `${postStore.map(Post).join("")}`;
};

export default Posts;
