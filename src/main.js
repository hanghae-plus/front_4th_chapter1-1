import router from "./router/Router.js";

const LoadedListener = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.hash || window.location.pathname;
    router(currentPath);
  });
};

const PopListener = () => {
  window.addEventListener("popstate", () => {
    const currentPath = window.location.hash || window.location.pathname;
    router(currentPath);
  });
};

const HashChangeListener = () => {
  window.addEventListener("hashchange", () => {
    const currentPath = window.location.hash || window.location.pathname;
    router(currentPath);
  });
};

LoadedListener();
PopListener();
HashChangeListener();
