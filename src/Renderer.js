function overrideHistoryMethod(method) {
  const originalMethod = window.history[method];
  window.history[method] = function (state, title, url) {
    originalMethod.apply(this, arguments);
    const event = new CustomEvent(method, { detail: { state, title, url } });
    window.dispatchEvent(event);
  };
}

export const Renderer = {
  onPopState: (callback) => {
    window.addEventListener("popstate", callback);
  },
  onPushState: (callback) => {
    overrideHistoryMethod("pushState");

    window.addEventListener("pushState", callback);
  },
  onReplaceState: (callback) => {
    overrideHistoryMethod("onReplaceState");

    window.addEventListener("onReplaceState", callback);
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
    window.onhashchange = () => {
      callback();
    };
  },
};
