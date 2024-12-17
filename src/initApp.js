import { router } from "./app/router";

const initLoadedListener = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.hash || window.location.pathname;
    router(currentPath);
  });
};

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

export const initApp = () => {
  initPopListener();
  initHashChangeListener();
  initLoadedListener();
};
