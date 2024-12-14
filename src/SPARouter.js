function preventDefaultATagLogic({ callback = () => {} }) {
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const url = event.target.getAttribute("href");
      SPARouter.push(url);

      callback();
    });
  });
}

export const SPARouter = {
  callback: null,
  push: (url) => {
    window.history.pushState({}, "", url);
  },

  replace: (url) => {
    window.history.replaceState({}, "", url);
  },

  init: ({ callback = () => {} }) => {
    SPARouter.callback = callback;

    preventDefaultATagLogic({ callback });

    window.onpopstate = () => {
      callback();
    };

    // pushState와 replaceState 오버라이드
    ["pushState", "replaceState"].forEach((type) => {
      const originalMethod = window.history[type];
      window.history[type] = function (state, title, url) {
        originalMethod.apply(this, arguments);
        const event = new CustomEvent(type, { detail: { state, title, url } });
        window.dispatchEvent(event);
      };

      window.addEventListener(type, () => {
        callback();
      });
    });
  },

  get pathname() {
    return window.location.pathname;
  },
};
