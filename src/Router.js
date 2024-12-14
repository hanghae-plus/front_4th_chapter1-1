export const Router = {
  initialized: false,
  push: (url) => {
    !Router.initialized && Router.init();

    window.history.pushState(null, null, url);
  },
  replace: (url) => {
    !Router.initialized && Router.init();

    window.history.replaceState(null, null, url);
  },
  init: () => {
    Router.initialized = true;
    window.onpopstate = (event) => {
      console.log("URL 변경 감지:", event.state);
    };
  },
  get pathname() {
    return window.location.pathname;
  },
};
