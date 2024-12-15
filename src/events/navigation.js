import { router } from "../router/router.js";

export const handleNavigation = (e) => {
  const selected = e.target.closest("a");
  if (selected && selected.getAttribute("href")) {
    e.preventDefault();
    const path = selected.getAttribute("href");
    history.pushState({}, "", path);
    router();
  }
};

export const initNavigation = () => {
  document.body.addEventListener("click", handleNavigation);
};
