export const Router = {
  push: (url) => {
    window.history.pushState({}, "", url);
  },

  replace: (url) => {
    window.history.replaceState({}, "", url);
  },
};
