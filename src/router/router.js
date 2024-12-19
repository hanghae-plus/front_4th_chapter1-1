import { ErrorPage } from "../pages/errorPage.js";
import { getLocalStorage } from "../storage/storage.js";
import { eventRegister, PATHS, Routes } from "./routes.js";

const getCurrentPath = () => {
  if (window.location.hash) {
    return window.location.hash.slice(1) || "/";
  } else {
    return window.location.pathname;
  }
};

export const resolveRoute = () => {
  const path = getCurrentPath();
  const user = getLocalStorage("user");
  const root = document.getElementById("root");

  if (path === PATHS.PROFILE && !user) {
    navigateTo(PATHS.LOGIN);
    return;
  }
  if (path === PATHS.LOGIN && user) {
    navigateTo(PATHS.MAIN);
    return;
  }

  const route = Routes[path];
  if (route) {
    root.innerHTML = route();
    eventRegister(path);
  } else {
    root.innerHTML = ErrorPage();
  }
};

export const navigateTo = (path) => {
  if (window.location.hash) {
    window.location.hash = `#${path}`;
  } else {
    window.history.pushState(null, null, path);
  }
  resolveRoute();
};
