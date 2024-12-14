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
  push: (url) => {
    window.history.pushState({}, "", url);
  },

  replace: (url) => {
    window.history.replaceState({}, "", url);
  },

  init: ({ callback = () => {} }) => {
    preventDefaultATagLogic({ callback });

    window.onpopstate = () => {
      callback();
    };
  },

  get pathname() {
    return window.location.pathname;
  },
};
