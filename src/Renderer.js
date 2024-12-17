export const Renderer = {
  onPopState: (callback) => {
    window.addEventListener("popstate", callback);
  },

  onPushState: (callback) => {
    const originalPushState = window.history.pushState;
    window.history.pushState = function (state, title, url) {
      originalPushState.apply(this, arguments);
      callback(state, title, url);
    };
  },

  onReplaceState: (callback) => {
    const originalReplaceState = window.history.replaceState;
    window.history.replaceState = function (state, title, url) {
      originalReplaceState.apply(this, arguments);
      callback(state, title, url);
    };
  },

  onATagClick: (callback) => {
    document.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();

        window.history.pushState({}, "", event.target.getAttribute("href"));
        callback();
      });
    });
  },
  onHashChange: (callback) => {
    window.addEventListener("hashchange", () => callback());
  },
};
