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
    SPARouter.callback?.();
  },

  replace: (url) => {
    window.history.replaceState({}, "", url);
    SPARouter.callback?.();
  },

  init: ({ callback = () => {} }) => {
    SPARouter.callback = callback;
    preventDefaultATagLogic({ callback });

    window.onpopstate = () => {
      callback();
    };
  },

  get pathname() {
    return window.location.pathname;
  },
};
