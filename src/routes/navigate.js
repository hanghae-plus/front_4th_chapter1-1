import render from "../core/render";

const navigate = (path) => {
  window.history.pushState({}, path, path);
  render(path);
};

export default navigate;
