const navigate = (path) => {
  window.history.pushState({}, path, path);
};

export default navigate;
