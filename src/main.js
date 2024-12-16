import { router } from "./shared/router";

const initPopListener = () => {
  window.addEventListener("popstate", () => {
    const currentPath = window.location.pathname;
    router(currentPath);
  });
};

initPopListener();

document.addEventListener("DOMContentLoaded", () => {
  console.log("✨");
  const currentPath = window.location.pathname;
  router(currentPath);
});
