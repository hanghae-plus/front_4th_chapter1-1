const createRouter = () => {
  const callbacks = [];
  let currentPath = window.location.pathname;

  return {
    addCallback(callback) {
      callbacks.push(callback);
    },
    navigator(path) {
      currentPath = path;
      window.history.pushState(null, "", path);
      callbacks.forEach((callback) => callback());
    },
    getCurrentPath() {
      return currentPath();
    },
  };
};

export default createRouter;
