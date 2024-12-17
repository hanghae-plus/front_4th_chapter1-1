export const PathRouter = {
  push: (url) => {
    window.history.pushState({}, "", url);
  },

  replace: (url) => {
    window.history.replaceState({}, "", url);
  },
};

export const HashRouter = {
  push: (url) => {
    window.location.hash = url;
  },

  replace: (url) => {
    window.location.replace(`#${url}`);
  },
};

export const Router =
  globalThis.ROUTE_MODE === "hash" ? HashRouter : PathRouter;
