import { ErrorPage } from "../pages/errorPage.js";
import { getLocalStorage } from "../storage/storage.js";
import { eventRegister, Routes } from "./routes.js";

// 초기 URL 모드
let isHashMode = false;

const getCurrentPath = () => {
  if (isHashMode) {
    return window.location.hash.slice(1) || "/";
  } else {
    return window.location.pathname;
  }
};

export const resolveRoute = (isHash = false) => {
  isHashMode = isHash;
  const path = getCurrentPath();
  const user = getLocalStorage("user");
  const root = document.getElementById("root");

  if (path === "/profile" && !user) {
    navigateTo("/login");
    return;
  }
  if (path === "/login" && user) {
    navigateTo("/");
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
  if (isHashMode) {
    window.location.hash = `#${path}`;
  } else {
    window.history.pushState(null, null, path);
  }
  resolveRoute(isHashMode);
};
