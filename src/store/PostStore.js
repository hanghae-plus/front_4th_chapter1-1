const setPost = ({ username, post, time }) => {
  const posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.push({ username, post, time });
  localStorage.setItem("posts", JSON.stringify(posts));
};

const getPost = () => {
  const post = JSON.parse(localStorage.getItem("posts"));
  return post ? post : [];
};

const postStore = {
  getPost,
  setPost,
};

export default postStore;
