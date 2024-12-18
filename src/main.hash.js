import HomePage from "./page/home";
import ProfilePage from "./page/profile";
import LoginPage from "./page/login";
import ErrorPage from "./page/error";
import { HashRouter } from "./router/router";
import { isAuthenticated } from "./util/login";
(function (global) {
  function $(selector) {
    return document.querySelector(selector);
  }

  global.$ = $;
})(window);

const routerMap = {
  "/": { component: HomePage },
  "/profile": { component: ProfilePage, authRequired: true },
  "/login": { component: LoginPage },
  "/error": { component: ErrorPage },
};

const routerGuard = (path) => {
  if (path === "/profile" && !isAuthenticated()) {
    return "/login";
  }
  if (path === "/login" && isAuthenticated()) {
    return "/";
  }
  return path;
};

const router = new HashRouter(routerMap, routerGuard);

const initPage = () => {
  const hash = window.location.hash || "#/";
  const path = hash.replace(/^#/, "") || "/";
  router.renderPage(path);
};

initPage();

$("#root").addEventListener("click", (event) => {
  if (
    router.currentPage &&
    typeof router.currentPage.handleEvent === "function"
  ) {
    router.currentPage.handleEvent(event);
  }
});

$("#root").addEventListener("submit", (event) => {
  if (
    router.currentPage &&
    typeof router.currentPage.handleEvent === "function"
  ) {
    router.currentPage.handleEvent(event);
  }
});
