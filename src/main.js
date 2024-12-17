import { router } from "./app/router";

const initPopListener = () => {
  window.addEventListener("popstate", () => {
    const currentPath = window.location.hash || window.location.pathname;
    router(currentPath);
  });
};

const initHashChangeListener = () => {
  window.addEventListener("hashchange", () => {
    const currentPath = window.location.hash || window.location.pathname;
    router(currentPath);
  });
};

initPopListener();
initHashChangeListener();

document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.hash || window.location.pathname;
  router(currentPath);
});
